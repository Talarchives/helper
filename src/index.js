const
  { Client, Intents, Collection } = require('discord.js'),
  { TOKEN } = process.env,
  client = new Client({ intents: [Intents.FLAGS.GUILDS] }),

  { readdirRecursive } = require('./functions'),
  commands = readdirRecursive('./src/commands');

client.commands = new Collection();
for (const file of commands) {
  const command = require(`../${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('ready');
});

client.on('interactionCreate', interaction => {
  try {
    client.commands.get(interaction.commandName).run(client, interaction);
  } catch (e) {
    console.log(e);
  }
});

client.login(TOKEN);