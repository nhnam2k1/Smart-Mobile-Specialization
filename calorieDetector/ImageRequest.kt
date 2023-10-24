package com.example.AutomaticCalorieDetector

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class ImageRequest(
    @SerialName("requests")
    val requests: List<Request>
)

@Serializable
data class Request(
    @SerialName("image")
    val image: Image,

    @SerialName("features")
    val features: List<Feature>
)

@Serializable
data class Image(
    @SerialName("content")
    val content: String
)

@Serializable
data class Feature(
    @SerialName("type")
    val type: String,

    @SerialName("maxResults")
    val maxResults: Int
)