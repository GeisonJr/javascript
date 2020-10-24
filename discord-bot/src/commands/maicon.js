/* Discord */
const Discord = require("discord.js");
/* /Discord */

module.exports.run = async (client, message, args) => {

	const { channel } = message;

	return await channel.send(["Maicon?", "Nem Fudendo"]);
}