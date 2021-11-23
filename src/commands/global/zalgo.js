const zalgo = require('to-zalgo'), unzalgo = require('to-zalgo/banish');
module.exports = {
  data: {
    name: 'zalgo',
    description: 'Zalgo or unzalgo text',
    options: [
      {
        type: 'STRING',
        name: 'options',
        description: 'To zalgo or unzalgo',
        required: true,
        choices: [
          { name: 'zͦͨͭȧ͊͛lͤ͑͜g̓͑ͩo͕͗͋', value: 'zalgo' },
          { name: 'unzalgo', value: 'unzalgo' }
        ]
      },
      {
        type: 'STRING',
        name: 'text',
        description: 'Text to convert',
        required: true
      }
    ]
  },
  run: (client, interaction) => {
    return interaction.reply(interaction.options.getString('options') === 'zalgo' ? zalgo(interaction.options.getString('text')) : unzalgo(interaction.options.getString('text')));
  }
};