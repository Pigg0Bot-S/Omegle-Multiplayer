// Require the filesystem and path modules
const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const {Client, Collection, GatewayIntentBits} = require('discord.js');
const {token} = require('./config.json');

// Retrieve saved channel permissions
global.perms = require('./perms.json');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent]
});

// Require Omegle API
const Omegle = require('omegle-api');

// Define the Omegle Client Class

const omeglePath = path.join(__dirname, 'omegleListeners');
const omegleFiles = fs.readdirSync(omeglePath).filter(file => file.endsWith('.js'));

let omegleListeners = [];

for (const file of omegleFiles) {
    const filePath = path.join(omeglePath, file);
    const omegleListener = require(filePath);
    omegleListeners.push(omegleListener);
}
global.OmegleClient = class {
    constructor(channel, groupchat) {
        this.client = new Omegle.TextClient();
        this.channel = channel;
        this.groupchat = groupchat;

        // Creates listeners for Omegle Events
        omegleListeners.forEach((listener) => {
            this.client.on(listener.name, (...args) => listener.execute(this, ...args));
        })


    }

    async connect() {
        await this.client.connect();
    }

    async disconnect() {
        await this.client.disconnect();
    }

    async send(message) {
        await this.client.send(message);
    }
}

// Create Event Listeners
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Create Command Collection

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log('[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.');
    }
}

// Creates active session object
global.activeSessions = {};

// Log in to Discord with your client's token
client.login(token);

