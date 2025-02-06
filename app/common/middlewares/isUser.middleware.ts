import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {User} from "../../user/user.model"; 

export const isUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    try {
        // Verify the JWT token
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "access_secret") as { userId: string; email: string; role: string };

        // Fetch user from the database
        const user = await User.findById(payload.userId).select("role email");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check role in the database and token
        if (user.role !== payload.role || (user.role !== "USER" && user.role !== "HR")) {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }

        // Attach user data to the request object
        req.user = {
            userId: user._id,
            email: user.email,
            role: user.role,
        };

        next(); // Proceed to the next middleware or route
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};
