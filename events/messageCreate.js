const {Events} = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        //console.log(message);
        if (message.author.bot) return;
        if (!Object.keys(activeSessions).includes(message.channel.id)) return;
        if ((message.content.slice(0, 2) === "//") || (message.content.slice(0,17) === "https://tenor.com")) return;
        if ((message.member.displayName === message.author.username) && (activeSessions[message.channel.id].groupChat)) {
            message.reply("Please change your nickname to something other than your username before participating in a group chat!");
            return;
        }
        //console.log("You: " + message.content);
        let finalMsg = "";
        if (activeSessions[message.channel.id].groupChat) finalMsg += message.member.displayName + ": ";
        finalMsg += message.content;
        console.log(finalMsg);
        try {
            await activeSessions[message.channel.id].send(finalMsg);
        } catch (e) {
            console.log(e);
            message.reply("An error occurred while sending your message to Omegle!");
        }

    }
}