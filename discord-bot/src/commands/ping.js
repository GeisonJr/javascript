/* Discord */
const Discord = require("discord.js");
/* /Discord */

/* Functions */
const api = require("../functions/api.js");
/* /Functions */

module.exports.run = async (client, message, args) => {

	const { author, channel, guild } = message;
	const { user } = client;

	const msg = await channel.send("Pong!");

	return await channel.send({
		embed: {
			color: "#E12142",
			author: {
				name: `${author.tag}`,
				url: `https://discordapp.com/users/${author.id}`,
				icon_url: `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.jpg?size=256`
			},
			thumbnail: {
				url: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.jpg?size=256`
			},
			image: {
				url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=256`
			},
			footer: {
				text: "Developed by HansoMWarE Corporation",
				icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=256`
			},
			timestamp: new Date(),
			description: (
				`The latency is ${msg.createdTimestamp - message.createdTimestamp}ms\n` +
				`The API latency is ${api(client)} ms`
			)
		}
	})
}