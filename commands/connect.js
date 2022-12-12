const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setDescription('Connects channel to Omegle')
        .addBooleanOption(option =>
            option
                .setName("groupchat")
                .setDescription("Whether to make it a group chat or not.")),
    async execute(interaction) {
        const groupChat = interaction.options.getBoolean('groupchat');
        if (Object.keys(perms).includes(interaction.channelId)) {
            if (perms[interaction.channel.id] === 0) {
                interaction.reply("Omegle commands are disabled in this channel.");
                return;
            } else if (perms[interaction.channel.id] === 1) {
                if (groupChat) {
                    interaction.reply("Group chats are disabled in this channel.");
                    return;
                }
            } else if (perms[interaction.channel.id] === 2) {
                if (!groupChat) {
                    interaction.reply("Group chats are required in this channel.");
                    return;
                }
            }
        } else {
            interaction.reply("Omegle commands are disabled in this channel.");
            return;
        }
        if (Object.keys(activeSessions).includes(interaction.channel.id)) {
            await interaction.reply("This channel is already connected to Omegle!");
            return;
        }
        activeSessions[interaction.channel.id] = new OmegleClient(interaction.channel, groupChat);
        await activeSessions[interaction.channel.id].connect();
        if (activeSessions[interaction.channel.id].groupchat) {
            await interaction.reply("You are connected to an Omegle as a Group Chat!");
        } else {
            await interaction.reply("You are connected to an Omegle as a Stranger!");
        }
    },
};