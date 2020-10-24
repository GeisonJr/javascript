/* Discord */
const { Client } = require("discord.js");
const client = new Client({ disableEveryone: true });
/* /Discord */

/* Classes */
const Interface = require("./classes/interface.js");
/* /Classes */

/* Functions */
const channels = require("./functions/channels.js");
const emojis = require("./functions/emojis.js");
const guilds = require("./functions/guilds.js");
const users = require("./functions/users.js");
/* /Functions */

/* Package */
const { version } = require("../package.json");
/* /Package */

/* Environment */
require("dotenv").config();
const { PREFIX, TOKEN } = process.env;
/* /Environment */

const screenLoad = new Interface();
screenLoad.Splash();

client.on("ready", async () => { // Ready

	await client.user.setPresence({
		status: "online",
		activity: {
			name: `${PREFIX}help`,
			type: "LISTENING"
		}
	});

	screenLoad.Status(client, "online", [
		`Status: ${client.user.tag} is Connected!`,
		`Channels: ${channels(client).total}`, // Counter of Channels
		`Servers: ${guilds(client).total}`, // Counter of Servers
		`Emojis: ${emojis(client).total}`, // Counter of Emojis
		`Members: ${users(client).total}`, // Counter of Members
	]);
});

client.on("reconnecting", () => { // Reconnecting
	const reconnecting = require("./events/reconnecting.js");
	screenLoad.Status(client, "idle", reconnecting(client));
});

client.on("disconnect", () => { // Disconnect
	const disconnect = require("./events/disconnect.js");
	screenLoad.Status(client, "dnd", disconnect(client));
});

client.on("error", (event) => { // Error
	const error = require("./events/error.js");
	screenLoad.Status(client, "dnd", error(client, event));
});

client.on("guildMemberAdd", async (event) => { // Member Joined a Guild
	const guildMemberAdd = require("./events/guildMemberAdd.js");
	screenLoad.Log(guildMemberAdd(event));
});

client.on("guildMemberRemove", async (event) => { // Member Left a Guild
	const guildMemberRemove = require("./events/guildMemberRemove.js");
	screenLoad.Log(guildMemberRemove(event));
});

client.on("emojiCreate", async (event) => { // Emoji Created  in the Guild
	const emojiCreate = require("./events/emojiCreate.js");
	screenLoad.Log(emojiCreate(event));
});

client.on("emojiDelete", async (event) => { // Emoji Deleted  in the Guild
	const emojiDelete = require("./events/emojiDelete.js");
	screenLoad.Log(emojiDelete(event));
});

client.on("message", async (message) => { // Message Received

	const content = message.content.toLowerCase();
	const { author, channel } = message;

	/* Ignore */
	if (author.bot) { // Message From Bots
		return undefined;
	}
	if (channel.type === "dm") { // Message From Direct Messages
		return undefined;
	}
	if (content.startsWith(`<@!${client.user.id}`) || content.startsWith(`<@${client.user.id}`)) { // Message From Myself
		return undefined;
	}
	if (!content.startsWith(PREFIX)) { // Message Don't Start With 'PREFIX'
		return undefined;
	}
	/* /Ignore */

	/* Commands */
	try {
		// let commandFile = require(`./commands/${content.split("!")[1].split(" ")[0]}.js`);
		// delete require.cache[require.resolve(`./commands/${content.split("!")[1].split(" ")[0]}.js`)];
		let commandFile = require(`./commands/${content.split("!")[1]}.js`);
		delete require.cache[require.resolve(`./commands/${content.split("!")[1]}.js`)];
		const args = [];
		return commandFile.run(client, message, args);
	} catch (error) {
		console.log(error);
		return await channel.send(`Sorry ${author}, "*${content}*" is not a valid command!`);
	}
	/* /Commands */
});

/* Authentication */
client.login(TOKEN);
/* /Authentication */