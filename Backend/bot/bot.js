const { Client, GatewayIntentBits } = require('discord.js');
const Log = require('../models/Log');
const { analyzeText } = require('../services/mlService');

const startBot = () => {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });

    client.on('ready', () => {
        console.log(`🤖 HateGuard Bot is successfully online as ${client.user.tag}`);
    });

    client.on('messageCreate', async (message) => {
        // Prevent the bot from scanning its own messages or other bots
        if (message.author.bot) return;

        try {
            // Get evaluation from your machine learning service layer
            const result = await analyzeText(message.content);
            const { is_hate, confidence, category } = result;

            // Strict Filter: Only moderate if flagged by model/threshold AND it's not a Clean/Neutral classification
            if ((is_hate || confidence > 0.50) && category !== 'Neutral' && category !== 'Clean') {
                
                // 🚫 IMMEDIATE ENFORCEMENT: Delete the message on the very first occurrence
                try {
                    await message.delete();
                } catch (delErr) {
                    console.error("Could not delete message. Check Bot Role Hierarchy position:", delErr.message);
                }

                // Notify the channel that the violation was instantly removed
                const alertWarning = await message.channel.send(
                    `🚫 **Message Removed ${message.author}:** Your message was removed by **HateGuard** for violating speech guidelines [Reason: ${category} | Confidence: ${(confidence * 100).toFixed(1)}%].`
                );

                // Commit the incident row straight to MongoDB for your dashboard tracking
                await Log.create({
                    username: message.author.tag,
                    content: message.content,
                    toxicityScore: confidence,
                    category: category
                });

                // Self-delete the bot's public warning notification after 7 seconds to keep chat clean
                setTimeout(() => alertWarning.delete().catch(() => {}), 7000);
                
                console.log(`🛑 Immediate infraction handled. Message purged and logged for user: ${message.author.tag}`);
            }

        } catch (err) {
            console.error("❌ HateGuard Core Logic Error:", err.message);
        }
    });

    client.login(process.env.DISCORD_TOKEN);
};

module.exports = startBot;