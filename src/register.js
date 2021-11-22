const
  { REST } = require('@discordjs/rest'),
  { Routes } = require('discord-api-types/v9'),
  { CLIENTID, TOKEN } = process.env,
  { readdirRecursive } = require('./functions'),
  rest = new REST({ version: '9' }).setToken(TOKEN),

  commands = readdirRecursive('./src/commands/global'),
  arr = [];

for(const file of commands) {
  const command = require(`../${file}`);
  arr.push(command.data);
}

rest.put(Routes.applicationCommands(CLIENTID), { body: arr })
  .then(a => console.log('Successfully registered application commands.', a))
  .catch(console.error);