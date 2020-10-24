/* Discord */
const Discord = require("discord.js");
/* /Discord */

/* Functions */
const platform = require("../functions/platform.js");
const memory = require("../functions/memory.js");
const cpu = require("../functions/cpu.js");
const api = require("../functions/api.js");
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
				`\`Cluster\`\n` +
				`<:others_info:727895084233654383>` +
				` │ Platform: **${platform()}**\n` +

				`<:others_cpu:727895084015681537>` +
				` │ CPU: **${cpu()}%**\n` +

				`<:others_ram:727895083717754952>` +
				` │ RAM: **${memory()} MB**\n` +

				`<:others_signal:727917310144413808>` +
				` │ Ping: ** ${api(client)} ms ** `
			)
		}
	});
}