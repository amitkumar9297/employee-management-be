import { Request, Response } from 'express';
import { LeaveService } from './leave.service';
import { CreateLeaveDTO, UpdateLeaveDTO } from './leave.dto';

export class LeaveController {
    private leaveService = new LeaveService();

    /**
     * Creates a new leave with the provided data.
     * 
     * @param {Request} req - The Express request object containing the leave data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 400 status code if there is an error during creation.
     */
    async createLeave(req: Request, res: Response): Promise<void> {
        const leaveData: CreateLeaveDTO = req.body;
        const leave = await this.leaveService.createLeave(leaveData);
        res.status(201).json(leave);
    }

    /**
     * Updates an existing leave with the provided data.
     * 
     * @param {Request} req - The Express request object containing the leave ID in the parameters and the updated leave data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 404 status code if the leave is not found, or a 400 status code if there is an error during update.
     */
    async updateLeave(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const leaveData: UpdateLeaveDTO = req.body;
        const updatedLeave = await this.leaveService.updateLeave(id, leaveData);
        res.status(updatedLeave ? 200 : 404).json(updatedLeave);
    }

    /**
     * Retrieves all leaves for a given employee.
     * 
     * @param {Request} req - The Express request object containing the employee ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 500 status code if there is an error during retrieval.
     */
    async getLeavesByEmployeeId(req: Request, res: Response): Promise<void> {
        const { employeeId } = req.params;
        const leaves = await this.leaveService.getLeavesByEmployeeId(employeeId);
        res.status(200).json(leaves);
    }

    /**
     * Retrieves all leaves from the database.
     * 
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 500 status code if there is an error during retrieval.
     */
    async getAllLeaves(req: Request, res: Response): Promise<void> {
        const leaves = await this.leaveService.getAllLeaves();
        res.status(200).json(leaves);
    }

    /**
     * Deletes a leave by its ID.
     * 
     * @param {Request} req - The Express request object containing the leave ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 404 status code if the leave is not found.
     */

    async deleteLeave(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const deletedLeave = await this.leaveService.deleteLeave(id);
        res.status(deletedLeave ? 200 : 404).json(deletedLeave);
    }
}
