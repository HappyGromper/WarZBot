const {Client, GatewayIntentBits} = require("discord.js");
require("dotenv/config")
const request = require("request");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("ready", () => {
    console.log("Bot is ready.");
});

client.on("messageCreate", message => {

    if (message.content === "!wz") {
        checkServer("1.mc-warz.com", message);
        checkServer("2.mc-warz.com", message);
        checkServer("3.mc-warz.com", message);
        checkServer("4.mc-warz.com", message);   
    }  
});

function checkServer(serverIP, message) {
    request(`https://api.mcsrvstat.us/2/${serverIP}`, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const serverData = JSON.parse(body);
            message.channel.send("Server " + serverIP + " has " + serverData.players.online + " players online.");
            return serverData.players.online;
        } else {
            message.channel.send("Error retrieving server data for server " + serverIP + ".");
            return 'Error retrieving server data';
        }
    });
}

client.login(process.env.TOKEN);