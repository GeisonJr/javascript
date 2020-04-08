export default function createGame() {

	const state = {
		dinosaurs: {},
		obstacles: {
			cacti: {}
		},
		scenarios: {
			clouds: {},
			mountains1: {},
			mountains2: {},
			mountains3: {},
			grounds: {},
		},
		state: {
			gameover: false,
			counter: 0,
			remove: false,
			add: false,
			move: true,
			collision: true,

		}
	};
	// Dino
	function addDino(command) {
		const { coordinates, dimensions, collision, jump, id } = command;
		state.dinosaurs[id] = { coordinates, dimensions, collision, jump };
		state.state.counter++;
		if (state.state.add) {
			console.warn(`game.addDino() -> '${id}' has been added`);
		}
	};
	function removeDino(command) {
		const { dinoId: id } = command;
		state.dinosaurs[id].collision.alive = false;
		state.state.counter--;
		if (state.state.remove) {
			console.warn(`game.removeDino() -> '${id}' has been removed`);
		}
	};

	// Cloud
	function addCloud(command) {
		const { coordinates, dimensions, collision, speed, id } = command;
		state.scenarios.clouds[id] = { coordinates, dimensions, collision, speed };
		if (state.state.add) {
			console.warn(`game.addCloud() -> '${id}' has been added`);
		}
	};

	// Mountain1
	function addMountain1(command) {
		const { coordinates, dimensions, collision, speed, id } = command;
		state.scenarios.mountains1[id] = { coordinates, dimensions, collision, speed };
		if (state.state.add) {
			console.warn(`game.addMountain1() -> '${id}' has been added`);
		}
	};
	// Mountain2
	function addMountain2(command) {
		const { coordinates, dimensions, collision, speed, id } = command;
		state.scenarios.mountains2[id] = { coordinates, dimensions, collision, speed };
		if (state.state.add) {
			console.warn(`game.addMountain2() -> '${id}' has been added`);
		}
	};
	// Mountain3
	function addMountain3(command) {
		const { coordinates, dimensions, collision, speed, id } = command;
		state.scenarios.mountains3[id] = { coordinates, dimensions, collision, speed };
		if (state.state.add) {
			console.warn(`game.addMountain3() -> '${id}' has been added`);
		}
	};

	// Ground
	function addGround(command) {
		const { coordinates, dimensions, collision, speed, id } = command;
		state.scenarios.grounds[id] = { coordinates, dimensions, collision, speed };
		if (state.state.add) {
			console.warn(`game.addGround() -> '${id}' has been added`);
		}
	};

	// Obstacle
	function addCactus(command) {
		const { coordinates, dimensions, collision, speed, id } = command;
		state.obstacles.cacti[id] = { coordinates, dimensions, collision, speed };
		if (state.state.add) {
			console.warn(`game.addCactus() -> '${id}' has been added`);
		}
	};

	function moveDino(command) {
		const { dinoId, keyPressed } = command;

		if (state.state.move) {
			console.log(`game.moveDino() -> Moving '${dinoId}' with '${keyPressed}'`);
		}

		const Moves = {
			// Arrows
			ArrowUp(dino) { // highest value between dino.coordinates.y - 1 and 0, positive >= zero
				dino.jump.jump = true;
				return "Up";
			},
			ArrowDown(dino) { // lowest value between dino.coordinates.y + 1 and screen.height - 1, positive < screen.height
				return "Down";
			}
		};

		const dino = state.dinosaurs[dinoId];
		const move = Moves[keyPressed];

		if (dino && move) {
			const direction = move(dino);
			if (state.state.move) {
				console.log(`game.moveDino().${keyPressed}() -> '${dinoId}' moved to '${direction}'`);
			}
			checkCollision(dinoId);
		} else if (!dino) {
			if (state.state.move) {
				console.warn(`game.moveDino() -> '${dinoId}' is not a valid dino`);
			}
		} else if (!move) {
			if (state.state.move) {
				console.warn(`game.moveDino() -> '${keyPressed}' is not a valid movement`);
			}
		};
	};

	function checkCollision(dinoId) {
		for (const obstacleId in state.obstacles.cacti) {
			const obstacle = state.obstacles.cacti[obstacleId];
			const dino = state.dinosaurs[dinoId];

			if (dino.coordinates.x < obstacle.coordinates.x + obstacle.dimensions.width) {
				if (dino.coordinates.x + dino.dimensions.width > obstacle.coordinates.x) {
					if (dino.coordinates.y < obstacle.coordinates.y + obstacle.dimensions.height) {
						if (dino.coordinates.y + dino.dimensions.height > obstacle.coordinates.y) {
							removeDino({ dinoId: dinoId });
							if (state.state.collision) {
								console.warn(`game.checkCollision() -> '${dinoId}' collided with '${obstacleId}'`);
							};
						};
					};
				};
			};
		};
	};

	return {
		state,
		addDino, removeDino,
		addCactus,
		addMountain1, addMountain2, addMountain3,
		addCloud, addGround,
		checkCollision, moveDino
	};
}