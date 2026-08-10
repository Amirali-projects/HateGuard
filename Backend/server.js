// 1. Load environment variables FIRST before importing files that use process.env
require('dotenv').config();

// 2. Import external packages
const express = require('express');
const cors = require('cors');

// 3. Import local modules safely now that process.env is populated
const connectDB = require('./config/db');
const startBot = require('./bot/bot');

const app = express();

// 🛡️ CRITICAL GLOBAL PROCESS SAFEGUARDS
// Catches unhandled promise rejections (like Gemini/Discord API network drops)
process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Critical Unhandled Rejection detected:', reason.stack || reason);
    // Keep server alive, but log the exact trace details for debugging
});

// Catches general uncaught synchronous runtime exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Critical Uncaught Exception detected:', error.stack || error.message);
    // Gracefully shutdown if the core node process is corrupted
    if (error.message && !error.message.includes('undici')) {
        process.exit(1);
    }
});


// ⚙️ MIDDLEWARE CONFIGURATION
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Restricts CORS to frontend domain
    credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Safety restriction against payload flood overhead

// 🛣️ API ROUTES
app.use('/api/logs', require('./routes/logRoutes'));

// Health Check Endpoint (Crucial for Cloud Platforms like Render/Vercel to monitor app status)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('💥 Unhandled System Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 🚀 BOOTSTRAP SYSTEM (Sequential & Secure)
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // 1. Wait for database to connect successfully first
        await connectDB();
        console.log('✅ MongoDB Lifecycle Connected.');

        // 2. Start the HTTP Express Web Server listener
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running smoothly on port ${PORT}`);
        });

        // 3. Initialize the HateGuard Discord bot engine safely
        console.log('🤖 Initializing Discord Bot runtime container...');
        await startBot();
        console.log('✅ HateGuard Bot WebSocket Handshake complete.');

    } catch (startupError) {
        console.error('🚨 Severe System Initialization Failure:', startupError.stack || startupError.message);
        // Force immediate exit if the core stack fails to mount on boot
        process.exit(1);
    }
};

// Execute initialization pipeline
startServer();


