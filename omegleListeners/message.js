module.exports = {
    name: "message",
    async execute(client, message) {
        console.log("Stranger: " + message);
        await client.channel.send(message);
    }
}