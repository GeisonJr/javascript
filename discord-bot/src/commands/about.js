/* Discord */
const Discord = require("discord.js");
/* /Discord */

/* Package */
const { version } = require("../../package.json");
/* /Package */

module.exports.run = async (client, message, args) => {

	const { channel } = message;

	return await channel.send([
		"I was created by HansoMWarE Corporation",
		`I'm in version ${version} - beta`,
		"The main programmer of my project was Geison Oriani#6252", // Fix
		"I was created with the intention of being a bot of music for the discord and it turned out that this is only a part of my talents"
	]);
}