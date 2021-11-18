//start the game
//computer sets the ships
//game asks you to guess first
//chose a grid location
//"Hit!", "Miss!", "You sank my battleship!"
//game ends by displaying the rating

//declare variables to hold the location of each cell of each ship. 
//declare a variable to hold the user's current guess. guess = MouseClick or Enter. Controls by arrows and ADWS
//declare a variable to hold the number of hits. Set it to 0. Call it hits
//declare a variable to hold the number of guesses. Set to 0. Call it guesses
//declare a variable to trach of whether the ship is sunk or not for each ship. Call it isSunk. Set to false.
//LOOP: while the ship is not sunk. while (isSunk == false)
    //GET the user's guess. 
    //COMPARE the user's input to valid input values. if (guess<0 || guess>9){alert enter a valid number} else{guesses=guesses+1}
    //IF the user's guess is invalid,
        //TELL user to enter a valid number
    //ELSE
        //ADD 1 to guesses
        //IF the user's guess matches the location. if (guess==matchedLocation){hits=hits+1, alert "Hit!"}
            //ADD 1 to the number of hits
            //IF number of hits is 3. if (hits == 3) {isSunk = true, alert "You sank my battleship!"} 
              //SET isSunk to true
              //TELL user that the battleship is sunk
            //END IF
        //END IF
    //END ELSE
//END LOOP
//TELL statistics


//MODEL MODEL MODEL MODEL MODEL MODEL MODEL MODEL MODEL MODEL MODEL MODEL 
//boardSize
//shipsNumber
//ships - location and hits
//shipsSunk how many is sunk
//shipLength - the number of locations in rach ship
//fire - a method to fire on a ship and figure out if it was a hit or miss
//update()

//HOW TO REPRESENT A SHIP

var model = {
    boardSize:10,
    shipsNumber:3,
    shipLength:3, 
    shipsSunk:0,
    ships:
       [{locations:["A0","B0","C0"], hits:["","","hit"]},
        {locations:["A0","B0","C0"], hits:["","","hit"]},
        {locations:["A0","B0","C0"], hits:["","","hit"]}]
}
