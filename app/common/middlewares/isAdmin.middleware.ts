import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../../user/user.model"; // Replace with the correct path to your User model

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    try {
        // Verify the JWT token
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "access_secret") as {
            userId: string;
            email: string;
            role: string;
        };

        // Fetch user from the database using the userId from the token
        const user = await User.findById(payload.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the role in the token with the role in the database
        if (user.role !== payload.role || user.role !== "HR") {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }

        // Attach the user to the request object for downstream middleware/routes
        req.user = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};
