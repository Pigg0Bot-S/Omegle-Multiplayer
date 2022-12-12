module.exports = {
    name: "message",
    execute(client, message) {
        console.log("Stranger: " + message);
        client.channel.send(message);
    }
}