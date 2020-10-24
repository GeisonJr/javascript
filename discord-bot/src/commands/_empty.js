/* Discord */
const Discord = require("discord.js");
/* /Discord */

/* Package */
const { version } = require("../../../package.json");
/* /Package */

/* Environment */
require("dotenv").config();
const { PREFIX, TOKEN } = process.env;
/* /Environment */

module.exports.run = async (client, message, args) => {

	const content = message.content.toLowerCase();
	const { author, channel, guild } = message;
	const { user, users } = client;

	return
}