module.exports = (client) => { // Counter Users
	
	const flags = {
		users: true, // Users
		bots: true, // Bots
		self: true // Self
	}

	const counter = {
		total: 0, // All Members
		users: 0, // Users
		bots: 0 // Bots
	}

	client.users.cache.map((event) => {
		if (flags["bots"] && (event.bot && event.id !== client.user.id)) { // Bots
			counter.total++;
			counter.bots++;
		} else if (flags["users"] && !event.bot) { // Users
			counter.total++;
			counter.users++;
		} else if (flags["self"] && event.id === client.user.id) { // Self Client
			counter.total++;
		}
	});

	return counter;
}