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
  this.load.image("waves", "./assets/pattern.jpg");
  this.load.image("ship1", "./assets/1_ship.png");
  this.load.image("ship2", "./assets/1_ship_2.png");
  this.load.image("ship3", "./assets/1_ship_3.png");
  // this.load.spritesheet('dude',
  //       'assets/dude.png',
  //       { frameWidth: 32, frameHeight: 48 }
}


let ships_config = [
  
]


function create() {
  //background
  let background = this.add.image(400, 300, "waves");
  background.displayWidth = 800;
  background.displayHeight = 600;
  let cell_size = 32;
  let cell_quantity = 10
  let x_0 = 250;
  let y_0 = 170;

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

  // var x = Phaser.Math.Between(253, 547);
  // var y = Phaser.Math.Between(188, 412);
  let i = Phaser.Math.Between(0, 9);
  let j = Phaser.Math.Between(0, 9);
  let k = Phaser.Math.Between(0, 9);
  let l = Phaser.Math.Between(0, 9);
  let m = Phaser.Math.Between(0, 9);
  let n = Phaser.Math.Between(0, 9);
  function noOverlapping (){
    if (i === j || i === k || i === l || i === m || i === n){
      if (i === 0 || j === 0|| k === 0 || l === 0 || m === 0 || n === 0){
        i++
      };
      if (i === 9 || j === 9|| k === 9 || l === 9 || m === 9 || n === 9){
        i--
      }else{
        i++
      }
    };
  }
  
  noOverlapping ();
  var ship1 = this.add.image(x_0 + cell_size * (i + 0.5), y_0 + cell_size * (j + 0.5), "ship1");
  var ship2 = this.add.image(x_0 + cell_size * (k + 0.5), y_0 + cell_size * (l + 0.5), "ship2");
  var ship3 = this.add.image(x_0 + cell_size * (m + 0.5), y_0 + cell_size * (n + 0.5), "ship3");
  let ship1_x_size = 22;
  let ship1_y_size = 42;
  let ship2_x_size = 22;
  let ship2_y_size = 42;
  let ship3_x_size = 22;
  let ship3_y_size = 42;


  ship1.setScale(cell_size / ship1_x_size, cell_size / ship1_y_size);
  ship2.setScale(cell_size / ship2_x_size, cell_size / ship2_y_size);
  ship3.setScale(cell_size / ship3_x_size, cell_size / ship3_y_size);
  ship1.alpha = 0.5;
  ship2.alpha = 0.5;
  ship3.alpha = 0.5;


ship1.setInteractive().on('pointerdown', function(pointer){
  ship1.alpha = 1;
});
ship2.setInteractive().on('pointerdown', function(pointer){
  ship2.alpha = 1;
});
ship3.setInteractive().on('pointerdown', function(pointer){
  ship3.alpha = 1;
});

}
function update() {}
