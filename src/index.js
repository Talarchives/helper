const
  { Client, Intents, Collection } = require('discord.js'),
  { TOKEN } = process.env,
  client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES] }),

  { readdirRecursive } = require('./functions'),
  commands = readdirRecursive('./src/commands');

client.commands = new Collection();
for (const file of commands) {
  const command = require(`../${file}`);
  client.commands.set(command.data?.name, command);
}

client.on('ready', () => console.log('Ready', new Date()));

client.on('interactionCreate', i => {
  try {
    client.commands.get(i.commandName)?.run(client, i);
  } catch (error) {
    console.log(new Date(), error);
  }
});

process.on('unhandledRejection', e => {
  console.log(new Date(), e);
});
client.login(TOKEN);