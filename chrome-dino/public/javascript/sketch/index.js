import createKeyboardListener from "../functions/keyboard-listener.js";
import renderScreen from "../functions/render-screen.js";
import createGame from "../functions/game.js";

import { Cactus } from "../class/Obstacles.js";
import { Dinosaur } from "../class/Dinosaur.js";
import { Mountain, Cloud, Ground } from "../class/Scenarios.js";

// screen
const screen = document.getElementById("screen");

screen.width = 1200;
screen.height = 192;

// game
const game = createGame(screen);

const quantity = {
	dinosaurs: 1, // Min Recomended = 1, Recomended = 1, Max Recomended = 15, Limit = Infinity
	mountains: 2, // Min Recomended = 2, Recomended = 2, Max Recomended = 2, Limit = Infinity
	clouds: 5, // Min Recomended = 3, Recomended = 5, Max Recomended = 10, Limit = Infinity
	grounds: 2, // Min Recomended = 2, Recomended = 2, Max Recomended = 2, Limit = Infinity
	cacti: 3, // Min Recomended = 1, Recomended = 3, Max Recomended = 4, Limit = 5
}

for (let i = 0; i < quantity.dinosaurs; i++) {
	game.addDino(new Dinosaur(screen, i, quantity.dinosaurs).add());
};

for (let i = 0; i < quantity.mountains; i++) {
	const image = new Array();
	image[0] = new Image();
	image[1] = new Image();
	image[2] = new Image();
	image[0].src = `http://127.0.0.1:5500/chrome-dino/public/assets/scenarios/bmp/mountains/mountain${i + 0}.bmp`;
	image[1].src = `http://127.0.0.1:5500/chrome-dino/public/assets/scenarios/bmp/mountains/mountain${i + 2}.bmp`;
	image[2].src = `http://127.0.0.1:5500/chrome-dino/public/assets/scenarios/bmp/mountains/mountain${i + 4}.bmp`;
	game.addMountain1(new Mountain(screen, image[0], i, quantity).add());
	game.addMountain2(new Mountain(screen, image[1], i, quantity).add());
	game.addMountain3(new Mountain(screen, image[2], i, quantity).add());
};

for (let i = 0; i < quantity.clouds; i++) {
	game.addCloud(new Cloud(screen, i, quantity.clouds).add());
};

for (let i = 0; i < quantity.grounds; i++) {
	game.addGround(new Ground(screen, i, quantity.grounds).add());
};

for (let i = 0; i < quantity.cacti; i++) {
	game.addCactus(new Cactus(screen, i, quantity.cacti).add());
};

console.log(game.state);

// render
renderScreen(screen, game, requestAnimationFrame);

// keyboardListener
const keyboardListener = createKeyboardListener(document);
keyboardListener.state.subscribe(game.moveDino);