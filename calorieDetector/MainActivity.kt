package com.example.AutomaticCalorieDetector

import ImageResponse
import android.Manifest
import android.content.ContentValues
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import android.util.Base64
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.*
import androidx.camera.core.ImageCapture.OnImageCapturedCallback
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.example.AutomaticCalorieDetector.databinding.ActivityMainBinding
import kotlinx.coroutines.coroutineScope
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString
import kotlinx.serialization.decodeFromString
import org.http4k.client.ApacheClient
import org.http4k.core.Method.GET
import org.http4k.core.Method.POST
import org.http4k.core.Request
import java.io.ByteArrayOutputStream
import java.nio.ByteBuffer
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import kotlin.collections.ArrayList
import kotlin.concurrent.thread


class MainActivity : AppCompatActivity() {
    private lateinit var viewBinding: ActivityMainBinding
    private lateinit var cameraExecutor: ExecutorService
    private var imageCapture: ImageCapture? = null

    private val client = ApacheClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        try{
            super.onCreate(savedInstanceState)

            viewBinding = ActivityMainBinding.inflate(layoutInflater)
            setContentView(viewBinding.root)

            // Set up the listeners for take photo and video capture buttons
            viewBinding.pressingButton.setOnClickListener{ takePhoto() }
            cameraExecutor = Executors.newSingleThreadExecutor()

            // Request camera permissions
            val allPermission: Boolean = allPermissionsGranted()

            if (!allPermission){
                ActivityCompat.requestPermissions(
                    this, REQUIRED_PERMISSIONS, REQUEST_CODE_PERMISSIONS)
                return
            }

            startCamera()
        }
        catch (E: Exception){
            Log.e("error", E.message.toString())
        }
    }

    override fun onRequestPermissionsResult( requestCode: Int,
                                             permissions: Array<String>,
                                             grantResults: IntArray) {
        try{
            super.onRequestPermissionsResult(requestCode, permissions, grantResults)

            if (requestCode != REQUEST_CODE_PERMISSIONS) return
            val allPermission: Boolean = allPermissionsGranted()

            if (!allPermission){
                Toast.makeText(this,
                    "Permissions not granted by the user.",
                    Toast.LENGTH_SHORT)
                    .show()
                finish()
                return
            }

            startCamera()
        }
        catch (E: Exception){
            Log.e("error", E.message.toString())
        }
    }
    private fun takePhoto() {
        // Get a stable reference of the modifiable image capture use case
        val imageCapture = imageCapture ?: return

        // Create time stamped name and MediaStore entry.
        val name = SimpleDateFormat(FILENAME_FORMAT, Locale.US)
                .format(System.currentTimeMillis())

        val contentValues = ContentValues().apply {
            put(MediaStore.MediaColumns.DISPLAY_NAME, name)
            put(MediaStore.MediaColumns.MIME_TYPE, "image/jpeg")

            if (Build.VERSION.SDK_INT > Build.VERSION_CODES.P) {
                put(MediaStore.Images.Media.RELATIVE_PATH, "Pictures/CameraX-Image")
            }
        }

        // Create output options object which contains file + metadata
        val outputOptions = ImageCapture.OutputFileOptions
                            .Builder(contentResolver,
                                    MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                                    contentValues)
                            .build()

        // Set up image capture listener, which is triggered after photo has
        // been taken
        val executor = ContextCompat.getMainExecutor(this)
        imageCapture.takePicture(
            outputOptions,
            executor,
            object : ImageCapture.OnImageSavedCallback {
                override fun onError(exc: ImageCaptureException) {
                    Log.e(TAG, "Photo capture failed: ${exc.message}", exc)
                }

                override fun onImageSaved(output: ImageCapture.OutputFileResults){
                    val msg = "Photo capture succeeded: ${output.savedUri}"

                    Toast.makeText(baseContext, msg, Toast.LENGTH_SHORT).show()
                    Log.d(TAG, msg)
                }
            }
        )

        imageCapture.takePicture(executor, object: OnImageCapturedCallback() {
            override fun onCaptureSuccess(image: ImageProxy) {
                super.onCaptureSuccess(image)
                val bitmap = imageProxyToBitmap(image)

                val baos = ByteArrayOutputStream()
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos)
                val b = baos.toByteArray()
                val encoded = Base64.encodeToString(b, Base64.DEFAULT)
                image.close()

                MoveToDetailPage(encoded)
            }

            override fun onError(exception: ImageCaptureException) {
                Log.e(TAG, "Photo capture failed: ${exception.message}", exception)
            }
        })
    }

    private fun MoveToDetailPage(base64Img: String){
        try{
            val feature = Feature("LABEL_DETECTION", 5)
            val features = ArrayList<Feature>()
            features.add(feature)

            val imgRequests = ArrayList<com.example.AutomaticCalorieDetector.Request>()
            val requestImg = com.example.AutomaticCalorieDetector.Request(Image(base64Img),features)
            imgRequests.add(requestImg)
            val imageRequestPayload = ImageRequest(imgRequests)

            val imageRequest = Request(POST, "https://vision.googleapis.com/v1/images:annotate")
                .query("key", "vison_key")
                .body(Json.encodeToString(imageRequestPayload))

            var nutritionRequest = Request(GET, "https://api.api-ninjas.com/v1/nutrition")
                .header("X-Api-Key", "ninja_key")

            val intent = Intent(this, NutritionInfo::class.java)

            thread {
                val it = client(imageRequest)
                if (it.status.successful) {
                    val imageBodyResponse = it.bodyString()
                    var found = ""
                    val labelAnnotationsResponse = Json.decodeFromString<ImageResponse>(imageBodyResponse)
                    for (i in 0..4){
                        var descr = labelAnnotationsResponse.responses[0].labelAnnotations[i].description
                        val newRequest = nutritionRequest.query("query", descr)
                        val nutritionIt = client(newRequest)
                        val body = nutritionIt.bodyString().drop(1).dropLast(1)
                        if (body.isNotEmpty()){
                            intent.putExtra("body", body)
                            startActivity(intent)
                            found = descr
                            break
                        }
                    }

                    if (found.isEmpty()){
                        val newRequest = nutritionRequest.query("query", "meat")
                        val nutritionIt = client(newRequest)
                        val body = nutritionIt.bodyString().drop(1).dropLast(1)
                        intent.putExtra("body", body)
                        startActivity(intent)
                    }
                }
            }
        }
        catch (E: Exception){
            Log.e("error", E.message.toString())
        }
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            try {
                // Used to bind the lifecycle of cameras to the lifecycle owner
                val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()

                // Preview
                val preview = Preview.Builder()
                    .build()
                    .also {
                        it.setSurfaceProvider(viewBinding.viewFinder.surfaceProvider)
                    }

                // Select back camera as a default
                val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
                imageCapture = ImageCapture.Builder().build()

                // Unbind use cases before rebinding
                cameraProvider.unbindAll()

                // Bind use cases to camera
                cameraProvider.bindToLifecycle(this,
                                                cameraSelector, preview,
                                                imageCapture)
            } catch(exc: Exception) {
                Log.e(TAG, "Use case binding failed", exc)
            }
        }, ContextCompat.getMainExecutor(this))
    }
    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
    }
    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(
            baseContext, it) == PackageManager.PERMISSION_GRANTED
    }

    private fun imageProxyToBitmap(image: ImageProxy): Bitmap {
        val planeProxy = image.planes[0]
        val buffer: ByteBuffer = planeProxy.buffer
        val bytes = ByteArray(buffer.remaining())
        buffer.get(bytes)
        return BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
    }
    companion object {
        private const val TAG = "CameraXApp"
        private const val FILENAME_FORMAT = "yyyy-MM-dd-HH-mm-ss-SSS"
        private const val REQUEST_CODE_PERMISSIONS = 10
        private val REQUIRED_PERMISSIONS =
            mutableListOf (
                Manifest.permission.CAMERA,
            ).apply {
                if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.P) {
                    add(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                }
            }.toTypedArray()
    }
}