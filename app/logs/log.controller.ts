import { Request, Response } from 'express';
import { LogService } from './log.service';
import { CreateLogDTO, UpdateLogDTO } from './log.dto';

export class LogController {
    private logService = new LogService();

/**
 * Creates a new log entry.
 * 
 * @param {Request} req - The Express request object containing the log data in the body.
 * @param {Response} res - The Express response object used to send the response.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * 
 * @throws {Error} Responds with a 500 status code if there is an error during log creation.
 */

    async createLog(req: Request, res: Response): Promise<void> {
        const logData: CreateLogDTO = req.body;
        const log = await this.logService.createLog(logData);
        res.status(201).json(log);
    }

    /**
     * Updates an existing log entry.
     * 
     * @param {Request} req - The Express request object containing the log ID in the parameters and the updated log data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async updateLog(req: Request, res: Response): Promise<void> {
        const id = req.params.id;

        const logData: UpdateLogDTO = req.body;
        const updatedLog = await this.logService.updateLog(id, logData);
        res.json(updatedLog);
    }

    /**
     * Retrieves all log entries for a given employee.
     * 
     * @param {Request} req - The Express request object containing the employee ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */


    async getLogsByEmployeeId(req: Request, res: Response): Promise<void> {
        const employeeId = req.params.employeeId;
        const logs = await this.logService.getLogsByEmployeeId(employeeId);
        res.json(logs);
    }
/**
 * Retrieves all log entries.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object used to send the response.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
    async getAllLogs(req: Request, res: Response): Promise<void> {
        const logs = await this.logService.getAllLogs();
        res.json(logs);
    }

    /**
     * Deletes a log entry by ID.
     * 
     * @param {Request} req - The Express request object containing the log ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async deleteLog(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const deletedLog = await this.logService.deleteLog(id);
        res.json(deletedLog);
    }
}
