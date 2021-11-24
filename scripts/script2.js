var config = {
  type: Phaser.WEBGL,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
  },
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("pic", "./assets/1_ship.png");
}

function create() {
  // var sprite = this.add.sprite(400, 300, "pic").setInteractive();

  // var text = this.add.text(10, 10, "Tap the Sprite", {
  //   font: "16px Courier",
  //   fill: "#00ff00",
  // });

  // var text2 = this.add.text(10, 100, Phaser.VERSION + " + v2", {
  //   font: "16px Courier",
  //   fill: "#ffffff",
  // });

  // sprite.on("pointerdown", function () {
  //   this.setTint(Math.random() * 16000000);

  //   text.setText("DOWN");
  // });

  // sprite.on("pointerup", function () {
  //   text.setText("UP");
  // });

  // this.input.enableDebug(sprite);

  // var sprite1 = this.add.sprite(450, 300, "pic").setInteractive();
  // sprite1.on("pointerdown", function () {
  //   this.setTint(Math.random() * 16000000);

  //   text.setText("DOWN");
  // });
  // this.input.enableDebug(sprite1);

  var sprite2 = this.add.sprite(1, 300, "pic").setInteractive();
  sprite2.on("pointerdown", function () {
    this.setTint(Math.random() * 16000000);

    text.setText("DOWN");
  });
  this.input.enableDebug(sprite2);
}
