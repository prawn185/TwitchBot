const tmi = require('tmi.js');
require('custom-env').env()
const opts = {
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_PASSWORD,
  },
  channels: [
    process.env.TWITCH_CHANNEL,
  ]
};

console.log(process.env.TWITCH_USERNAME)

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  var message = ""

  if(commandName.indexOf('!') === 0) {
    switch (commandName) {
      case "!roll":
        const num = roll();
        message = `@${context['display-name']} rolled a ${num} `
        break;
      case "!lurk":
        message = `@${context['display-name']} Is a legend for lurking in the stream, enjoy the free points fella`
        break;
      case "!twitter":
        message = `https://twitter.com/prawn185`
        break;
      case "!discord":
        message = ` I have a discord so you can get notified when I'm live POG https://discord.gg/VSejbnhPcT`
        break;
      case "!luckydip":
        message = `When you have the appropriate channel points you can choose a number between 1 10 to win £10`
        break;
      default:
        message = `@${context['display-name']} ${commandName} is not a command`
        break;
    }
    client.say(target, message);
  }
}



// Function called when the "dice" command is issued
function roll () {
  const sides = 999;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  console.log("Ready and waiting for your command");
}