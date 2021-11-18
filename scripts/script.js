var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
}
};

var game = new Phaser.Game(config);

function preload() {
  // this.load.image("sky", "assets/skies/space3.png");
}

function create() {

}

function update ()
{
}