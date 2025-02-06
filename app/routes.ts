import express from "express";
import swaggerUi from "swagger-ui-express";

import userRoutes from "./user/user.routes";
import employeeRoutes from './employees/employee.routes';
import attendanceRoutes from './attendence/attendence.routes';
import leaveRoutes from './leaves/leave.routes';
import logRoutes from './logs/log.routes';
import groupRoutes from './groups/group.routes';

import swaggerJsonFile from "../swagger/swagger.json"
// import { isAdminMiddleware } from "./common/middleware/isAdmin.middleware";


// routes
const router = express.Router();

router.use("/users" ,userRoutes);
router.use('/employees', employeeRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/leaves', leaveRoutes);
router.use('/logs', logRoutes);
router.use('/groups', groupRoutes);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonFile));

export default router;