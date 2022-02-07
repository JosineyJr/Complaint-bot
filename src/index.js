require('dotenv').config(); //initialize dotenv
const { Client, Intents } = require('discord.js');
const getCommands = require('./app/commands');
const mongoConnection = require('./data/mongodb/connection');

(async () => {
  try {
    const connection = await mongoConnection({ uri: process.env.MONGODB_URI });
    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING] });
    const commands = await getCommands({ connection });
    client.login(process.env.CLIENT_TOKEN);

    client.on('ready', async (_client) => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('messageCreate', async (message) => {
      const prefix = '!';
      if (message.author.bot) return;
      if (!message.content.startsWith(prefix)) return;

      const commandBody = message.content.slice(prefix.length);
      const args = commandBody.split(' ');
      const command = args.shift().toLowerCase();

      return commands[command]?.({ message, args });
    });
  } catch (e) {
    console.error(e.stack);
  }
})();
