/* Discord */
const Discord = require("discord.js");
/* /Discord */

// Fix

module.exports.run = async (client, message, args) => {

	const content = message.content.toLowerCase();
	const { author, channel, guild } = message;
	const { user, users } = client;

	const getID = content.replace("!profile ", "");
	const getUser = await users.fetch(getID.replace("<@", "").replace("!", "").replace(">", ""));
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
				`\` User \`\n` +
				`:robot: │ Bot: **${getUser.bot}**\n` +
				`<:others_id:727895083789320304> │ Tag: **${getUser.tag}**\n` +
				`<:others_id:727895083789320304> │ ID: **${getUser.id}**\n` +
				`<:others_picture:728398370502344744> │ Avatar: **${getUser.avatar}**\n`
			)
		}
	});
}