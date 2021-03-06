var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      //debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

// An instance of a Phaser.Game object is assigned to a local variable called game and the configuration object is passed to it. This will start the process of bringing Phaser to life.
var game = new Phaser.Game(config);

function preload() {
  this.load.image("waves", "./assets/pattern.jpg");
  this.load.image("speaker", "./assets/speaker.png");
  this.load.image("ship1", "./assets/1_ship.png");
  this.load.image("ship2", "./assets/2_ship.png");
  this.load.image("flip_ship", "./assets/flip_ship.png");
  this.load.image("splash", "./assets/water_splash.png");
  this.load.image("flower", "./assets/flower.png");
  this.load.image("ship_with_flower", "./assets/2ship_with_flower.png");
  this.load.audio("sea", ["./assets/sea.mp3"]);
  this.load.audio("hit", ["./assets/hit.wav"]);
  this.load.audio("miss", ["./assets/miss.wav"]);
  this.load.audio("sad", ["./assets/sad.wav"]);
  this.load.image("red_particle", "assets/red_particle.png");

  this.load.audio("kids_cheering", "assets/kids_cheering.mp3");
  this.load.path = "assets/";
  this.load.multiatlas("firework", "fireworks.json");
  this.load.multiatlas("sceleton", "sceleton2.json");
}

let ships_config = [];
let splash_config = [];
let score = 0;
let scoreText;
let shotCounter = 0;
let attemptText;
let sea;
let hit;
let miss;
let newBackground;
// let firework;
// let sceleton;

function create() {
  //background
  let background = this.add.image(400, 300, "waves");
  background.displayWidth = 800;
  background.displayHeight = 600;
  let cell_size = 40;
  let cell_quantity = 10;
  let x_0 = 210;
  let y_0 = 120;

  //Score
  scoreText = this.add.text(300, 70, `score: ${score} /16`, {
    fontSize: "32px",
    fill: "#000",
    backgroundColor: "#dffbff",
    fontFamily: "carino_sanssemibold",
  });

  //Attempts
  attemptText = this.add.text(265, 530, `attempts: ${shotCounter} /70`, {
    fontSize: "32px",
    fill: "#000",
    backgroundColor: "#dffbff",
    fontFamily: "carino_sanssemibold",
  });

  //Score text padding
  scoreText.setPadding({ x: 10, y: 5 });
  attemptText.setPadding({ x: 10, y: 5 });

  // grid
  var grid = this.add.grid(
    x_0 + (cell_size * cell_quantity) / 2, //x
    y_0 + (cell_size * cell_quantity) / 2, //y
    cell_size * cell_quantity, //width
    cell_size * cell_quantity, //height
    cell_size, //cellWidth
    cell_size, //cellHeight
    0xdffbff,
    1,
    0x000000,
    1
  );

  let ship1_y_size = 35;
  let splash_y_size = 60;
  let total_number_ships1 = 4;
  let total_number_splash = cell_quantity * cell_quantity;

  var count = 0;
  //////////////////////////SPLASHES////////////////////////////////////

  for (
    let splash_number = 0;
    splash_number < total_number_splash;
    splash_number++
  ) {
    let k = Phaser.Math.Between(0, cell_quantity - 1);
    let l = Phaser.Math.Between(0, cell_quantity - 1);
    while (splash_config.some((splash) => splash[0] == k && splash[1] == l)) {
      k = Phaser.Math.Between(0, cell_quantity - 1);
      l = Phaser.Math.Between(0, cell_quantity - 1);
    }
    splash_config.push([k, l]);

    var splash = this.add.sprite(
      x_0 + cell_size * (k + 0.5),
      y_0 + cell_size * (l + 0.5),
      "splash"
    );

    splash.setScale((0.9 * cell_size) / splash_y_size);
    splash.setInteractive();
    splash.input.hitArea.setTo(-2, -2, 55, 55);
    splash.alpha = 0.000001;

    let loserText;
    let scene = this;

    splash.on("pointerdown", function () {
      miss = scene.sound.add("miss", { volume: 0.4 });
      miss.play();
      if (this.alpha != 1) {
        shotCounter++;
        this.alpha = 1;
        attemptText.setText("attempts: " + shotCounter + " /70");
      }
      if (shotCounter == 70) {
        setTimeout(() => {
          onEvent();
        }, 500);
        function onEvent() {
          newBackground = scene.add.image(400, 300, "waves");
          newBackground.displayWidth = 800;
          newBackground.displayHeight = 600;
          loserText = scene.add.text(
            60,
            300,
            "YOU LOST! ALL SHIPS ARE STILL FLOATING!",
            {
              fontSize: "32px",
              fill: "#000",
              backgroundColor: "#dffbff",
              fontFamily: "carino_sanssemibold",
            }
          );
          loserText.setPadding({ x: 15, y: 15 });
          ////////////////////////////Sceleton FUNCTION////////////////////////////////
          addSceleton("sceleton", scene);
        }
      }
    });
    ///////////////////////TEXT FOR SHOOT COUNTER/////////////////////////////////
  }
  //////////////////////////////1 CELL SHIP/////////////////////////////////////////
  let i;
  let j;

  //creating 4 ships using the variable "total_number_ships1"
  for (let ship_number = 0; ship_number < total_number_ships1; ship_number++) {
    //randomly generated position of a ship
    let i = Phaser.Math.Between(0, cell_quantity - 1);
    let j = Phaser.Math.Between(0, cell_quantity - 1);

    //checks if i,j already used in ships_config -- if used generates new i,j (if it returns false it goes to the next steps)
    while (ships_config.some((ship) => ship[0] == i && ship[1] == j)) {
      i = Phaser.Math.Between(0, cell_quantity - 1);
      j = Phaser.Math.Between(0, cell_quantity - 1);
    }

    //ship position is stored in array "ships_config"
    ships_config.push([i, j]);

    var ship1 = this.add.sprite(
      x_0 + cell_size * (i + 0.5),
      y_0 + cell_size * (j + 0.5),
      "ship1"
    );

    //ship image is scaled to fit into the cell
    ship1.setScale((0.9 * cell_size) / ship1_y_size);
    ship1.setInteractive();

    ship1.input.hitArea.setTo(-7, 3, 36, 36);
    ship1.alpha = 0.000001;

    let winnerText;
    let scene = this;

    ship1.on("pointerdown", function () {
      hit = scene.sound.add("hit", { volume: 0.4 });
      hit.play({
        seek: 2.55,
      });
      if (this.alpha != 1) {
        score++;
        this.alpha = 1;
        scoreText.setText("score: " + score + " /16");
        if (score == 16) {
          setTimeout(() => {
            onEvent();
          }, 1000);
          function onEvent() {
            let newBackground = scene.add.image(400, 300, "waves");
            newBackground.displayWidth = 800;
            newBackground.displayHeight = 600;
            winnerText = scene.add.text(
              100,
              300,
              "YOU WON! ALL SHIPS ARE DEFEATED!",
              {
                fontSize: "32px",
                fill: "#000",
                backgroundColor: "#dffbff",
                fontFamily: "carino_sanssemibold",
              }
            );
            winnerText.setPadding({ x: 15, y: 15 });
            ////////////////////////FIREWORK FUNCTION///////////////////////////
            addFireworks("firework", scene);
          }
        }
      }
    });
  }
  //////////////////////////////2 CELL SHIP/////////////////////////////////////////

  for (let ship_number = 0; ship_number < 3; ship_number++) {
    let i = Phaser.Math.Between(0, cell_quantity - 1);
    let j = Phaser.Math.Between(0, cell_quantity - 2);

    while (
      ships_config.some(
        (ship) =>
          (ship[0] == i && ship[1] == j) || (ship[0] == i && ship[1] == j + 1)
      )
    ) {
      i = Phaser.Math.Between(0, cell_quantity - 1);
      j = Phaser.Math.Between(0, cell_quantity - 2);
    }

    ships_config.push([i, j]);
    ships_config.push([i, j + 1]);

    var ship2 = this.add.sprite(
      x_0 + cell_size * (i + 0.5),
      y_0 + cell_size * (j + 1),
      "ship2"
    );

    ship2.alpha = 0.000001;
    ship2.setInteractive();
    ship2.input.hitArea.setTo(-6, 0, 39, 80);

    let scene = this;
    let winnerText;
    ship2.state = 2;

    ship2.on("pointerdown", function () {
      hit = scene.sound.add("hit", { volume: 0.4 });
      hit.play({
        seek: 2.55,
      });
      if (this.alpha != 1) {
        score++;
        this.state--;

        let i = Math.floor((scene.input.activePointer.x - x_0) / cell_size);
        let j = Math.floor((scene.input.activePointer.y - y_0) / cell_size);

        ///////////////////////////FLOWER//////////////////////////////////////////////////////////

        let flower = scene.add.sprite(
          x_0 + cell_size * (i + 0.5),
          y_0 + cell_size * (j + 0.5),
          "flower"
        );

        flower.setInteractive();

        if (this.state == 0) {
          this.alpha = 1;
        }
        //SCORE TEXT APPENDED TO THE PAGE
        scoreText.setText("score: " + score + " /16");
        // TIMER
        if (score == 16) {
          setTimeout(() => {
            onEvent();
          }, 1000);
          function onEvent() {
            ////////////////////////////////////////FIREWORKS//////////////////////////////////////////

            let newBackground = scene.add.image(400, 300, "waves");
            newBackground.displayWidth = 800;
            newBackground.displayHeight = 600;
            winnerText = scene.add.text(
              100,
              300,
              "YOU WON! ALL SHIPS ARE DEFEATED!",
              {
                fontSize: "32px",
                fill: "#000",
                backgroundColor: "#dffbff",
                fontFamily: "carino_sanssemibold",
              }
            );
            winnerText.setPadding({ x: 15, y: 15 });
            ////////////////////////FIREWORK///////////////////////////////
            addFireworks("firework", scene);
          }
        }
      }
    });
  }
  ////////////////////////////// FLIPPED 2 CELL SHIP/////////////////////////////////////////

  for (let ship_number = 0; ship_number < 3; ship_number++) {
    let i = Phaser.Math.Between(0, cell_quantity - 2);
    let j = Phaser.Math.Between(0, cell_quantity - 1);

    while (
      ships_config.some(
        (ship) =>
          (ship[0] == i && ship[1] == j) || (ship[0] == i + 1 && ship[1] == j)
      )
    ) {
      i = Phaser.Math.Between(1, cell_quantity - 2);
      j = Phaser.Math.Between(0, cell_quantity - 2);
    }

    ships_config.push([i, j]);
    ships_config.push([i + 1, j]);

    var flip_ship = this.add.sprite(
      x_0 + cell_size * (i + 1),
      y_0 + cell_size * (j + 0.5),
      "flip_ship"
    );

    flip_ship.alpha = 0.000001;

    flip_ship.setInteractive();
    flip_ship.input.hitArea.setTo(0, -6, 80, 39);

    // this.input.enableDebug(flip_ship);

    let scene = this;
    let winnerText;
    flip_ship.state = 2;

    flip_ship.on("pointerdown", function () {
      hit = scene.sound.add("hit", { volume: 0.4 });
      hit.play({
        seek: 2.55,
      });
      if (this.alpha != 1) {
        score++;
        this.state--;

        let i = Math.floor((scene.input.activePointer.x - x_0) / cell_size);
        let j = Math.floor((scene.input.activePointer.y - y_0) / cell_size);

        ///////////////////////////FLOWER//////////////////////////////////////////////////////////

        let flower = scene.add.sprite(
          x_0 + cell_size * (i + 0.5),
          y_0 + cell_size * (j + 0.5),
          "flower"
        );

        flower.setInteractive();

        if (this.state == 0) {
          this.alpha = 1;
        }
        //SCORE TEXT APPENDED TO THE PAGE
        scoreText.setText("score: " + score + " /16");
        // TIMER
        if (score == 16) {
          setTimeout(() => {
            onEvent();
          }, 1000);
          function onEvent() {
            let newBackground = scene.add.image(400, 300, "waves");
            newBackground.displayWidth = 800;
            newBackground.displayHeight = 600;
            winnerText = scene.add.text(
              100,
              300,
              "YOU WON! ALL SHIPS ARE DEFEATED!",
              {
                fontSize: "32px",
                fill: "#000",
                backgroundColor: "#dffbff",
                fontFamily: "carino_sanssemibold",
              }
            );
            winnerText.setPadding({ x: 15, y: 15 });
            /////////////////////////////FIREWORK////////////////////////////////////////
            addFireworks("firework", scene);
          }
        }
      }
    });
  }
}

// SCELETON FUNCTION
function addSceleton(sceleton, scene) {
  let framesArray = [];
  for (let num = 0; num < 12; num++) {
    framesArray.push({
      key: sceleton,
      frame: "sceleton/death_00" + num + ".png",
    });
  }
  scene.anims.create({
    key: sceleton,
    frames: framesArray,
    frameRate: 10,
    repeat: -1,
  });
  let sad;
  sad = scene.sound.add("sad", { volume: 0.4 });
  sad.play();
  scene.add.sprite(475, 470, "sceleton").play("sceleton").setScale(0.3, 0.3);
}

//Fireworks function
function addFireworks(firework, scene) {
  let framesArray = [];
  for (let num = 0; num < 27; num++) {
    framesArray.push({
      key: firework,
      frame: "New-folder/firework-" + num.toString(),
    });
  }
  scene.anims.create({
    key: "firework",
    frames: framesArray,
    frameRate: 20,
    repeat: -1,
  });
  setTimeout(() => {
    let cheer;
    cheer = scene.sound.add("kids_cheering", { volume: 0.4 });
    cheer.play();
    doFirework(200, 200, "firework", 2);
  }, 500);
  setTimeout(() => {
    doFirework(400, 500, "firework", 1);
  }, 700);
  setTimeout(() => {
    doFirework(600, 250, "firework", 1.5);
  }, 800);

  function doFirework(x, y, spriteName, scale) {
    scene.add
      .sprite(x, y, spriteName)
      .play(spriteName, true)
      .setScale(scale, scale);
  }
}
