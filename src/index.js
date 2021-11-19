const
  { Client, Intents } = require('discord.js'),
  { TOKEN } = process.env,
  client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log('ready');
});

client.login(TOKEN);