const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checksession')
        .setDescription('Checks if this channel is connected to Omegle'),
    async execute(interaction) {
        if (Object.keys(activeSessions).includes(interaction.channel.id)) {
            if (activeSessions[interaction.channel.id].groupChat) {
                await interaction.reply("This channel is connected to an Omegle as a Group Chat!");
            } else {
                await interaction.reply("This channel is connected to an Omegle as a Single Person!");
            }
        } else {
            await interaction.reply("This channel is not connected to Omegle!");
        }
    }
}