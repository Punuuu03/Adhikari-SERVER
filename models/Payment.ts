import mongoose, { Schema, Document } from 'mongoose';

// Define an interface to represent a Payment document
export interface IPayment extends Document {
  studentName: string;
  email: string;
  courseName: string;
  price: number;
  stripePaymentId: string; // ID from Stripe for tracking the payment
}

// Create a Mongoose schema for the Payment model
const paymentSchema: Schema = new Schema(
  {
    studentName: { type: String, required: true },
    email: { type: String, required: true },
    courseName: { type: String, required: true },
    price: { type: Number, required: true },
    stripePaymentId: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Payment model
export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
