module.exports = {
    name: "disconnect",
    execute(client) {
        console.log("Client Disconnected");
        client.channel.send("Stranger Disconnected!");
        delete activeSessions[client.channel.id];

    }
}