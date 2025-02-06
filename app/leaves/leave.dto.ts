export interface CreateLeaveDTO {
    employeeId: string;
    startDate: Date;
    endDate: Date;
    reason: string;
}

export interface UpdateLeaveDTO {
    status?: 'pending' | 'approved' | 'rejected';
}
