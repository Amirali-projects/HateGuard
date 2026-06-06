const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        default: "Anonymous"
    },
    content: {
        type: String,
        required: true
    },
    toxicityScore: {
        type: Number,
        required: true,
        default: 0.0
    },
    category: {
        type: String,
        required: true,
        default: "Neutral"
    }
}, {
    // AUTOMATICALLY adds and manages createdAt and updatedAt fields natively in MongoDB
    timestamps: true 
});

module.exports = mongoose.model('Log', LogSchema);