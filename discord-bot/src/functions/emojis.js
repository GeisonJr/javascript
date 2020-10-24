module.exports = (client) => { // Counter Emojis

	const flags = {
		static: true, // Static Emojis
		animated: true // Animated Emojis
	}
	
	const counter = {
		total: 0, // All Emojis
		static: 0, // Static Emojis
		animated: 0 // Animated Emojis
	}

	client.emojis.cache.map((event) => {
		if (flags["static"] && !event.animated) { // Static Emojis
			counter.total++;
			counter.static++;
		} else if (flags["animated"] && event.animated) { // Animated Emojis
			counter.total++;
			counter.animated++;
		}
	});

	return counter;
}