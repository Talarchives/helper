module.exports = {
  data: {
    name: 'random',
    description: 'Uses random.org for randomness',
    options: [
      {
        type: 1, // Subcommand
        name: 'coinflip',
        description: 'Flips a coin'
      },
      {
        type: 1, // Subcommand
        name: 'numbers',
        description: 'Generates a random number(s)',
        options: [
          {
            type: 4, // Integer
            name: 'num',
            description: 'The number of random numbers to generate',
            required: true
          },
          {
            type: 4, // Integer
            name: 'min',
            description: 'The minimum number',
            required: true
          },
          {
            type: 4, // Integer
            name: 'max',
            description: 'The maximum number',
            required: true
          },
          {
            type: 4, // Integer
            name: 'base',
            description: 'The base (numeral system) to use for the number(s) [Default decimal (10)]',
            choices: [
              { name: 'hexadecimal', value: 16 },
              { name: 'decimal', value: 10 },
              { name: 'octal', value: 8 },
              { name: 'binary', value: 2 }
            ]
          }
        ]
      }
    ]
  },
  run: async (client, interaction) => {
    await interaction.deferReply();
    const type = interaction.options.getSubcommand(),
      baseUrl = 'https://www.random.org/integers/?format=plain&rnd=new&';
    if (type === 'coinflip') {
      const num = await require('node-fetch')(`${baseUrl}num=1&min=0&max=1&col=1&base=10`).then(res => res.text());
      interaction.editReply(num === '0\n' ? 'Heads' : 'Tails');
    } else {
      const num = interaction.options.getInteger('num'),
        min = interaction.options.getInteger('min'),
        max = interaction.options.getInteger('max'),
        base = interaction.options.getInteger('base') || 10;
      const numbers = await require('node-fetch')(`${baseUrl}num=${num}&min=${min}&max=${max}&col=1&base=${base}`).then(res => res.text());
      interaction.editReply(numbers.replace(/\n/g, '\t').slice(0, 2000));
    }
  }

};