module.exports = (client) => { // Counter Channels

	const flags = {
		category: false, // Category Channels
		voice: true, // Voice Channels
		text: true // Text Channels
	}

	const counter = {
		total: 0, // All Channels
		category: 0, // Category Channels
		voice: 0, // Voice Channels
		text: 0 // Text Channels
	}

	client.channels.cache.map((event) => {
		if (flags["category"] && event.type === "category") { // Category Channels
			counter.total++;
			counter.category++;
		} else if (flags["voice"] && event.type === "voice") { // Voice Channels
			counter.total++;
			counter.voice++;
		} else if (flags["text"] && event.type === "text") { // Text Channels
			counter.total++;
			counter.text++;
		}
	});

	return counter;
}