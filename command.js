import { REST, Routes } from 'discord.js';


const TOKEN = "MTQ2MTQxOTg5OTYxMTI1MDY4OQ.GBNVty.FuQoNPb6M7-ZpVEdZaWQHwiej1wYIe2nk-oTPM"; 
const CLIENT_ID = "1461419899611250689";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();