class Pen {
  // Attributes
  constructor() {
    this.color = undefined;
    this.charge = undefined;
    this.tip = undefined;
    this.model = undefined;
    this.capped = undefined;
  }

  // Methods
  setAll(color, charge, tip, model, capped) { // string, integer, float, string, boolean
    this.setColor(color);
    this.setCharge(charge)
    this.setTip(tip)
    this.setModel(model)
    this.setCapped(capped)
  }

  setColor(string) {
    this.color = string;
  }
  getColor() {
    return this.color;
  }
  setCharge(float) {
    this.charge = float;
  }
  getCharge() {
    return this.charge;
  }
  setTip(float) {
    this.tip = float;
  }
  getTip() {
    return this.tip;
  }
  setModel(string) {
    this.model = string;
  }
  getModel() {
    return this.model;
  }
  setCapped(boolean) {
    this.capped = boolean;
  }
  getCapped() {
    return this.capped;
  }

  cap() {
    const title = "Cap: ";
    const text = "capped";

    if (!this.getCapped()) {
      this.setCapped(true); // boolean
      console.log(title + "OK, " + text);
    } else {
      console.log(title + "Warn, is already " + text);
    }
  };
  uncap() {
    const title = "Uncap: ";
    const text = "uncapped";

    if (this.getCapped()) {
      this.setCapped(false); // boolean
      console.log(title + "OK, " + text);
    } else {
      console.log(title + "Warn, is already " + text);
    }
  };

  doodle() {
    const lifespan = 1;
    const title = "doodle: ";
    const text = "doodling";

    this.use(lifespan, title, text); // float, string, string
  };
  write() {
    const lifespan = 2;
    const title = "Write: ";
    const text = "writing";

    this.use(lifespan, title, text); // float, string, string
  };
  paint() {
    const lifespan = 4;
    const title = "Paint: ";
    const text = "painting";

    this.use(lifespan, title, text); // float, string, string
  };
  use(lifespan, title, text) {
    if (!this.getCapped()) {
      if (this.getCharge() - lifespan >= 0) {
        if (this.getCharge() - lifespan > 0) {
          console.log(title + "OK, " + text);
        } else if (this.getCharge() - lifespan === 0) {
          console.log(title + "Warn, " + text + ", the ink ended");
        }
        this.setCharge(this.getCharge() - lifespan); // float
      } else {
        console.log(title + "Warn, the ink is insufficient");
      }
    } else {
      console.log(title + "Error, pen capped");
    }
  }
}
/* pen 0 */
pen0 = new Pen(); // pen0 = new Pen instance
console.log("pen0:", pen0);

/* pen 1 */
pen1 = new Pen(); // pen1 = new Pen instance

// set the value directly
pen1.color = "Blue"; // string
pen1.charge = 100; // float
pen1.tip = 1; // float
pen1.model = "Faber-Castell"; // string
pen1.capped = true; // boolean

console.log("pen1:", pen1); // print the value of pen1 after defined by direct interaction
pen1.uncap(); // uncap the pen1
pen1.paint(); // lifetime -= 4
pen1.write(); // lifetime -= 2
pen1.doodle(); // lifetime -= 1
pen1.cap(); // cap the pen1
console.log("pen1:", pen1); // print the value of pen1 fter use

/* pen 2 */
pen2 = new Pen(); // pen2 = new Pen instance

// set the value with a function
pen2.setColor("Red"); // string
pen2.setCharge(70.25); // float
pen2.setTip(0.5); // float
pen2.setModel("Pilot"); // string
pen2.setCapped(false); // boolean

console.log("pen2:", pen2); // print the pen 2 value after defined by the functions
pen2.uncap(); // uncap the pen2
pen2.paint(); // lifetime -= 4
pen2.write(); // lifetime -= 2
pen2.doodle(); // lifetime -= 1
pen2.cap(); // cap the pen2
console.log("pen2:", pen2); // print the value of pen2 fter use

/* pen 3 */
pen3 = new Pen(); // pen3 = new Pen instance

// set the value with just one function that
pen3.setAll("Black", 92.7, 0.5, "BIC", true); // string, float, float, string, boolean

console.log("pen3:", pen3); // print the pen 2 value after defined by the function
pen3.uncap(); // uncap the pen3
pen3.paint(); // lifetime -= 4
pen3.write(); // lifetime -= 2
pen3.doodle(); // lifetime -= 1
pen3.cap(); // cap the pen3
console.log("pen3:", pen3); // print the value of pen3 fter use