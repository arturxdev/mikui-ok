import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for a Word document
interface IWord extends Document {
  userId: string;
  present: string;
  past: string;
  participle: string;
  lastReviewed: Date;
  nextReview: Date;
  reviewCount: number;
}

// Create the Word schema
const WordSchema: Schema = new Schema({
  userId: { type: String, required: true },
  present: { type: String, required: true },
  past: { type: String, required: true },
  participle: { type: String, required: true },
  lastReviewed: { type: Date, default: Date.now },
  nextReview: { type: Date, required: true },
  reviewCount: { type: Number, default: 0 }
});

export default mongoose.models.Word ||  mongoose.model<IWord>('Word', WordSchema);