import { Employee, IEmployee } from './employee.model';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './employee.dto';

export class EmployeeService {
    /**
     * Creates a new employee with the provided data.
     * @param {CreateEmployeeDTO} data - The data required to create a new employee.
     * @returns {Promise<IEmployee>} The newly created employee.
     * @throws {Error} If there is an error during employee creation.
     */
    async createEmployee(data: CreateEmployeeDTO): Promise<IEmployee> {
        const employee = new Employee(data);
        return employee.save();
    }

    /**
     * Retrieves all employees.
     * 
     * @returns {Promise<IEmployee[]>} A promise that resolves with an array of employee objects.
     */
    async getAllEmployees(): Promise<IEmployee[]> {
        return Employee.find()
        .populate('attendance') 
        .populate('leaves')
        .populate('logs');  
    }

    /**
     * Retrieves an employee by their ID.
     * 
     * @param {string} id - The ID of the employee to retrieve.
     * @returns {Promise<IEmployee | null>} A promise that resolves with the employee object if found, or null if not found.
     * @throws {Error} If there is an error during retrieval.
     */
    async getEmployeeById(id: string): Promise<IEmployee | null> {
        return Employee.findById(id)
            .populate('attendance') 
            .populate('leaves')     
            .populate('logs'); 
    }

    /**
     * Retrieves all employees, with only _id, name, and email populated.
     * 
     * @returns {Promise<IEmployee[]>} A promise that resolves with an array of employee objects.
     */
    async fetchAllEmployees(): Promise<IEmployee[]> {
        const employees = await Employee.find().select('_id name email'); // Only fetch _id, name, and email
        return employees;
    }

    /**
     * Updates an existing employee.
     * @param {string} id - The ID of the employee to update.
     * @param {UpdateEmployeeDTO} data - The data to update the employee with.
     * @returns {Promise<IEmployee | null>} A promise that resolves with the updated employee object if found, or null if not found.
     * @throws {Error} If there is an error during update.
     */
    async updateEmployee(id: string, data: UpdateEmployeeDTO): Promise<IEmployee | null> {
        return Employee.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * Deletes an employee by their ID.
     * 
     * @param {string} id - The ID of the employee to delete.
     * @returns {Promise<IEmployee | null>} A promise that resolves with the deleted employee object if found, or null if not found.
     * @throws {Error} If there is an error during deletion.
     */
    async deleteEmployee(id: string): Promise<IEmployee | null> {
        return Employee.findByIdAndDelete(id);

    }
}
