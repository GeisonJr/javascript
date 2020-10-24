/* Discord */
const Discord = require("discord.js");
/* /Discord */

/* Functions */
const channels = require("../functions/channels.js");
const emojis = require("../functions/emojis.js");
const users = require("../functions/users.js");
/* /Functions */

module.exports.run = async (client, message, args) => {

	const { author, channel, guild } = message;
	const { user } = client;
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
				`\`About\`\n` +
				`<:others_so:727895083847778367>` +
				` │ Server: **${guild}**\n` +

				`<:others_map_point:727916021586985012>` +
				` │ Region: **${guild.region}**\n` +

				`<:others_info:727895083789320304>` +
				` │ Owner: **${guild.owner}**\n` +

				`<:others_time:727895084678512711>` +
				` │ Created At: **${guild.createdAt.toISOString().substring(0, 10).replace("-", "/").replace("-", "/")}**\n` +

				`\n` +
				`\`Statistics\`\n` +
				`<:others_users:727895084112150608>` +
				` │ Members: **${users(client).total}**\n` +

				`<:others_info:727895084233654383>` +
				` │ Channels: **${channels(client).total}**\n` +

				`<:others_info:727895084233654383>` +
				` │ Emojis: **${emojis(client).total}**\n`

			)
		}
	});
}