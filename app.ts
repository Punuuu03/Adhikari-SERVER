import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Import routes
import categoryRoutes from './routes/categoryRoutes';
import authRoutes from './routes/authRoutes';
import videoRoutes from './routes/videoRoutes'; // Import video routes
// import { stripeRouter } from './routes/stripeRoutes'; // Import Stripe payment routes
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

export const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://adhikari-client-final.vercel.app","http://localhost:5173"],
    methods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/payment', stripeRouter); // Use Stripe for /api/payment
app.use('/api/categories', categoryRoutes);
app.use('/api/videos', videoRoutes); // Add video routes
app.use('/api/payments', paymentRoutes);

// Catch-all route for unknown paths
app.all('*', (req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

// Note: The server setup and MongoDB connection are now in server.ts
