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
  this.load.image("ship3", "./assets/3_ship.png");
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
    400, //x
    300, //y
    320, //width
    320, //height
    32, //cellWidth
    32, //cellHeight
    0xdffbff,
    1,
    0x000000,
    1
  );

  // this.aGrid = new AlignGrid({scene:this,rows:11,cols:11});
  // this.aGrid.showNumbers

  var x = Phaser.Math.Between(253, 547);
  var y = Phaser.Math.Between(188, 412);
  var ship3 = this.add.image(x, y, "ship3");
  ship3.setScale(0.8, 0.7);
}

function update() {}
