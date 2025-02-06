export interface CreateAttendanceDTO {
    employeeId: string;
    date: Date;
    status: 'present' | 'absent' | 'leave';
    inTime?: Date;
    outTime?: Date;
}

export interface UpdateAttendanceDTO {
    status?: 'present' | 'absent' | 'leave';
    inTime?: Date;
    outTime?: Date;
}
