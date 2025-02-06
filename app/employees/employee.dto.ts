export interface CreateEmployeeDTO {
    name: string;
    email: string;
    position: string;
    department: string;
    dateOfJoining: Date; 
}

export interface UpdateEmployeeDTO {
    name?: string;
    email?: string;
    position?: string;
    department?: string;
    dateOfJoining?: Date; 
}

export interface EmployeeResponse {
    data: {
        employee: {
            _id: string;
            name: string;
            email: string;
            position: string;
            department: string;
            dateOfJoining: Date; 
        };
    };
}
