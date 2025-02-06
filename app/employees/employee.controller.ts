import { Request, Response } from 'express';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './employee.dto';

const employeeService = new EmployeeService();

export class EmployeeController {

    /**
     * Creates a new employee with the provided data.
     * 
     * @param {Request} req - The Express request object containing the employee data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 400 status code if there is an error during creation.
     */
    async createEmployee(req: Request, res: Response): Promise<void> {
        try {
            const employee = await employeeService.createEmployee(req.body);
            res.status(201).json({ data: { employee } });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Retrieves all employees.
     *
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object used to send the response.
     *
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     *
     * @throws {Error} Responds with a 500 status code if there is an error during retrieval.
     */
    async getAllEmployees(req: Request, res: Response): Promise<void> {
        try {
            const employees = await employeeService.getAllEmployees();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    /**
     * Retrieves an employee by their ID.
     *
     * @param {Request} req - The Express request object containing the employee ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     *
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     *
     * @throws {Error} Responds with a 404 status code if the employee is not found, or a 500 status code if there is an error during retrieval.
     */
    async getEmployeeById(req: Request, res: Response): Promise<void> {
        try {
            const employee = await employeeService.getEmployeeById(req.params.id);
            if (!employee) {
                res.status(404).json({ message: "Employee not found" });
                return;
            }
            res.status(200).json(employee);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    /**
     * Retrieves all employees from the database.
     * 
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<Response>} A promise that resolves with the response object.
     * 
     * @throws {Error} Responds with a 500 status code if there is an error during retrieval.
     */
    public async fetchAllEmployees(req: Request, res: Response): Promise<Response> {
        try {
            const employees = await employeeService.fetchAllEmployees();
            return res.status(200).json(employees);
        } catch (error) {
            console.error('Error fetching employees:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Updates an employee's information.
     * 
     * @param {Request} req - The Express request object containing the employee ID in the parameters and the updated data in the body.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 404 status code if the employee is not found, or a 400 status code if there is an error during update.
     */
    async updateEmployee(req: Request, res: Response): Promise<void> {
        try {

            const employee = await employeeService.updateEmployee(req.params.id, req.body);
            if (!employee) {
                res.status(404).json({ message: "Employee not found" });
                return;
            }
            res.status(200).json(employee);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    /**
     * Deletes an employee.
     * 
     * @param {Request} req - The Express request object containing the employee ID in the parameters.
     * @param {Response} res - The Express response object used to send the response.
     * 
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     * 
     * @throws {Error} Responds with a 404 status code if the employee is not found, or a 500 status code if there is an error during deletion.
     */
    async deleteEmployee(req: Request, res: Response): Promise<void> {
        try {
            const employee = await employeeService.deleteEmployee(req.params.id);
            if (!employee) {
                res.status(404).json({ message: "Employee not found" });
                return;
            }
            res.status(200).json({ message: "Employee deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
