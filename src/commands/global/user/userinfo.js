module.exports = {
  data: {
    type: 2,
    name: 'userinfo'
  },
  run: (client, interaction) => {
    const user = interaction.options.resolved.users.first(),
      member = interaction.options.resolved.members?.first();
    interaction.reply({
      ephemeral: true,
      embeds: [
        {
          author: {
            name: `${user.tag} (${user.id})`,
            iconURL: {
              'online': 'https://media.discordapp.net/attachments/781780421103976452/913667601450799134/unknown.png',
              'idle': 'https://media.discordapp.net/attachments/781780421103976452/913667601828282428/unknown.png',
              'dnd': 'https://media.discordapp.net/attachments/781780421103976452/913667601635373056/unknown.png',
              'offline': 'https://media.discordapp.net/attachments/781780421103976452/913667602105139220/unknown.png'
            }[member?.presence?.status || 'offline']
          },
          thumbnail: { url: user.displayAvatarURL({ dynamic: true, size: 1024 }) },
          title: 'Basic Information',
          description: [
            `**Account Created**: <t:${Math.floor(user.createdTimestamp / 1000)}:R>`,
            `**Joined**: ${member ? `<t:${Math.floor((member.joinedTimestamp) / 1000)}:R>` : 'N/A'}`
          ].join('\n'),
          fields: [
            {
              name: 'Permissions',
              value: member?.permissions.toArray().map(perm => `\`${perm}\``).join(', ') || 'N/A'
            }
          ]
        }
      ]
    });
  }
};