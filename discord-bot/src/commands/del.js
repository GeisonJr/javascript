/* Discord */
const Discord = require("discord.js");
/* /Discord */

// Fix

/* Environment */
require("dotenv").config();
const { PREFIX } = process.env;
/* /Environment */

module.exports.run = async (client, message, args) => {

	const { author, channel } = message;

	const inputChatDelete = args;
	const integerChatDelete = Number.parseInt(args, 10);
	console.log(inputChatDelete);
	console.log(integerChatDelete);

	if (isNaN(integerChatDelete)) { // Not a Number
		await channel.send(`Sorry ${author}, but you can't delete "${inputChatDelete}", because this is not a number(NaN)`);
	} else if (integerChatDelete < 1) { // Less than 1
		await channel.send(`Sorry ${author}, but you can't delete less than 1 message`);
	} else if (integerChatDelete > 100) { // More than 100
		await channel.send(`Sorry ${author}, but you can't delete more than :100: messages at once`);
	} else {
		await channel.bulkDelete(1);
		await channel.bulkDelete(integerChatDelete)
			.then(async () => {
				await channel.send(`OK ${author}, ${integerChatDelete} messages successfully deleted`);
			})
			.catch(async (err) => {
				console.error(err);
				await channel.send(`Sorry ${author}, but you can't bulk delete messages older than 14 days`);
			});
	}
}