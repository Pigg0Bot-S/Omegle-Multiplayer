const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setDescription('Connects channel to Omegle')
        .addIntegerOption(option =>
            option
                .setName("groupchat")
                .setDescription("Whether to make it a group chat or not.")
                .addChoices(
                    {name: "auto", value: 0},
                    {name: "stranger", value: 1},
                    {name: "group", value: 2},
                )),
    async execute(interaction) {
        let groupChat = interaction.options.getInteger('groupchat');
        if (groupChat === null) groupChat = 0;
        if (Object.keys(perms).includes(interaction.channelId)) {
            if (perms[interaction.channel.id] === 0) {
                interaction.reply("Omegle commands are disabled in this channel.");
                return;
            } else if (groupChat === 2) {
                if (perms[interaction.channel.id] === 1) {
                    interaction.reply("Group chats are disabled in this channel.");
                    return;
                }
                groupChat = true;
            } else if (groupChat === 1) {
                if (perms[interaction.channel.id] === 2) {
                    interaction.reply("Group chats are required in this channel.");
                    return;
                }
                groupChat = false;
            } else if (groupChat === 0) {
                if (perms[interaction.channel.id] === 3) groupChat = false;
                else if (perms[interaction.channel.id] === 2) groupChat = true;
                else groupChat = false;

            }
        } else {
            interaction.reply("Omegle commands are disabled in this channel.");
            return;
        }
        if (Object.keys(activeSessions).includes(interaction.channel.id)) {
            await interaction.reply("This channel is already connected to Omegle!");
            return;
        }
        console.log(groupChat);
        activeSessions[interaction.channel.id] = new OmegleClient(interaction.channel, groupChat);
        await activeSessions[interaction.channel.id].connect();
        if (activeSessions[interaction.channel.id].groupchat) {
            await interaction.reply("You are connected to an Omegle as a Group Chat!");
        } else {
            await interaction.reply("You are connected to an Omegle as a Stranger!");
        }
    },
};