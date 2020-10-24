module.exports = (event) => {
	return [
		`Status: Emoji Deleted at ${event.guild.name}`,
		`Server: ${event.guild.name} (${event.guild.id})`,
		`Emoji: ${event.name} (${event.id})`,
		`Animated: ${event.animated}`
	]
}