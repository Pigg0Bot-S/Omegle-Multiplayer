const {SlashCommandBuilder} = require('discord.js');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setchannelperms')
        .setDescription('Sets Omegle Permissions for a channel')
        .addIntegerOption(option =>
            option
                .setName("perms")
                .setDescription("The permissions to set for this channel.")
                .setRequired(true)
                .addChoices(
                    {name: "Disabled", value: 0},
                    {name: "One-Person Chats Only", value: 1},
                    {name: "Group Chats Only", value: 2},
                    {name: "One-Person and Group Chats", value: 3},
                )
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
            await interaction.reply("You do not have permission to use this command!");
            return;
        }
        perms[interaction.channelId] = interaction.options.getInteger("perms");
        fs.writeFileSync('./perms.json', JSON.stringify(perms));
        await interaction.reply("Permissions set!");
    }
}