/* Discord */
const Discord = require("discord.js");
/* /Discord */

/* Environment */
require("dotenv").config();
const { PREFIX } = process.env;
/* /Environment */

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
				'Do you need help with the commands?' +
				`Use ${PREFIX}${PREFIX}command to view the commands list  :clipboard:` +
				'Would you like to add this bot to another server?' +
				`[Click here](https://discordapp.com/oauth2/authorize?client_id=592459194125516800&permissions=8&scope=bot) to add HansoMWarE to your server!  :robot:` +
				'[click here](https://hansomware.com.br) for more info'
			)
		}
	});
}