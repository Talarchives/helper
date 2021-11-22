module.exports = {
  data: {
    name: 'botinfo',
    description: 'Shows information about the bot.'
  },
  run(client, interaction) {
    interaction.reply({ ephemeral: true, content: 'Stuff about the bot' });
  }
};