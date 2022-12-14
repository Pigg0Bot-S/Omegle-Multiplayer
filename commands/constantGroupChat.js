const {SlashCommandBuilder} = require('discord.js');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setconstantgroupchat')
        .setDescription('Sets whether this channel is constantly a group chat or not.')
        .addBooleanOption(option =>
            option
                .setName("enabled")
                .setRequired(true)),
    async execute(interaction) {
        var setConstantGroupChat = interaction.options.getBoolean("enabled");
        if (interaction.member.permissions.has("ADMINISTRATOR")) {
            if ((Object.keys(activeSessions).includes(interaction.channel.id)) && (setConstantGroupChat)) {
                await activeSessions[interaction.channel.id].disconnect();
                delete activeSessions[interaction.channel.id];
                return;
            }
            if (setConstantGroupChat) {
                perms[interaction.channel.id] = 4;
                fs.writeFileSync("./perms.json", JSON.stringify(perms));
                activeSessions[interaction.channel.id] = new OmegleClient(interaction.channel, true, true);
                await interaction.reply("This channel is now a constant group chat!");
            } else {
                perms[interaction.channel.id] = 0;
                await interaction.reply("Omegle permissions reset in this channel!");
            }
        } else {
            await interaction.reply("You do not have permission to use this command!");
            return;
        }
    }
}