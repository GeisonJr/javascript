module.exports = (client) => { // Counter Guilds

	const counter = {
		total: 0 // Guilds
	}

	client.guilds.cache.map(() => {
		counter.total++;
	});

	return counter;
}