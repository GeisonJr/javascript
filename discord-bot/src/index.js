/* Discord */
const { Client } = require("discord.js");
const client = new Client({ disableEveryone: true });
/* /Discord */

/* Package */
const { version } = require("../package.json");
/* /Package */

/* Environment */
require("dotenv").config();
const { PREFIX, TOKEN } = process.env;
/* /Environment */

/* Interface */
class Interface {
	width = 68; // Length of characters to interface (splash, status, log)
	space = " ";
	vertical = "│";
	splash = [
		"                   ┌────────────────────────────┐                   ",
		"┌──────────────────┤   HansoMWarE Corporation   ├──────────────────┐",
		"│                  └────────────────────────────┘                  │",
		"│ - HansoMWarE Discord Bot                                         │",
		"│ - © 2020 HansoMWarE Corporation. All rights reserved.            │",
		"│                         ┌──────────────┐                         │",
		"├─────────────────────────┤   Credits:   ├─────────────────────────┤",
		"│                         └──────────────┘                         │",
		"│ - Developed by HansoMWarE Corporation                            │",
		"│ - Powered by HansoMWarE Corporation                              │",
		"│                          ┌────────────┐                          │",
		"├──────────────────────────┤   About:   ├──────────────────────────┤",
		"│                          └────────────┘                          │",
		"│ - Version: 0.1.18 (Beta)                                         │",
		"│                                                                  │",
		"└──────────────────────────────────────────────────────────────────┘"
	];
	status = [
		"                           ┌────────────┐                           ",
		"┌──────────────────────────┤   Status   ├──────────────────────────┐",
		"│                          └────────────┘                          │",
		"│                                                                  │",
		"└──────────────────────────────────────────────────────────────────┘"
	];
	log = [
		"                            ┌──────────┐                            ",
		"┌───────────────────────────┤   Log:   ├───────────────────────────┐",
		"│                           └──────────┘                           │",
		"│                                                                  │",
		"└──────────────────────────────────────────────────────────────────┘"
	];

	Grid(array) { // Align in Grid

		function countCodePoints(str) {
			let len = 0;
			for (let i = 0; i < str.length;) {
				let point = str.codePointAt(i);
				let width = 0;
				while (point) {
					width += 1;
					point = point >> 8;
				}
				i += Math.round(width / 2);
				len += 1;
			}
			return len;
		}

		const { vertical, width, space } = new Interface();
		const math = width - (vertical.length * 2 + space.length);
		var string = vertical + space + array;
		for (let i = math; i > countCodePoints(array); i--) {
			string += space;
		}
		return string += vertical;
	}

	Splash() { // Splash Screen
		for (let i = 0; i < this.splash.length; i++) {
			console.log(this.splash[i]);
		}
	}

	Status(status, array) { // Status Screen
		client.user.setStatus(status);
		for (let i = 0; i < this.status.length - 2; i++) {
			console.log(this.status[i]);
		}
		for (let i = 0; i < array.length; i++) {
			console.log(this.Grid(array[i]));
		}
		for (let i = this.status.length - 2; i < this.status.length; i++) {
			console.log(this.status[i]);
		}
	}

	Log(array) { // Log Screen
		for (let i = 0; i < this.log.length - 2; i++) {
			console.log(this.log[i]);
		}
		for (let i = 0; i < array.length; i++) {
			console.log(this.Grid(array[i]));
		}
		for (let i = this.log.length - 2; i < this.log.length; i++) {
			console.log(this.log[i]);
		}
	}
}
/* /Interface */

/* Counters */
function Channels() { // Counter Channels
	const obj = {
		total: 0,
		params: {
			category: false, // true, false -> count category channels
			voice: true, // true, false -> count voice channels
			text: true // true, false -> count text channels
		}
	}
	client.channels.cache.map((event) => {
		if (obj.params["category"] && event.type === "category") {
			obj.total++;
		} else if (obj.params["voice"] && event.type === "voice") {
			obj.total++;
		} else if (obj.params["text"] && event.type === "text") {
			obj.total++;
		}

	});
	return obj.total;
}

function Servers() { // Counter Servers
	const obj = { total: 0 }
	client.guilds.cache.map((event) => {
		obj.total++;
	});
	return obj.total;
}

function Emojis() { // Counter Emojis
	const obj = { total: 0 }
	client.emojis.cache.map((event) => {
		obj.total++;
	});
	return obj.total;
}

function Users() { // Counter Users
	const obj = {
		total: 0,
		params: {
			users: true, // true, false -> count users
			self: false, // true, false -> count self
			bots: true // true, false -> count bots
		}
	}
	client.users.cache.map((event) => {
		if (obj.params["bots"] && (event.bot && event.id !== client.user.id)) {
			obj.total++;
		} else if (obj.params["users"] && !event.bot) {
			obj.total++;
		} else if (obj.params["self"] && event.id === client.user.id) {
			obj.total++;
		}
	});
	return obj.total;
}

function Api() { // API Ping Test	
	const obj = {
		total: 0,
	}
	obj.total = client.ws.ping;
	return obj.total;
}
/* /Counters */

const screenLoad = new Interface();
screenLoad.Splash();

/* Update */
async function Update(params) {
	let obj = {
		array: [],
		name: {
			api: `🌐│Ping API: ${Api()} ms`, // Channel Name
			users: `👥│Users: ${Users()}`, // Channel Name
			status: `🔌│Status: Online`, // Channel Name
			uptime: `⏱│Uptime: ${Math.floor(client.uptime / 86400000)} days`, // Channel Name
			servers: `🔗│Servers: ${Servers()}`, // Channel Name
		}
	}

	if (params.api.name.split(": ")[1] !== obj.name.api.split(": ")[1]) {
		await params.api.setName(obj.name["api"])
			.then(() => {
				obj.array.push(
					" Ping API: " +
					params.api.name.split(": ")[1] +
					" -> " +
					obj.name["api"].split(": ")[1]
				);
			});
	}

	if (params.users.name.split(": ")[1] !== obj.name.users.split(": ")[1]) {
		await params.users.setName(obj.name["users"])
			.then(() => {
				obj.array.push(
					" Users: " +
					params.users.name.split(": ")[1] +
					" -> " +
					obj.name["users"].split(": ")[1]
				);
			});
	}

	if (params.status.name.split(": ")[1] !== obj.name.status.split(": ")[1]) {
		await params.status.setName(obj.name["status"])
			.then(() => {
				obj.array.push(
					" Status: " +
					params.status.name.split(": ")[1] +
					" -> " +
					obj.name["status"].split(": ")[1]
				);
			});
	}

	if (params.uptime.name.split(": ")[1] !== obj.name.uptime.split(": ")[1]) {
		await params.uptime.setName(obj.name["uptime"])
			.then(() => {
				obj.array.push(
					" Uptime: " +
					params.uptime.name.split(": ")[1][1] +
					" -> " +
					obj.name["uptime"].split(": ")[1][1]
				);
			});
	}

	if (params.servers.name.split(": ")[1] !== obj.name.servers.split(": ")[1]) {
		await params.servers.setName(obj.name["servers"])
			.then(() => {
				obj.array.push(
					" Servers: " +
					params.servers.name.split(": ")[1] +
					" -> " +
					obj.name["servers"].split(": ")[1]
				);
			});
	}

	console.log("karaio");
	// if (obj.array.length > 0) {
	screenLoad.Log(obj.array);
	// }
}
/* /Update */

client.on("ready", async () => { // Ready
	const channel = {
		api: await client.channels.fetch("709550522314784859"), // Get Channel
		users: await client.channels.fetch("709548787567427634"), // Get Channel
		status: await client.channels.fetch("709553575050608781"), // Get Channel
		uptime: await client.channels.fetch("709554303051759708"), // Get Channel
		servers: await client.channels.fetch("709550640698753096"), // Get Channel
	}

	var test = 0;
	screenLoad.Status("online", [
		`Status: ${client.user.tag} is Connected!`,
		`Channels: ${Channels()}`, // Counter of Channels
		`Servers: ${Servers()}`, // Counter of Servers
		`Emojis: ${Emojis()}`, // Counter of Emojis
		`Users: ${Users()}`, // Counter of Users
	]);
	setInterval(async () => {
		let activity = [
			`${PREFIX}help`,
			`${Channels()} channels!`, // Counter of Channels
			`${Servers()} servers!`, // Counter of Servers
			`${Emojis()} emojis!`, // Counter of Emojis
			`${Users()} users!`, // Counter of Users
		]
		await client.user.setPresence({
			status: "online",
			activity: {
				name: activity[index],
				type: "LISTENING" // "PLAYING" || "STREAMING" || "LISTENING" || "WATCHING"
			}
		});
		index < activity.length - 1 ? index++ : index = 0;
	}, 5000); // time to Change Rich Presence, min = 4000 ms
});

client.on("reconnecting", () => { // Reconnecting
	screenLoad.Status("idle", [
		`Status: ${client.user.tag} is Reconnecting!`,
	]);
});

client.on("disconnect", () => { // Disconnect
	screenLoad.Status("dnd", [
		`Status: ${client.user.tag} is Disconnect!`,
	]);
});

client.on("error", (event) => { // Error
	screenLoad.Status("dnd", [
		`Status: ${client.user.tag} is Error!`,
		`Name: ${event.name}`,
		`Message: ${event.message}`,
		`Stack: ${event.stack}`
	]);
});

client.on("guildCreate", async (event) => { // Bot Join the Server
	screenLoad.Log([
		`Status: ${client.user.tag} joined a server!`,
		`Name: ${event.name} (${event.id})`,
		`Member(s): ${event.memberCount - 1}`
	]);
	await Update();
});

client.on("guildDelete", async (event) => { // Bot Left the Server
	screenLoad.Log([
		`Status: ${client.user.tag} left a server!`,
		`Name: ${event.name} (${event.id})`,
		`Member(s): ${event.memberCount - 1}`
	]);
	await Update();
});

client.on("guildMemberAdd", async (event) => { // Member Join the Server
	screenLoad.Log([
		`Status: ${event.user.tag} joined a server!`,
		`Server: ${event.guild.name} (${event.guild.id})`,
		`Name: ${event.user.username} (${event.user.id})`,
	]);
	await Update();
});

client.on("guildMemberRemove", async (event) => { // Member Join the Server
	screenLoad.Log([
		`Status: ${event.user.tag} left a server!`,
		`Server: ${event.guild.name} (${event.guild.id})`,
		`Name: ${event.user.username} (${event.user.id})`,
	]);
	await Update();
});

client.on("emojiCreate", async (event) => { // Emoji Created	
	screenLoad.Log([
		`Status: ${event.client.user.tag} created an emoji!`, // Wrong
		`Server: ${event.guild.name} (${event.guild.id})`,
		`Name: ${event.name} (${event.id})`,
		`Animated: ${event.animated}`
	]);
});

client.on("emojiDelete", async (event) => { // Emoji Deleted
	screenLoad.Log([
		`Status: ${event.client.user.tag} deleted a emoji!`, // Wrong
		`Server: ${event.guild.name} (${event.guild.id})`,
		`Name: ${event.name} (${event.id})`,
		`Animated: ${event.animated}`
	]);
});

client.on("message", async (message) => { // Message

	/* Ignore */
	if (message.author.bot) { // From Bot
		return undefined;
	}

	else if (message.channel.type === "dm") { // Direct Messages
		return undefined;
	}

	else if (!message.content.startsWith(PREFIX)) { // Don't Start With PREFIX
		return undefined;
	}
	/* /Ignore */

	/* General */
	if (message.content.toLowerCase() === `${PREFIX}about`) { // About
		await message.channel.send("I was created by HansoMWarE Corporation");
		await message.channel.send(`I'm in version ${version} - beta`);
		await message.channel.send("The main programmer of my project was heisenberg#6252");
		await message.channel.send("I was created with the intention of being a bot of music for the discord and it turned out that this is only a part of my talents");
		return undefined;
	}

	if (message.content.toLowerCase() === `${PREFIX}help`) { // Help - Incomplete
		await message.channel.send({
			embed: {
				color: "#E12142",
				author: {
					name: `${message.author.tag}`,
					url: `https://discordapp.com/users/${message.author.id}`,
					icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpg`
				},
				thumbnail: { url: `https://cdn.discordapp.com/avatars/${message.guild.id}/${message.guild.banner}.jpg` },
				title: "How can I help you?",
				description: '[click here](https://hansomware.com.br) for more info',
				url: `https://torkexpress.com`,
				fields: [
					{ name: 'Do you need help with the commands?', value: `Use ${PREFIX}${PREFIX}command to view the commands list  :clipboard:`, inline: true },
					{ name: 'Would you like to add this bot to another server?', value: `[Click here](https://discordapp.com/oauth2/authorize?client_id=592459194125516800&permissions=8&scope=bot) to add HansoMWarE to your server!  :robot:`, inline: false },
				],
				image: { url: `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.jpg` },
				footer: {
					text: "Developed by HansoMWarE Corporation",
					icon_url: `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.jpg`
				},
				timestamp: new Date()
			}
		});
		return undefined;
	}

	if (message.content.toLowerCase() === `${PREFIX}info`) { // Info - Incomplete
		await message.channel.send({
			embed: {
				color: "#E12142",
				author: {
					name: `${message.author.tag}`,
					url: `https://discordapp.com/users/${message.author.id}`,
					icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpg?size=256`
				},
				thumbnail: { url: `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.jpg?size=256` },
				fields: [
					{ name: 'Server Name:', value: message.guild.name, inline: true },
					{ name: 'Server ID:', value: message.guild.id, inline: true },

					{ name: 'Latency API:', value: Api() + " ms", inline: false },

					{ name: 'Channels:', value: Channels(), inline: true },
					{ name: 'Servers:', value: Servers(), inline: true },
					{ name: 'Emojis:', value: Emojis(), inline: true },
					{ name: 'Users:', value: Users(), inline: true },
				],
				footer: {
					text: "Developed by HansoMWarE Corporation",
					icon_url: `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.jpg?size=256`
				},
				timestamp: new Date()
			}
		});
		return undefined;
	}

	if (message.content.toLowerCase() === `${PREFIX}ping`) { // Ping
		const msg = await message.channel.send("Ping?");
		await message.channel.send(`The latency is ${msg.createdTimestamp - message.createdTimestamp}ms`);
		await message.channel.send(`The API latency is ${Api()} ms`);
		return undefined;
	}
	/* /General */

	/* Functions */
	if (message.content.toLowerCase() === `${PREFIX}say my name`) { // Say my Name
		await message.channel.send(`I do not know your real name but I"ll call you *${message.author.username}* or ${message.author}`);
		return undefined;
	}

	if (message.content.toLowerCase().startsWith(`${PREFIX}profile`)) { // Profile
		const user = message.content.toLowerCase().replace("!profile ", "");
		const users = await client.users.fetch(user.replace("<@", "").replace("!", "").replace(">", ""));
		await message.channel.send({
			embed: {
				color: "#E12142",
				author: {
					name: `${message.author.tag}`,
					url: `https://discordapp.com/users/${message.author.id}`,
					icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpg?size=256`
				},
				thumbnail: { url: `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.jpg?size=256` },
				title: "!Profile",
				description: 'This Command send all of profile',
				url: `https://discordapp.com/users/${message.author.id}`,
				fields: [
					{ name: 'Tag:', value: users.tag, inline: true },
					{ name: 'Name:', value: users.username, inline: true },
					{ name: 'Discriminator:', value: users.discriminator, inline: true },
					{ name: 'ID:', value: users.id, inline: true },
					{ name: 'Avatar:', value: users.avatar, inline: true },
					{ name: 'Bot:', value: users.bot, inline: true },
				],
				image: { url: `https://cdn.discordapp.com/avatars/${users.id}/${users.avatar}.jpg?size=256` },
				footer: {
					text: "Developed by HansoMWarE Corporation",
					icon_url: `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.jpg?size=256`
				},
				timestamp: new Date()
			}
		});
		return undefined;
	}

	if (message.content.toLowerCase() === `${PREFIX}tell me a joke`) { // Tell me a Joke
		class Jokes {
			cat = {
				question: "What do you call a gigantic pile of kittens?",
				answer: "A meowntain :cat: :cat: :cat: :mountain_snow:"
			}
			fan = {
				question: "Why was the stadium so cool?",
				answer: "it was filled with fans"
			}
			spider = {
				question: "Why is the spider the most needy animal in the world?",
				answer: "because she is an arac***__needyou__***"
			}
		}
		// categories of jokes in the class
		const categoriesOfJokes = ["cat", "fan", "spider"];
		// calculator of random
		const numberOfJoke = Math.floor(Math.random() * categoriesOfJokes.length);
		// select the joke in array
		const joke = categoriesOfJokes[numberOfJoke];

		await message.channel.send(new Jokes()[joke].question);
		await message.channel.send(new Jokes()[joke].answer);
		return undefined;
	}
	/* /Functions */

	/* Easter eggs */
	async function easterEgg(array) {
		for (let i = 0; i < array.length; i++) {
			await message.channel.send(array[i]);
		}
		return undefined;
	}

	if (message.content.toLowerCase() === `${PREFIX}chaparim`) { // chaparim
		easterEgg(["Chaparim?", "Can crash all programs with a touch"]);
		return undefined;
	}
	if (message.content.toLowerCase() === `${PREFIX}gustavo`) { // Gustavo
		easterEgg(["Gustavo?", "Ta de Hack"]);
		return undefined;
	}
	if (message.content.toLowerCase() === `${PREFIX}geison`) { // Geison
		easterEgg(["Geison?", "Likes to use printf ('\\n')"]);
		return undefined;
	}
	if (message.content.toLowerCase() === `${PREFIX}maicon`) { // Maicon
		easterEgg(["Maicon?", "Nem Fudendo"]);
		return undefined;
	}
	if (message.content.toLowerCase() === `${PREFIX}moises`) { // Moises
		easterEgg(["Moises?", "Nothing here!"]);
		return undefined;
	}
	if (message.content.toLowerCase() === `${PREFIX}melo`) { // Melo
		easterEgg(["Melo?", "Nothing here!"]);
		return undefined;
	}
	if (message.content.toLowerCase() === `${PREFIX}nery`) { // Nery
		easterEgg(["Nery?", "Nothing here!"]);
		return undefined;
	}
	/* /Easter eggs */

	/* Commands */
	if (message.content.toLowerCase().startsWith(`${PREFIX}del`)) { // Delete

		const inputChatDelete = message.content.substr(PREFIX.length + 3); // 4 =  "del".length
		const integerChatDelete = Number.parseInt(inputChatDelete, 10); // 10 = decimal base

		if (isNaN(integerChatDelete)) { // Not a Number
			await message.channel.send(`Sorry ${message.author}, but you can't delete "${inputChatDelete}", because this is not a number(NaN)`);
		} else if (integerChatDelete < 1) { // Less than 1
			await message.channel.send(`Sorry ${message.author}, but you can't delete less than 1 message`);
		} else if (integerChatDelete > 100) { // More than 100
			await message.channel.send(`Sorry ${message.author}, but you can't delete more than :100: messages at once`);
		} else {
			await message.channel.bulkDelete(1);
			await message.channel.bulkDelete(integerChatDelete)
				.then(async () => {
					await message.channel.send(`OK ${message.author}, ${integerChatDelete} messages successfully deleted`);
				})
				.catch(async (err) => {
					console.error(err);
					await message.channel.send(`Sorry ${message.author}, but you can't bulk delete messages older than 14 days`);
				});
		}
		return undefined;
	}
	/* /Commands */

	/* Not a Command */
	await message.channel.send(`Sorry ${message.author}, "*${message.content.toLowerCase()}*" is not a valid command!`);
	return undefined;
	/* /Not a Command */
});

/* Authentication */
client.login(TOKEN);
/* /Authentication */