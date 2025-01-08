import { Schema, model } from "mongoose";
import { Food } from "../interfaces/Food";

export const FoodSchema = new Schema<Food>(
    {
    name: { type: String, required: true },
    cookTime: { type: String, required: true },
    price: { type: Number, required: true },
    favourite: { type: Boolean, default: false },
    origins: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    tags: { type: [String], required: true },
    lang: { type: String, required: true },
    branches: [{ // Using object notation to describe Branch directly in the array
        branch: { type: String, required: true },
        stock: { type: Number, required: true },
    }]
    }, 
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    }
);

export const FoodModel = model<Food>('food', FoodSchema);