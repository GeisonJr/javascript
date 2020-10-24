/* Discord */
const Discord = require("discord.js");
/* /Discord */

module.exports.run = async (client, message, args) => {

	const content = message.content.toLowerCase();
	const { author, channel, guild } = message;
	const { user, users } = client;

	const Jokes = {
		cat: {
			question: "What do you call a gigantic pile of kittens?",
			answer: "A meowntain :cat: :cat: :cat: :mountain_snow:"
		},
		fan: {
			question: "Why was the stadium so cool?",
			answer: "it was filled with fans"
		},
		spider: {
			question: "Why is the spider the most needy animal in the world?",
			answer: "because she is an arac***__needyou__***"
		}
	}
	// categories of jokes in the class
	const categoriesOfJokes = ["cat", "fan", "spider"];
	// calculator of random
	const numberOfJoke = Math.floor(Math.random() * categoriesOfJokes.length);
	// select the joke in array
	const joke = categoriesOfJokes[numberOfJoke];

	await channel.send(Jokes[joke].question);
	await channel.send(Jokes[joke].answer);
}