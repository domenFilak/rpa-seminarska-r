import { Schema, model } from "mongoose";
import { User } from "../interfaces/User";

export const UserSchema = new Schema<User>(
    {
        email: { type: String, required: true, unique: true },  
        password: { type: String, required: true },  
        name: { type: String, required: true },
        address: { type: String, required: true },
        isAdmin: { type: Boolean, required: true }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

export const UserModel = model<User>('user', UserSchema);
