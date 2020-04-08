export class Dinosaur {
	constructor(screen, i, quantity) {

		const image = new Image();
		image.src = `http://127.0.0.1:5500/chrome-dino/public/assets/dinosaur/png/dinosaurs/dinosaur${0}.png`;

		/* Render params */
		this.quantity = quantity;
		this.screen = screen;
		this.image = image;
		this.i = i;

		/* ID params */
		this.id = `dinosaur${this.i + 1}`;

		/* Dimension params */
		this.dimensions = {
			width: this.image.width / 2, // Width -> size image
			height: this.image.height / 2 // Height -> size image
		};

		/* Coordinates params */
		this.coordinates = {
			x: 50 - (this.i * (50 / this.quantity)), // Coodinate X
			y: this.screen.height - this.dimensions.height // Coodinate Y
		};

		/* Collison params */
		this.collision = {
			enable: true,
			alive: true,
			color: {
				enable: false,
				element: "#0F0",
			},
			image: {
				enable: true,
				element: this.image,
			}
		};

		/* Jump params */
		this.jump = {

			enable: true,
			jumping: false,
			jump: false,

			gravity: 1.2,
			friction: 0.9,
			velocity: 0
		};
	};

	add() {
		return {
			coordinates: this.coordinates,
			dimensions: this.dimensions,
			collision: this.collision,
			jump: this.jump,
			id: this.id
		};
	};
};