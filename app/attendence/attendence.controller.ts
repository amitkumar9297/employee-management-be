import { Request, Response } from 'express';
import { AttendanceService } from './attendence.service';
import { CreateAttendanceDTO, UpdateAttendanceDTO } from './attendence.dto';

const attendanceService = new AttendanceService();

export class AttendanceController {
/**
 * Creates a new attendance entry for an employee.
 * 
 * @param {Request} req - The Express request object containing the attendance data in the body.
 * @param {Response} res - The Express response object used to send the response.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * 
 * @throws {Error} Responds with a 400 status code if there is an error during creation.
 */

    async createAttendance(req: Request, res: Response): Promise<void> {
        try {
            const attendance = await attendanceService.createAttendance(req.body);
            res.status(201).json(attendance);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Updates an existing attendance entry for an employee.
     * 
     * @param {Request} req - The Express request object containing the attendance ID in the parameters and the updated data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 400 status code if there is an error during update.
     * @throws {Error} Responds with a 404 status code if the attendance is not found.
     */
    async updateAttendance(req: Request, res: Response): Promise<void> {
        try {
            const attendance = await attendanceService.updateAttendance(req.params.id, req.body);
            if (!attendance) {
                res.status(404).json({ message: 'Attendance not found' });
                return;
            }
            res.status(200).json(attendance);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Retrieves all attendance entries for an employee.
     * 
     * @param {Request} req - The Express request object containing the employee ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 500 status code if there is an error during retrieval.
     */
    async getAttendanceByEmployeeId(req: Request, res: Response): Promise<void> {
        try {
            const attendance = await attendanceService.getAttendanceByEmployeeId(req.params.employeeId);
            res.status(200).json(attendance);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    /**
     * Retrieves all attendance entries.
     * 
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 500 status code if there is an error during retrieval.
     */
    async getAllAttendance(req: Request, res: Response): Promise<void> {
        try {
            const attendance = await attendanceService.getAllAttendance();
            res.status(200).json(attendance);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    /**
     * Deletes an attendance entry by its ID.
     * 
     * @param {Request} req - The Express request object containing the attendance ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 404 status code if the attendance is not found.
     * @throws {Error} Responds with a 500 status code if there is an error during deletion.
     */

    async deleteAttendance(req: Request, res: Response): Promise<void> {
        try {
            const attendance = await attendanceService.deleteAttendance(req.params.id);
            if (!attendance) {
                res.status(404).json({ message: 'Attendance not found' });
                return;
            }
            res.status(200).json({ message: 'Attendance deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
