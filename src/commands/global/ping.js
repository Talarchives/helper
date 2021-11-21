module.exports = {
  data: {
    name: 'ping',
    description: 'Get bot\'s websocket latency'
  },
  run(client, interaction) {
    return interaction.reply({ ephemeral: true, content:  `${client.ws.ping}ms` });
  }
};