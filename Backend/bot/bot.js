const { Client, GatewayIntentBits } = require("discord.js");
const Log = require("../models/Log");
const { analyzeText } = require("../services/mlService");

const startBot = () => {

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });

    client.once("ready", () => {
        console.log(`🤖 HateGuard Bot is Online as ${client.user.tag}`);
    });

    client.on("messageCreate", async (message) => {

        // Ignore bots
        if (message.author.bot) return;

        try {

            const result = await analyzeText(message.content);

            const {
                is_hate,
                confidence,
                category
            } = result;

            console.log("Prediction:", result);

            // Moderate only hate messages
            if (is_hate && confidence >= 0.70) {

                // Delete message
                try {
                    await message.delete();
                } catch (err) {
                    console.error("❌ Unable to delete message:", err.message);
                }

                // Send warning
                const warning = await message.channel.send(
                    `🚫 ${message.author}, your message has been removed because it was detected as **${category}**.\n\nConfidence: **${(confidence * 100).toFixed(2)}%**`
                );

                // Save exactly what the frontend expects
                await Log.create({
                    username: message.author.tag,
                    content: message.content,
                    toxicityScore: confidence,
                    category: category
                });

                console.log(
                    `🚨 ${category} Detected | User: ${message.author.tag} | Confidence: ${(confidence * 100).toFixed(2)}%`
                );

                // Remove warning after 7 seconds
                setTimeout(async () => {
                    try {
                        await warning.delete();
                    } catch (_) {}
                }, 7000);

            } else {

                console.log(
                    `✅ Clean Message | ${message.author.tag} | Confidence: ${(confidence * 100).toFixed(2)}%`
                );
            }

        } catch (error) {
            console.error("🚨 Bot Error:", error.message);
        }

    });

    client.login(process.env.DISCORD_TOKEN);
};

module.exports = startBot;