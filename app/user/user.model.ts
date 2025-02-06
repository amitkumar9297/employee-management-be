import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    _id: object;
    name: string;
    email: string;
    password: string;
    role: "USER" | "HR";
    active: boolean;
    accessToken?: string;
    refreshToken?: string;
    resetPasswordToken?: string; 
    resetPasswordExpires?: Date; 
}

export interface UserResponse {
    data: {
      user: {
        _id: string;
        name: string;
        email: string;
        password: string;
        role: string;
      };
      accessToken: string;
      refreshToken: string;
    };
  }
  



const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["USER", "HR"], default: "USER" },
        active: { type: Boolean, default: true },
        accessToken: { type: String },
        refreshToken: { type: String },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date }, 
    },
    { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);