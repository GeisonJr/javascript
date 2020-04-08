export class Cloud {
	constructor(screen, i, quantity) {

		const image = new Image();
		image.src = `http://127.0.0.1:5500/chrome-dino/public/assets/scenarios/png/clouds/cloud${0}.png`;

		/* Render params */
		this.quantity = quantity;
		this.screen = screen;
		this.image = image;
		this.i = i;

		/* ID params */
		this.id = `cloud${this.i + 1}`;

		/* Dimension params */
		this.dimensions = {
			width: this.image.width / 2, // Width -> size image
			height: this.image.height / 2 // Height -> size image
		};

		/* Coordinates params */
		this.coordinates = {
			x: this.i * ((this.screen.width + this.image.width) / this.quantity), // Coodinate X
			y: Math.floor(Math.random() * (screen.height / 4))// Coodinate Y
		};

		/* Collison params */
		this.collision = {
			color: {
				enable: false,
				element: "#0F0",
			},
			image: {
				enable: true,
				element: this.image,
			}
		};

		/* Speed params */
		this.speed = {
			acceleration: 0.0001,
			velocity: 2
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
};

export class Mountain {
	constructor(screen, image, i, quantity) {

		/* Render params */
		// this.quantity = quantity;
		// this.screen = screen;
		this.image = image;
		this.i = i;

		/* ID params */
		this.id = `mountain${this.i + 1}`;

		/* Dimension params */
		this.dimensions = {
			width: this.image.width, // Width -> size image
			height: this.image.height // Height -> size image
		};

		/* Coordinates params */
		this.coordinates = {
			x: this.i * this.dimensions.width, // Coodinate X
			y: 0 // Coodinate Y
		};

		/* Collison params */
		this.collision = {
			color: {
				enable: false,
				element: "#FFF",
			},
			image: {
				enable: true,
				element: this.image,
			}
		};

		/* Speed params */
		this.speed = {
			acceleration: 0.0001,
			velocity: 3
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
};

export class Ground {
	constructor(screen, i, quantity) {

		const image = new Image();
		image.src = `http://127.0.0.1:5500/chrome-dino/public/assets/scenarios/png/grounds/ground${0}.png`;

		/* Render params */
		// this.quantity = quantity;
		this.screen = screen;
		this.image = image;
		this.i = i;

		/* ID params */
		this.id = `ground${this.i + 1}`;

		/* Dimension params */
		this.dimensions = {
			width: this.image.width / 2, // Width -> size image
			height: this.image.height / 2 // Height -> size image
		};

		/* Coordinates params */
		this.coordinates = {
			x: this.i * this.dimensions.width, // Coodinate X
			y: this.screen.height - this.dimensions.height // Coodinate Y
		};

		/* Collison params */
		this.collision = {
			color: {
				enable: true,
				element: "#FFF",
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
};