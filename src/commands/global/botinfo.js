module.exports = {
  data: {
    name: 'botinfo',
    description: 'Shows information about the bot.'
  },
  async run(client, interaction) {
    const content = [
      `**Bot Name:** ${client.user.tag}`,
      `**Bot Owner:** ${(await client.users.fetch(process.env.OWNERID)).username}`,
      `**Bot Uptime:** ${client.uptime}`,
      `**Bot Guilds:** ${client.guilds.cache.size}`,
      `**Bot Channels:** ${client.channels.cache.size}`,
      `**Bot Users:** ${client.users.cache.size}`,
      `**Bot Commands:** ${client.commands.size}`
    ].join('\n');
    interaction.reply({ ephemeral: true, content });
  }
};