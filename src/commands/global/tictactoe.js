const { MessageActionRow, MessageButton, InteractionCollector } = require('discord.js');

module.exports = {
  data: {
    name: 'tictactoe',
    description: 'Play a game of tic tac toe with another user.',
    options: [
      {
        type: 6, // User
        name: 'user',
        description: 'The user to play with.',
        required: true
      }
    ]
  },
  run: async (client, interaction) => {
    const components = [], rows = [[0,0,0], [0,0,0], [0,0,0]],
      user = interaction.options.getUser('user');
    if(user.id === interaction.user.id || user.bot) return interaction.reply('You can\'t play with that user.');
    let turn = user.id;
    for (let i = 0; i < 3; i++) {
      const buttons = [];
      for (let j = 0; j < 3; j++) {
        buttons.push(new MessageButton().setCustomId(`${interaction.id}|${i}|${j}`).setLabel('🤍').setStyle('SECONDARY'));
      }
      components.push(new MessageActionRow().addComponents(buttons));
    }
    const message = await interaction.reply({ content: `${user}'s turn`, components });
    
    const filter = (i) => i.customId.startsWith(interaction.id) && (i.user.id === interaction.user.id || i.user.id === user.id);
    const collector = new InteractionCollector(client, { filter, time: 6e5, idle: 6e4, message });
    collector.on('collect', async i => {
      const a = i.customId.split('|'),
        self = i.user.id === interaction.user.id ? true : false;
      
      if(i.user.id !== turn || rows[a[1]][a[2]] !== 0) return i.update({ fetchReply: false });
      rows[a[1]][a[2]] = self ? 1 : 2;
      components[a[1]].components[a[2]]
        .setLabel(`${self ? '❌' : '🟢'}`)
        .setStyle(self ? 'DANGER' : 'SUCCESS')
        .setDisabled();
      turn = self ? user.id : interaction.user.id;
      if(checkWin(rows)) {
        const winner = checkWin(rows) === 1 ? interaction.user : user;
        collector.stop();
        components.forEach(c => c.components.forEach(b => b.setDisabled()));
        return await i.update({ content: `${winner} won!`, components });
      }
      if(checkTie(rows)) {
        collector.stop();
        return await i.update({ content: 'Game Tied!', components });
      }
      await i.update({ content: `<@!${turn}>'s turn`, components });
    });
    collector.on('end', (_, r) => r !== 'user' ? interaction.editReply({ content: `Game ended! (${r} limit reached)` }) : null);
  }
};

function checkWin(rows) {
  for (let i = 0; i < 3; i++) {
    if(rows[i][0] === rows[i][1] && rows[i][1] === rows[i][2]) return rows[i][0];
  }
  for (let i = 0; i < 3; i++) {
    if(rows[0][i] === rows[1][i] && rows[1][i] === rows[2][i]) return rows[0][i];
  }
  if(rows[0][0] === rows[1][1] && rows[1][1] === rows[2][2]) return rows[0][0];
  if(rows[0][2] === rows[1][1] && rows[1][1] === rows[2][0]) return rows[0][2];
  return false;
}

function checkTie(rows) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if(rows[i][j] === 0) return false;
    }
  }
  return true;
}