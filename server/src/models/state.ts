import mongoose, { Document, Schema } from 'mongoose';

export interface IState extends Document {
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const StateSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
});

StateSchema.statics.summarizeStateCounts = async function () {
  // Implementation for summarizing state counts by hours, days, and months
};

export default mongoose.model<IState>('State', StateSchema);
