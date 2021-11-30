export function addOneCellShip(
  scene,
  ships_config,
  cell_size,
  ship1_y_size,
  total_number_ships1,
  cell_quantity,
  x_0,
  y_0,
  score,
  scoreText
) {
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

    let ship1 = scene.add.sprite(
      x_0 + cell_size * (i + 0.5),
      y_0 + cell_size * (j + 0.5),
      "ship1"
    );

    //ship image is scaled to fit into the cell
    ship1.setScale((0.9 * cell_size) / ship1_y_size);
    ship1.setInteractive();

    ship1.alpha = 0.000001;
    ship1.input.hitArea.setTo(-7, 3, 36, 36);

    scene.input.enableDebug(ship1);

    let winnerText;
    // let delay;
    ship1.on("pointerdown", function () {
      if (ship1.alpha != 1) {
        score++;
        ship1.alpha = 1;
        scoreText.setText("score: " + score + " /10");
        console.log(score, "one");

        if (score == 10 ) {
          setTimeout(() => {
            onEvent();
          }, 1000);
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
