import { Log, ILog } from './log.model';
import { Employee } from '../employees/employee.model';
import { CreateLogDTO, UpdateLogDTO } from './log.dto';

export class LogService {
    /**
     * Creates a new log entry.
     * 
     * @param {CreateLogDTO} data - The data required to create a new log entry.
     * @returns {Promise<ILog>} The newly created log entry.
     * 
     * @throws {Error} Responds with a 500 status code if there is an error during creation.
     */
    async createLog(data: CreateLogDTO): Promise<ILog> {
        const log = new Log(data);
        try {
            const savedLog = await log.save();
            await Employee.findByIdAndUpdate(
                data.employeeId,
                { $push: { logs: { $each: [savedLog._id], $position: 0 } } },
                { new: true }
            );
            return savedLog;
        } catch (error) {
            console.error('Error saving log:', error);
            throw new Error('Failed to save log');
        }
    }
    

    /**
     * Updates an existing log entry with the provided data.
     * 
     * @param {string} id - The ID of the log entry to update.
     * @param {UpdateLogDTO} data - The data to update the log entry with.
     * @returns {Promise<ILog | null>} The updated log entry if found, otherwise null.
     */
    async updateLog(id: string, data: UpdateLogDTO): Promise<ILog | null> {
        return Log.findByIdAndUpdate(id, data, { new: true });

    }

    /**
     * Retrieves all log entries for an employee.
     * 
     * @param {string} employeeId - The ID of the employee to retrieve log entries for.
     * @returns {Promise<ILog[]>} The log entries for the employee.
     */
    async getLogsByEmployeeId(employeeId: string): Promise<ILog[]> {
        return Log.find({ employeeId });
    }

    /**
     * Retrieves all log entries from the database.
     * 
     * @returns {Promise<ILog[]>} A promise that resolves with an array of all log entries.
     */
    async getAllLogs(): Promise<ILog[]> {
        return Log.find();

    }

    /**
     * Deletes a log entry by ID.
     * 
     * @param {string} id - The ID of the log entry to delete.
     * @returns {Promise<ILog | null>} The deleted log entry if found, otherwise null.
     */
    async deleteLog(id: string): Promise<ILog | null> {
        return Log.findByIdAndDelete(id);
    }
}
