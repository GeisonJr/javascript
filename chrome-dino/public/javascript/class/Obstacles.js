export class Cactus {
	constructor(screen, i, quantity) {

		const image = new Image();
		image.src = `http://127.0.0.1:5500/chrome-dino/public/assets/obstacles/bmp/cacti/cactus${i}.bmp`;

		/* Render params */
		this.quantity = quantity;
		this.screen = screen;
		this.image = image;
		this.i = i;

		/* ID params */
		this.id = `cactus${this.i + 1}`;

		/* Dimension params */
		this.dimensions = {
			width: this.image.width, // Width -> size image
			height: this.image.height // Height -> size image
		}

		/* Coordinates params */
		this.coordinates = {
			x: this.screen.width + (this.i * ((this.screen.width + this.image.width) / this.quantity)), // Coodinate X
			y: this.screen.height - (this.dimensions.height + 3) // Coodinate Y
			
		};

		/* Collison params */
		this.collision = {
			color: {
				enable: true,
				element: "#F00",
			},
			image: {
				enable: true,
				element: this.image,
			}
		};

		/* Speed params */
		this.speed = {
			acceleration: 0.0005,
			velocity: 10
		};
	};

	add() {
		return {
			coordinates: this.coordinates,
			dimensions: this.dimensions,
			collision: this.collision,
			speed: this.speed,
			id: this.id
		};
	};
}