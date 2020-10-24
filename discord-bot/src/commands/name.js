/* Discord */
const Discord = require("discord.js");
/* /Discord */

module.exports.run = async (client, message, args) => {

	const { author, channel } = message;

	return await channel.send(`I do not know your real name but I"ll call you *${author.username}* or ${author}`);
}