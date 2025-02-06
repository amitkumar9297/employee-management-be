import { Attendance, IAttendance } from './attendence.model';
import { Employee } from '../employees/employee.model';
import { CreateAttendanceDTO, UpdateAttendanceDTO } from './attendence.dto';

export class AttendanceService {
    /**
     * Creates a new attendance entry for an employee.
     * 
     * @param {CreateAttendanceDTO} data - The data to create the attendance entry with.
     * @returns {Promise<IAttendance>} The created attendance entry.
     * 
     * @throws {Error} Responds with a 500 status code if there is an error during creation.
     */
    async createAttendance(data: CreateAttendanceDTO): Promise<IAttendance> {
        const attendance = new Attendance(data);
        try {
            const savedAttendance = await attendance.save();
            await Employee.findByIdAndUpdate(
                data.employeeId,
                { $push: { attendance: { $each: [savedAttendance._id], $position: 0 } } },
                { new: true }
            );
            return savedAttendance;
        } catch (error) {
            console.error('Error saving attendance:', error);
            throw new Error('Failed to save attendance');
        }
    }

    /**
     * Updates an existing attendance entry with the provided data.
     * 
     * @param {string} id - The ID of the attendance entry to update.
     * @param {UpdateAttendanceDTO} data - The data to update the attendance entry with.
     * @returns {Promise<IAttendance | null>} The updated attendance entry, or null if not found.
     */
    async updateAttendance(id: string, data: UpdateAttendanceDTO): Promise<IAttendance | null> {
        return Attendance.findByIdAndUpdate(id, data, { new: true });

    }

    /**
     * Retrieves all attendance entries for an employee.
     * 
     * @param {string} employeeId - The ID of the employee to retrieve attendance entries for.
     * @returns {Promise<IAttendance[]>} The attendance entries for the employee.
     */
    async getAttendanceByEmployeeId(employeeId: string): Promise<IAttendance[]> {
        return Attendance.find({ employeeId });
    }

    /**
     * Retrieves all attendance entries.
     * 
     * @returns {Promise<IAttendance[]>} A promise that resolves to an array of all attendance entries.
     */
    async getAllAttendance(): Promise<IAttendance[]> {
        return Attendance.find();

    }

    /**
     * Deletes an attendance entry by ID.
     * 
     * @param {string} id - The ID of the attendance entry to delete.
     * @returns {Promise<IAttendance | null>} The deleted attendance entry, or null if not found.
     */
    async deleteAttendance(id: string): Promise<IAttendance | null> {
        return Attendance.findByIdAndDelete(id);
    }
}
