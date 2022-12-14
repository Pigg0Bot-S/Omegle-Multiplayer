module.exports = {
    name: "connect",
    execute(client) {
        console.log("Client Connected!");
        if (client.groupChat) client.send("You are now a part of a group chat!");
    }
}