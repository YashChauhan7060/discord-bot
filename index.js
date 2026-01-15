import 'dotenv/config';
import { Client, GatewayIntentBits, Partials } from 'discord.js';

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel],
    rest: { timeout: 60000 }
});

client.on("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}! Listening for messages...`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        console.log(interaction);
        await interaction.reply("Pong!!");
    }
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    console.log(`[${message.author.username}]: ${message.content}`);

    message.reply(`Hi from Bot`);
});

// Use your token
client.login(process.env.TOKEN);