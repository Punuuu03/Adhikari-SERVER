import express from 'express';
import { createPaymentIntent, verifyPin } from '../controllers/paymentController';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/verify-pin', verifyPin);

export default router;
