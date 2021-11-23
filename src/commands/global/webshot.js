const { MessageAttachment } = require('discord.js');
module.exports = {
  data: {
    name: 'webshot',
    description: 'Get a screenshot of a website',
    options: [
      {
        type: 'STRING',
        name: 'url',
        description: 'The URL to screenshot',
        required: true
      },
      {
        type: 'INTEGER',
        name: 'width',
        description: 'The width of the screenshot in pixels. Default: 600'
      },
      {
        type: 'INTEGER',
        name: 'height',
        description: 'The height of the screenshot in pixels. Default: 1200'
      },
      {
        type: 'INTEGER',
        name: 'max_age',
        description: 'Refresh the thumbnail if the cached image is older than this amount, in hours'
      }
    ]
  },
  run: async (client, interaction) => {
    await interaction.deferReply();
    let url = interaction.options.getString('url');
    if(!url.startsWith('https://') && !url.startsWith('http://')) url = `https://${url}`;
    const
      width = interaction.options.getInteger('width') ?? 600,
      height = interaction.options.getInteger('height') ?? 1200,
      maxAge = interaction.options.getInteger('max age') ?? 3000,
      ss = new MessageAttachment(`https://image.thum.io/get/width/${width}/crop/${height}/maxAge/${maxAge}/${url}`, 'ss.png');
    interaction.editReply({ files: [ss] });
  }
};