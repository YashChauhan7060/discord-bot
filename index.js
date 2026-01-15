import { Client, GatewayIntentBits, Partials } from 'discord.js';

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, // Required to read text
        GatewayIntentBits.DirectMessages, // Required to receive DMs
    ],
    partials: [Partials.Channel], // Required for DMs to work consistently
    rest: { timeout: 60000 }
});

client.on("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}! Listening for messages...`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        console.log(interaction); // Logs the full interaction object as seen in your screenshot
        await interaction.reply("Pong!!");
    }
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    console.log(`[${message.author.username}]: ${message.content}`);

    message.reply(`Hi from Bot`);
});

// Use your token
client.login("MTQ2MTQxOTg5OTYxMTI1MDY4OQ.GBNVty.FuQoNPb6M7-ZpVEdZaWQHwiej1wYIe2nk-oTPM");