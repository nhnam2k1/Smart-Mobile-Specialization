import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class ImageResponse(
    @SerialName("responses")
    val responses: List<Response>
)

@Serializable
data class Response(
    @SerialName("labelAnnotations")
    val labelAnnotations: List<LabelAnnotation>
)

@Serializable
data class LabelAnnotation(
    @SerialName("mid")
    val mid: String,
    @SerialName("description")
    val description: String,
    @SerialName("score")
    val score: Double,
    @SerialName("topicality")
    val topicality: Double
)