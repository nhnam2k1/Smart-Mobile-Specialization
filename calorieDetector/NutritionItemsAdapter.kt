package com.example.AutomaticCalorieDetector

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.TextView

class NutritionItemsAdapter(context: Context, items: ArrayList<NutritionItem>) :
    ArrayAdapter<NutritionItem>(context,0, items)
{
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View
    {
        val currentItemView: View = convertView
            ?: LayoutInflater
                .from(context)
                .inflate(R.layout.nutrition_item, parent, false)

        val nutritionItem: NutritionItem? = getItem(position)

        val nutritionView = currentItemView.findViewById<TextView>(R.id.nutritionTextView)
        nutritionView.text = nutritionItem?.Name

        val quantityView = currentItemView.findViewById<TextView>(R.id.quantityTextView)
        quantityView.text = nutritionItem?.Quantity

        return currentItemView
    }
}


