/* Discord */
const Discord = require("discord.js");
/* /Discord */

module.exports.run = async (client, message, args) => {

	const { channel } = message;

	return await channel.send(["Geison?", "Likes to use printf ('\\n')"]);
}