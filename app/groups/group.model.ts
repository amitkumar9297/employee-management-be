import mongoose, { Document, Schema } from 'mongoose';

export interface IGroup extends Document {
    name: string;
    members: mongoose.Schema.Types.ObjectId[]; 
}

const groupSchema = new Schema<IGroup>({
    name: { type: String, required: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'Employee' }] 
}, {
    timestamps: true,
});

export const Group = mongoose.model<IGroup>('Group', groupSchema);
