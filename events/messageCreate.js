const {Events} = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        //console.log(message);
        if (message.author.bot) return;
        if (!Object.keys(activeSessions).includes(message.channel.id)) return;
        if (message.content.slice(0, 2) === "//") return;
        if ((message.member.displayName === message.author.username) && (activeSessions[message.channel.id].groupchat)) {
            message.reply("Please change your nickname to something other than your username before participating in a group chat!");
            return;
        }
        //console.log("You: " + message.content);
        let finalMsg = "";
        if (activeSessions[message.channel.id].groupchat) finalMsg += message.member.displayName + ": ";
        finalMsg += message.content;
        console.log(finalMsg);
        await activeSessions[message.channel.id].send(finalMsg);
    }
}