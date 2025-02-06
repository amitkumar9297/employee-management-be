import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
    name: string;
    email: string;
    position: string;
    department: string;
    dateOfJoining: Date; 
    status?: 'active' | 'inactive' | 'terminated'; 
    employeeNumber?: string; 
    phoneNumber?: string; 
    address?: string;
    attendance?: Schema.Types.ObjectId[];  
    leaves?: Schema.Types.ObjectId[];     
    logs?: Schema.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

const employeeSchema = new Schema<IEmployee>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    dateOfJoining: { type: Date, required: true }, 
    status: { type: String, enum: ['active', 'inactive', 'terminated'], default: 'active' }, 
    employeeNumber: { type: String, unique: true }, 
    phoneNumber: { type: String }, 
    address: { type: String },
    attendance: [{ type: Schema.Types.ObjectId, ref: 'Attendance' }], 
    leaves: [{ type: Schema.Types.ObjectId, ref: 'Leave' }],        
    logs: [{ type: Schema.Types.ObjectId, ref: 'Log' }],  
}, {
    timestamps: true,
});

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);
