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
  this.load.image("ship1", "./assets/1_ship.png");
  // this.load.spritesheet('dude',
  //       'assets/dude.png',
  //       { frameWidth: 32, frameHeight: 48 }
}


let ships_config = [
  
]


function create() {
  //background
  let background = this.add.image(800, 100, "waves");
  background.displayWidth = 1600;
  background.displayHeight = 1600;

  let cell_size = 32;
  let cell_quantity = 10
  let x_0 = 200;
  let y_0 = 200;

  // grid
  var grid = this.add.grid(
    x_0 + cell_size * cell_quantity / 2, //x
    y_0 + cell_size * cell_quantity / 2, //y
    cell_size*cell_quantity, //width
    cell_size*cell_quantity, //height
    cell_size, //cellWidth
    cell_size, //cellHeight
    0xdffbff,
    1,
    0x000000,
    1
  );

  // this.aGrid = new AlignGrid({scene:this,rows:11,cols:11});
  // this.aGrid.showNumbers

  var x = Phaser.Math.Between(253, 547);
  var y = Phaser.Math.Between(188, 412);
  let i = 7
  let j = 0
  var ship1 = this.add.image(x_0 + cell_size * (i + 0.5), y_0 + cell_size * (j + 0.5), "ship1");
  let ship1_x_size = 22;
  let ship1_y_size = 42;

  ship1.setScale(cell_size / ship1_x_size, cell_size / ship1_y_size);
}

function update() {}
