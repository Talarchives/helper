const
  { Client, Intents, Collection } = require('discord.js'),
  { TOKEN } = process.env,
  client = new Client({ intents: [Intents.FLAGS.GUILDS] }),

  fs = require('fs'), path = require('path'),
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

function readdirRecursive(directory) {
  const result = [];

  (function read(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filepath = path.join(dir, file);

      if (fs.statSync(filepath).isDirectory()) {
        read(filepath);
      } else {
        result.push(filepath.replace(/\\/g, '/'));
      }
    }
  }(directory));

  return result;
}