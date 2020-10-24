module.exports = (event) => {
	return [
		`Status: ${event.user.tag} Left a Guild!`,
		`Server: ${event.guild.name} (${event.guild.id})`,
		`Name: ${event.user.username} (${event.user.id})`,
	]
}