var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  // backgroundColor: "#AFD0DB",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

// An instance of a Phaser.Game object is assigned to a local variable called game and the configuration object is passed to it. This will start the process of bringing Phaser to life.
var game = new Phaser.Game(config);

function preload() {
  this.load.image("waves", "./assets/waves.jfif");
  // this.load.spritesheet('dude',
  //       'assets/dude.png',
  //       { frameWidth: 32, frameHeight: 48 }
}

function create() {
  //background
  let background = this.add.image(800, 100, "waves");
  background.displayWidth = 1600;
  background.displayHeight = 1600;

  // grid
  var grid = this.add.grid(
    300,
    300,
    320,
    320,
    32,
    32,
    0xdffbff,
    1,
    0x000000,
    1
  );
}

function update() {}
