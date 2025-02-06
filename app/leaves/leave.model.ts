import { Schema, model, Document } from 'mongoose';

export interface ILeave extends Document {
    employeeId: Schema.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
}

const leaveSchema = new Schema<ILeave>({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, {
    timestamps: true,
});

export const Leave = model<ILeave>('Leave', leaveSchema);
