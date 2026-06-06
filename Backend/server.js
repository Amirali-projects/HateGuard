// 1. Load environment variables FIRST before importing files that use process.env
require('dotenv').config();

// 2. Import external packages
const express = require('express');
const cors = require('cors');

// 3. Import local modules safely now that process.env is populated
const connectDB = require('./config/db');
const startBot = require('./bot/bot');

const app = express();

// Initialize Database Connection with basic error catching
connectDB().catch(err => {
    console.error('❌ Database connection failed on startup:', err.message);
});

// Middleware Configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Restricts CORS to frontend domain
    credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Safety restriction against payload flood overhead

// API Routes
app.use('/api/logs', require('./routes/logRoutes'));

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('💥 Unhandled System Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Define Application Port
const PORT = process.env.PORT || 5000;

// Start Server and bot concurrently
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    
    // Initialize your custom HateGuard Discord bot engine safely
    try {
        startBot();
    } catch (botError) {
        console.error('❌ Failed to initialize Discord bot runtime:', botError.message);
    }
});