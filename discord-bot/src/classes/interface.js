module.exports = class Interface {
	vertical = "│";
	space = " ";
	width = 68;
	splash = [
		`                   ┌────────────────────────────┐                   `,
		`┌──────────────────┤   HansoMWarE Corporation   ├──────────────────┐`,
		`│                  └────────────────────────────┘                  │`,
		`│ - HansoMWarE Discord Bot                                         │`,
		`│ - © 2020 HansoMWarE Corporation. All rights reserved.            │`,
		`│                         ┌──────────────┐                         │`,
		`├─────────────────────────┤   Credits:   ├─────────────────────────┤`,
		`│                         └──────────────┘                         │`,
		`│ - Developed by HansoMWarE Corporation                            │`,
		`│ - Powered by HansoMWarE Corporation                              │`,
		`│                          ┌────────────┐                          │`,
		`├──────────────────────────┤   About:   ├──────────────────────────┤`,
		`│                          └────────────┘                          │`,
		`│ - Version: 0.1.19 (Beta)                                         │`,
		`│                                                                  │`,
		`└──────────────────────────────────────────────────────────────────┘`
	];
	status = [
		`                           ┌────────────┐                           `,
		`┌──────────────────────────┤   Status   ├──────────────────────────┐`,
		`│                          └────────────┘                          │`,
		`│                                                                  │`,
		`└──────────────────────────────────────────────────────────────────┘`
	];
	emoji = [
		`                           ┌────────────┐                           `,
		`┌──────────────────────────┤   Emoji:   ├──────────────────────────┐`,
		`│                          └────────────┘                          │`,
		`│                                                                  │`,
		`└──────────────────────────────────────────────────────────────────┘`
	];
	log = [
		`                            ┌──────────┐                            `,
		`┌───────────────────────────┤   Log:   ├───────────────────────────┐`,
		`│                           └──────────┘                           │`,
		`│                                                                  │`,
		`└──────────────────────────────────────────────────────────────────┘`
	];
	logMeth = [
		`                           ┌────────────┐                           `,
		`┌──────────────────────────┤   Error:   ├──────────────────────────┐`,
		`│                          └────────────┘                          │`,
		`│                                                                  │`,
		`└──────────────────────────────────────────────────────────────────┘`
	];

	Grid(array) { // Align in Grid
		function countCodePoints(str) {
			let len = 0;
			for (let i = 0; i < str.length;) {
				let point = str.codePointAt(i);
				let width = 0;
				while (point) {
					width += 1;
					point = point >> 8;
				}
				i += Math.round(width / 2);
				len += 1;
			}
			return len;
		}

		const { vertical, width, space } = new Interface();
		const math = width - (vertical.length * 2 + space.length);
		var string = vertical + space + array;
		for (let i = math; i > countCodePoints(array); i--) {
			string += space;
		}
		return string += vertical;
	}

	Splash() { // Splash Screen
		console.clear();
		for (let i = 0; i < this.splash.length; i++) {
			console.log(this.splash[i]);
		}
	}

	Status(client, status, array) { // Status Screen
		client.user.setStatus(status);
		for (let i = 0; i < this.status.length - 2; i++) {
			console.log(this.status[i]);
		}
		for (let i = 0; i < array.length; i++) {
			console.log(this.Grid(array[i]));
		}
		for (let i = this.status.length - 2; i < this.status.length; i++) {
			console.log(this.status[i]);
		}
	}

	Log(array) { // Log Screen

		for (let i = 0; i < this.log.length - 2; i++) {
			console.log(this.log[i]);
		}
		for (let i = 0; i < array.length; i++) {
			console.log(this.Grid(array[i]));
		}
		for (let i = this.log.length - 2; i < this.log.length; i++) {
			console.log(this.log[i]);
		}
	}

	LogMeth(obj) { // Log Screen
		for (let i = 0; i < this.logMeth.length - 2; i++) {
			console.log(this.logMeth[i]);
		}
		console.log(this.Grid("Code: " + obj.code));
		console.log(this.Grid("Message: " + obj.message));
		for (let i = this.logMeth.length - 2; i < this.logMeth.length; i++) {
			console.log(this.logMeth[i]);
		}
	}
}