export default function renderScreen(screen, game, requestAnimationFrame) {
	const context = screen.getContext("2d");

	/* Scenario */
	for (const id in game.state.scenarios.clouds) { // Clouds
		const { coordinates, dimensions, collision, speed } = game.state.scenarios.clouds[id];
		const { color, image } = collision;

		speed.velocity += speed.acceleration;
		for (let i = 0; i < speed.velocity; i++) {
			if (coordinates.x + dimensions.width <= 0) {
				coordinates.y = Math.floor(Math.random() * (screen.height / 4));
				coordinates.x = screen.width;
			} else {
				coordinates.x -= 1;
			}
		}

		collisonArea(coordinates, dimensions, color);
		entitieImage(coordinates, dimensions, image);
	};
	for (const id in game.state.scenarios.mountains1) { // Mountains1
		const { coordinates, dimensions, collision, speed } = game.state.scenarios.mountains1[id];
		const { color, image } = collision;

		speed.velocity += speed.acceleration + 0.00005;
		var form = Number.parseFloat(speed.velocity).toFixed(2);
		console.log(form)

		if (coordinates.x + dimensions.width <= 0) {
			coordinates.x = screen.width - Math.ceil(form);
		} else {
			coordinates.x -= form;
		}

		collisonArea(coordinates, dimensions, color);
		entitieImage(coordinates, dimensions, image);
	};
	for (const id in game.state.scenarios.mountains2) { // Mountains2
		const { coordinates, dimensions, collision, speed } = game.state.scenarios.mountains2[id];
		const { color, image } = collision;

		speed.velocity += speed.acceleration + 0.0001;
		var form = Number.parseFloat(speed.velocity).toFixed(2);
		console.log(form)

		if (coordinates.x + dimensions.width <= 0) {
			coordinates.x = screen.width - form;
		} else {
			coordinates.x -= form;
		}

		collisonArea(coordinates, dimensions, color);
		entitieImage(coordinates, dimensions, image);
	};
	for (const id in game.state.scenarios.mountains3) { // Mountains3
		const { coordinates, dimensions, collision, speed } = game.state.scenarios.mountains3[id];
		const { color, image } = collision;

		speed.velocity += speed.acceleration + 0.00015;
		var form = Number.parseFloat(speed.velocity).toFixed(2);
		console.log(form)

		if (coordinates.x + dimensions.width <= 0) {
			coordinates.x = screen.width - form;
		} else {
			coordinates.x -= form;
			;
		}

		collisonArea(coordinates, dimensions, color);
		entitieImage(coordinates, dimensions, image);
	};
	for (const id in game.state.scenarios.grounds) { // Grounds
		const { coordinates, dimensions, collision, speed } = game.state.scenarios.grounds[id];
		const { color, image } = collision;

		speed.velocity += speed.acceleration;
		for (let i = 0; i < speed.velocity; i++) {
			if (coordinates.x + dimensions.width <= 0) {
				coordinates.x = screen.width;
			} else {
				coordinates.x -= 1;
			}
		}

		collisonArea(coordinates, dimensions, color);
		entitieImage(coordinates, dimensions, image);
	};

	/* Obstacles */
	for (const id in game.state.obstacles.cacti) {
		const { coordinates, dimensions, collision, speed } = game.state.obstacles.cacti[id];
		const { color, image } = collision;

		speed.velocity += speed.acceleration;
		for (let i = 0; i < speed.velocity; i++) {
			if (coordinates.x + dimensions.width <= 0) {
				coordinates.x = screen.width;
			} else {
				coordinates.x -= 1;
			}
		}

		collisonArea(coordinates, dimensions, color);
		entitieImage(coordinates, dimensions, image);
	};

	/* Dinosaurs */
	for (const id in game.state.dinosaurs) {
		const { coordinates, dimensions, collision, jump } = game.state.dinosaurs[id];
		const { color, image } = collision;
		if (game.state.state.counter > 0) { // se exitir entidades vivas
			if (collision.alive) { // se a entidade estiver viva

				if (jump.enable && jump.jump && jump.jumping === false) {
					jump.velocity -= 20;
					jump.jumping = true;
				}

				jump.velocity += jump.gravity;
				coordinates.y += jump.velocity;
				jump.velocity *= jump.friction;

				if (coordinates.y > screen.height - dimensions.height) {
					jump.jumping = false;
					jump.jump = false;
					coordinates.y = screen.height - dimensions.height;
					jump.velocity = 0;
				}

				collisonArea(coordinates, dimensions, color);
				entitieImage(coordinates, dimensions, image);
				teste(collision, id);

			} else if (game.state.state.counter === 0) { // senao exitir entidades vivas
				console.warn("gameover");
			}
		}
	};

	function teste(collision, id) {
		if (collision.enable) {
			game.checkCollision(id);
		}
	}
	function collisonArea(coordinates, dimensions, color) {
		if (color.enable) {
			context.fillStyle = color.element;
			context.fillRect(coordinates.x, coordinates.y, dimensions.width, dimensions.height);
		};
	};
	function entitieImage(coordinates, dimensions, image) {
		if (image.enable) {
			context.drawImage(image.element, coordinates.x, coordinates.y, dimensions.width, dimensions.height);
		};
	};

	requestAnimationFrame(() => {
		context.clearRect(0, 0, screen.width, screen.height); // x, y, width, height
		renderScreen(screen, game, requestAnimationFrame);
	});
}