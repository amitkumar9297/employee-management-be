import { Leave, ILeave } from './leave.model';
import { Employee } from '../employees/employee.model';
import { CreateLeaveDTO, UpdateLeaveDTO } from './leave.dto';

export class LeaveService {
    /**
     * Creates a new leave with the provided data.
     * 
     * @param {CreateLeaveDTO} data - The data required to create a new leave.
     * @returns {Promise<ILeave>} The newly created leave.
     * 
     * @throws {Error} Responds with a 500 status code if there is an error during creation.
     */
    async createLeave(data: CreateLeaveDTO): Promise<ILeave> {
        const leave = new Leave(data);
        try {
            const savedLeave = await leave.save();
            await Employee.findByIdAndUpdate(
                data.employeeId,
                { $push: { leaves: { $each: [savedLeave._id], $position: 0 } } },
                { new: true }
            );
            return savedLeave;
        } catch (error) {
            console.error('Error saving leave:', error);
            throw new Error('Failed to save leave');
        }
    }
    

    /**
     * Updates an existing leave with the provided data.
     * 
     * @param {string} id - The ID of the leave to update.
     * @param {UpdateLeaveDTO} data - The data to update the leave with.
     * @returns {Promise<ILeave | null>} The updated leave if found, otherwise null.
     * 
     * @throws {Error} Responds with a 404 status code if the leave is not found, or a 500 status code if there is an error during update.
     */
    async updateLeave(id: string, data: UpdateLeaveDTO): Promise<ILeave | null> {
        return Leave.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * Retrieves all leaves for a given employee.
     * 
     * @param {string} employeeId - The ID of the employee to retrieve leaves for.
     * @returns {Promise<ILeave[]>} The leaves for the employee.
     */
    async getLeavesByEmployeeId(employeeId: string): Promise<ILeave[]> {
        return Leave.find({ employeeId });
    }

    /**
     * Retrieves all leaves from the database.
     * 
     * @returns {Promise<ILeave[]>} The leaves from the database.
     */
    async getAllLeaves(): Promise<ILeave[]> {
        return Leave.find();
    }

    /**
     * Deletes a leave by its ID.
     * 
     * @param {string} id - The ID of the leave to delete.
     * @returns {Promise<ILeave | null>} The deleted leave if found, otherwise null.
     * 
     * @throws {Error} Responds with a 404 status code if the leave is not found, or a 500 status code if there is an error during deletion.
     */
    async deleteLeave(id: string): Promise<ILeave | null> {
        return Leave.findByIdAndDelete(id);
    }
}
