export interface CreateLogDTO {
    employeeId: string;
    action: string;
    details?: string;
}

export interface UpdateLogDTO {
    action?: string;
    details?: string;
}
