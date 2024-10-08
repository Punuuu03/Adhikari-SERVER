import { Request, Response } from 'express';
import Stripe from 'stripe';
import { Payment } from '../models/Payment';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

// Create a payment intent
export const createPaymentIntent = async (req: Request, res: Response) => {
  const { studentName, email, courseName, price } = req.body;

  try {
    const idempotencyKey = uuidv4();

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: price * 100,
        currency: 'inr',
        receipt_email: email,
        metadata: {
          courseName,
          studentName,
          price,
        },
      },
      { idempotencyKey }
    );

    const payment = new Payment({
      studentName,
      email,
      courseName,
      price,
      stripePaymentId: paymentIntent.id,
    });
    await payment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

// Verify Bank PIN
export const verifyPin = (req: Request, res: Response) => {
  const { pin, studentName, courseName, price } = req.body;

  // In a real scenario, you would verify this against a bank system or database
  const validPin = '1234'; // Placeholder

  if (pin === validPin) {
    const payment = new Payment({
      studentName,
      courseName,
      price,
      stripePaymentId: 'bank_payment_' + uuidv4(), // Placeholder for bank payment ID
    });
    payment.save();

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Invalid PIN' });
  }
};
