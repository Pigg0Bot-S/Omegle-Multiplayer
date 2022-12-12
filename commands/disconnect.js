const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Disconnects this channel from Omegle'),
    async execute(interaction) {
        if (Object.keys(activeSessions).includes(interaction.channel.id)) {
            await activeSessions[interaction.channel.id].disconnect();
            await interaction.reply(`Disconnected from Omegle!`);
        } else {
            await interaction.reply("This channel is not connected to Omegle!");
        }

    },
};