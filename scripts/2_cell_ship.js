export function addTwoCellShip(
  scene,
  ships_config,
  cell_quantity,
  score,
  scoreText,
  x_0,
  y_0,
  cell_size
) {
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

    //Changed var to let
    let ship2 = scene.add.sprite(
      x_0 + cell_size * (i + 0.5),
      y_0 + cell_size * (j + 1),
      "ship2"
    );

    ship2.alpha = 0.000001;
    ship2.setInteractive();
    ship2.input.hitArea.setTo(-6, 0, 39, 80);

    scene.input.enableDebug(ship2);

    // let scene = this;
    let winnerText;
    ship2.state = 2;

    ship2.on("pointerdown", function () {
      if (ship2.alpha != 1) {
        score++;
        ship2.state--;
        console.log(score, "two");

        let i = Math.floor((scene.input.activePointer.x - x_0) / cell_size);
        let j = Math.floor((scene.input.activePointer.y - y_0) / cell_size);

        ///////////////////////////FLOWER//////////////////////////////////////////////////////////

        let flower = scene.add.sprite(
          x_0 + cell_size * (i + 0.5),
          y_0 + cell_size * (j + 0.5),
          "flower"
        );

        flower.setInteractive();

        if (ship2.state == 0) {
          ship2.alpha = 1;
        }

        //SCORE TEXT APPENDED TO THE PAGE
        scoreText.setText("score: " + score + " /10");

        // TIMER
        if (score == 10) {
          setTimeout(() => {
            onEvent();
          }, 2000);

          function onEvent() {
            console.log("You won!");
            let newBackground = scene.add.image(400, 300, "waves");
            newBackground.displayWidth = 800;
            newBackground.displayHeight = 600;
            winnerText = scene.add.text(340, 70, {
              fontSize: "32px",
              fill: "#000",
              backgroundColor: "#dffbff",
              fontFamily: "carino_sanssemibold",
            });
            winnerText.setPadding({ x: 10, y: 5 });
            winnerText.setText("YOU WON! ALL SHIPS ARE DEFEATED!");
          }
        }
      }
    });
  }
}
