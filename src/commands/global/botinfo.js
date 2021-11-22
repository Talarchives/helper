module.exports = {
  data: {
    name: 'botinfo',
    description: 'Shows information about the bot.'
  },
  async run(client, interaction) {
    const content = [
      `**Bot Name:** ${client.user.tag}`,
      `**Bot Owner:** ${(await client.application.fetch()).owner.tag}`,
      `**Bot Started:** <t:${Math.floor((new Date().getTime() - client.uptime) / 1000)}:R>`,
      `**Bot Guilds:** ${client.guilds.cache.size}`,
      `**Bot Channels:** ${client.channels.cache.size}`,
      `**Bot Users:** ${client.users.cache.size}`,
      `**Bot Commands:** ${client.commands.size}`
    ].join('\n');
    interaction.reply({ ephemeral: true, content });
  }
};