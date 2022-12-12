module.exports = {
    name: "connect",
    execute(client) {
        console.log("Client Connected!");
        if (client.groupchat) client.send("You are now a part of a group chat!");
    }
}