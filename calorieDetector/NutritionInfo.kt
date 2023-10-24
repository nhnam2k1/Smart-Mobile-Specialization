package com.example.AutomaticCalorieDetector

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ListView
import android.widget.Toast
import org.json.JSONObject

class NutritionInfo : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_nutrition_info)

        val nutritionItems = ArrayList<NutritionItem>()
        val body: String = intent.getStringExtra("body") ?: ""

        if (body.isEmpty()){
            Toast.makeText(baseContext, "This is not a food or drink, please try again",
                           Toast.LENGTH_SHORT).show()
            return
        }

        val map = JSONObject(body)

        val iterator = map.keys().forEach {
            try{
                val key = it
                if (key != "name"){
                    val names = key.split("_")
                    val length = names.size
                    val value: Double = map[key] as Double
                    val stringBuilder = StringBuilder()
                    for (i in 0..length-2){
                        stringBuilder.append(names[i])
                        stringBuilder.append(" ")
                    }

                    if (key == "calories"){
                        nutritionItems.add(NutritionItem(key,"$value kcal"))
                    }
                    else{
                        val newKey = stringBuilder.toString()
                        nutritionItems.add(NutritionItem(newKey,"$value ${names.last()}"))
                    }
                }
            }
            catch (e: java.lang.Exception){
                Log.e("error-loop", e.message ?: "")
            }
        }

        val nutritionItemsAdapter = NutritionItemsAdapter(this, nutritionItems)
        val nutritionListView = findViewById<ListView>(R.id.NutritionListView)
        nutritionListView.adapter = nutritionItemsAdapter
    }
}