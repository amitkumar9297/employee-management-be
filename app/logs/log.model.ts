import { Schema, model, Document } from 'mongoose';

export interface ILog extends Document {
    employeeId: Schema.Types.ObjectId;
    action: string;
    timestamp: Date;
    details?: string;
}

const logSchema = new Schema<ILog>({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String }
}, {
    timestamps: true,
});

export const Log = model<ILog>('Log', logSchema);
