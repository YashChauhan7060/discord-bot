import 'dotenv/config';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import express from "express"
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app=express();
const PORT=process.env.PORT||3000;

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
    res.render('index', { inviteLink });
});

app.listen(PORT,()=>{
    console.log(`Server is running at Port : ${PORT}`);
});

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