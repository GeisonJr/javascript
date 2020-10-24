module.exports = (client, event) => {
	return [
		`Status: ${client.user.tag} is Error!`,
		`Name: ${event.name}`,
		`Message: ${event.message}`,
		`Stack: ${event.stack}`
	]
}