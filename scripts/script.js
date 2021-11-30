import { addOneCellShip } from './1_cell_ship.js';
import { addTwoCellShip } from './2_cell_ship.js';
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
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
  this.load.image("ship1", "./assets/1_ship.png");
  this.load.image("ship2", "./assets/2_ship.png");
  this.load.image("splash", "./assets/water_splash.png");
  this.load.image("flower", "./assets/flower.png");
  this.load.image("ship_with_flower", "./assets/2ship_with_flower.png");
}

let ships_config = [];
let splash_config = [];
let score = 0;
let scoreText;
let shotCounter = 0;
let attemptText;

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
  scoreText = this.add.text(328, 70, `score: ${score} /10`, {
    fontSize: "32px",
    fill: "#000",
    backgroundColor: "#dffbff",
    fontFamily: 'carino_sanssemibold',
  });

  //Attempts
  attemptText = this.add.text(260, 530, `attempts: ${shotCounter} /20`, {
    fontSize: "32px",
    fill: "#000",
    backgroundColor: "#dffbff",
    fontFamily: 'carino_sanssemibold',
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
      if (this.alpha != 1) {
        shotCounter++;
        this.alpha = 1;
        console.log(shotCounter);
        //setting attempts here????????????????????????????????????????????????????????
        attemptText.setText("attempts: " + shotCounter + " /20");
      }
      if (shotCounter == 2) {
        setTimeout(() => {onEvent()}, 500);
        function onEvent(){
        console.log("You lost!");
        let newBackground = scene.add.image(400, 300, "waves");
        newBackground.displayWidth = 800;
        newBackground.displayHeight = 600;;
        loserText = scene.add.text(340, 70, {
          fontSize: "32px",
          fill: "#000",
          backgroundColor: "#dffbff",
          fontFamily: 'carino_sanssemibold',
        });
        loserText.setPadding({ x: 10, y: 5 });
        loserText.setText("YOU LOST! ALL SHIPS ARE STILL FLOATING!");
      }}
    });
    ///////////////////////TEXT FOR SHOOT COUNTER/////////////////////////////////
    
    
  }
//////////////////////////////1 CELL SHIP/////////////////////////////////////////
  let i;
  let j;
  let scene = this;



 addOneCellShip(scene, ships_config, cell_size, ship1_y_size, total_number_ships1, cell_quantity, x_0 , y_0,  score, scoreText);

//////////////////////////////2 CELL SHIP/////////////////////////////////////////
 addTwoCellShip(scene, ships_config, cell_quantity, score, scoreText, x_0, y_0, cell_size);

  
 console.log(document)
}

