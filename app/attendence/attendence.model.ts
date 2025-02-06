import { Schema, model, Document } from 'mongoose';

export interface IAttendance extends Document {
    employeeId: Schema.Types.ObjectId;
    date: Date;
    status: 'present' | 'absent' | 'leave'; 
    inTime?: Date; 
    outTime?: Date; 
}


const attendanceSchema = new Schema<IAttendance>({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true }, 
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent', 'leave'], required: true },
    inTime: { type: Date },
    outTime: { type: Date }
}, {
    timestamps: true, 
});

export const Attendance = model<IAttendance>('Attendance', attendanceSchema);
