//variables and stuff
{
//var isFat = 0
var treasuresFound = 0;
var playerMoveCheck = 0;
var caveRando = 0;
var PCHasTurn = 0;
var PCPosY = 1; /*starting position*/
var PCPosX = 1; /*starting position*/
var PCLastSeenPosY = 0;
var PCLastSeenPosX = 0;
var creaturePosX = 3; /*creature starting position*/
var creaturePosY = 3; /*creature starting position*/
var mood = 0;
var cBrain = 0;
var hasCompass = 0;
var maxWallX = 0;
var maxWallY = 0;
var level = 0;
var score = 0;
var bonusPoints = 0;
var doorPos = new Array (2);
doorPos[0] = 0;
doorPos[1] = 0;
var treasureX = new Array (5);
treasureX[0] = 0;
treasureX[1] = 0;
treasureX[2] = 0;
treasureX[3] = 0;
treasureX[4] = 0;
var treasureY = new Array (5);
treasureY[0] = 0;
treasureY[1] = 0;
treasureY[2] = 0;
treasureY[3] = 0;
treasureY[4] = 0;
document.getElementById("myElement").innerHTML = "Lv.: "+  level;
document.getElementById("myElement2").innerHTML = "Treasure found: "+score;
document.getElementById("myElement3").innerHTML = "Room size: "+maxWallX + 'x' 
 + maxWallY;
document.getElementById("myElement4").innerHTML = "Score: "+ score;
}
var pillarX = new Array (3);
var pillarY = new Array (3);
var difficulty = 0;
function startup () {
  console.log("startup");
  //choose first startup or next level
  if (level == 0)
  {
  difficulty = prompt("Please enter the starting level (suggested: 1) ");
    //good enough for now
    level = difficulty;
    score = 0;
  }
  else
  {
    level ++
    difficulty ++
  }
  treasuresFound = 0;
  PCHasTurn = 1;
  PCPosY = 1;
  PCPosX = 1;
  PCLastSeenPosY = 0;
  PCLastSeenPosX = 0;
  creaturePosX = 4;
  creaturePosY = 4;
  mood = 0;
  cBrain = 0;
  hasCompass = 1;
  maxWallX = (level*2)+3;
  maxWallY = (level*2)+3;
  
  treasureX[0]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  treasureY[0]=Math.floor(Math.random() *(maxWallY - 1) + 1);
  
  treasureX[1]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  treasureY[1]=Math.floor(Math.random() *(maxWallY - 1) + 1);
  
  treasureX[2]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  treasureY[2]=Math.floor(Math.random() *(maxWallY - 1) + 1);
  
  treasureX[3]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  treasureY[3]=Math.floor(Math.random() *(maxWallY - 1) + 1);
  
  treasureX[4]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  treasureY[4]=Math.floor(Math.random() *(maxWallY - 1) + 1);
  
  doorPos[0]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  doorPos[1]=Math.floor(Math.random() *(maxWallY - 1) + 1);
  
  document.getElementById("myElement").innerHTML = "Lv.: "+ level;
  document.getElementById("myElement2").innerHTML = "Treasures found: "+ treasuresFound;
  document.getElementById("myElement4").innerHTML = "Score: "+ score;
  
  document.getElementById("myElement3").innerHTML = "Room size: "+maxWallX + 'x' 
   + maxWallY;
  
  pillarX[0]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  pillarX[1]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  
  pillarY[0]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  pillarY[1]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  if (level > 3){
  pillarY[2]=Math.floor(Math.random() *(maxWallX - 1) + 1);
  pillarX[2]=Math.floor(Math.random() *(maxWallX - 1) + 1);
}
else
  {pillarY[2] = 0;
  pillarX[2] = 0;
  }
  console.log("startup complete");}

/*PLAYERS ACTIONS*/
{

//slow moves
function PCLook () {
  if (PCHasTurn > 0) {
  console.log ('looked around')
    PCHasTurn--
    /*near or on*/
    if (Math.abs(creaturePosY - PCPosY) <= 1 && Math.abs(creaturePosX - PCPosX) <= 1) {
      alert ('You see a creature in the distance.')
      if (mood == 2)
      {
        alert ('It seems curious and continues to watch you.')
      }
      /*on (in room)*/
  if (Math.abs(creaturePosY - PCPosY) == 0 && Math.abs(creaturePosX - PCPosX) == 0) {
    /*movement*/
        if (mood == 1 || mood == 2) {
        alert ('The creature is right in front of you.')
      creatureMoveRando();
      }
      else if (mood == 3){alert ('The creature appears behind you. You scream and die.')}}}
    /*not near or on*/
    else {
      alert ('You see nothing around you.')
    }
    //too heavy? creature moves twice
    if (score+hasCompass > difficulty) {
      creatureTurn();
      console.log ('EXTRA TURN creature');
    }
  creatureTurn();
  }
  else {alert ('start the game, stinky')}

}
function movePCNorth () {
  playerMoveCheck = 1;
  playerMove();
}
function movePCEast () {
  playerMoveCheck = 2;
  playerMove();
}
function movePCSouth () {
  playerMoveCheck = 3;
  playerMove();
}
function movePCWest () {
  playerMoveCheck = 4;
  playerMove();
}
//fast moves
function useCompass() {
  if (hasCompass >= 0) {
    alert('you are: X ' + PCPosX + ', Y ' + PCPosY + '. The Exit is at X '+ doorPos[0] + ', Y ' + doorPos[1] + '. You have ' + hasCompass + ' compasses left.');
    hasCompass--;
    /*ADMIN , the creature last saw you at: X ' + PCLastSeenPosX + ', Y ' + PCLastSeenPosY +', you have ' + hasCompass + ' compasses left.'*/
  } else {
    alert("You don't have a compass!");
  }
}
function PCInteract () {
    console.log("PCInteract");
      if (PCPosX == treasureX[0] && PCPosY == treasureY[0]) {
          alert ('you grab a treasure off the ground. +1 point.');
          treasureX[0] = 0;
          treasureY[0] = 0;
          treasuresFound++;   document.getElementById("myElement2").innerHTML = "Treasure found: "+treasuresFound;
        }
      else if (PCPosY == treasureY[1] && PCPosX == treasureX[1]) {
          console.log("PCInteract: treasure found");
          alert ('you grab a treasure off the ground.');
          treasureX[1] = 0;
          treasureY[1] = 0;
          treasuresFound++;   document.getElementById("myElement2").innerHTML = "Treasure found: "+treasuresFound;
  }
      else if (PCPosX == treasureX[2] && PCPosY == treasureY[2]) {
          alert ('you grab a treasure off the ground.');
          treasureX[2] = 0;
          treasureY[2] = 0;
          treasuresFound++;   document.getElementById("myElement2").innerHTML = "Treasure found: "+treasuresFound;
        }
      else if (PCPosX == treasureX[3] && PCPosY == treasureY[3]) {
          alert ('you grab a treasure off the ground.');
          treasureX[3] = 0;
          treasureY[3] = 0;
          treasuresFound++;   document.getElementById("myElement2").innerHTML = "Treasure found: "+treasuresFound;
        }
      else if (PCPosX == treasureX[4] && PCPosY == treasureY[4]) {
          alert ('you grab a treasure off the ground.');
          treasureX[4] = 0;
          treasureY[4] = 0;
          treasuresFound++;
        document.getElementById("myElement2").innerHTML = "Treasure found: "+treasuresFound;
        }
        else if (PCPosX == doorPos[0] && PCPosY == doorPos[1]) {
          //NEXT LEVEL
          bonusPoints = Math.floor ((treasuresFound-1) * (treasuresFound) / 2);
          score = score + bonusPoints + treasuresFound;
      alert("you escaped the caves. FINAL SCORE: " + score + ". +" + treasuresFound + " from treasures on this level. +" + bonusPoints + " bonus for being so cool. TO THE NEXT LEVEL WOOO");
          startup ();
        }
      else {
        ('theres nothing here for you to interact with.');
      }
  }
function useCompassDEV () {
alert('you are: X ' + PCPosX + ', Y ' + PCPosY + '. The creature is: X ' + creaturePosX + ', Y ' + creaturePosY + '. CREATURE MOOD: ' + mood + ' You have ' + hasCompass + ' compasses left. The creature last saw you at: X ' + PCLastSeenPosX + ', Y ' + PCLastSeenPosY +'. The treasure 1 is at: X ' + treasureX[0] + ', Y ' + treasureY[0] + '. The treasure 2 is at: X ' + treasureX[1] + ', Y ' + treasureY[1] + ', the door is at X ' + doorPos[0] + ', Y ' + doorPos[1] + '. PILLARS: X ' + pillarX[0] + ', Y ' + pillarY[0] + ', X ' + pillarX[1] + ', Y ' + pillarY[1] + ',X ' + pillarX[2] + ', Y ' + pillarY[2] + '.');

  }
}

/* CREATURES TURN + OTHER STUFF */
{
function creatureTurn() {PCHasTurn = 1;
//  if (score+hasCompass > difficulty && isFat <= 0)
//  {
//    isFat ++;
//    alert ("you are heavy, you now walk slower. womp womp :(");
//  }
  console.log ('creature makes a move')
  /* SLEEPING */
  if (mood == 0) {
    if (cBrain < 3) {
      console.log ('creature is sleeping');
      cBrain ++;}
    else
      {
        console.log ('creature is awake');
        alert ('something awakens in the dark')
        cBrain = 0;
        mood = 1;
      }
    
  }
  /* WANDERING */
  if (mood == 1) {
    /*is it near?*/
    if (Math.abs(creaturePosY - PCPosY) <= 1 && Math.abs(creaturePosX - PCPosX) <= 1) {
      console.log("The creature is nearby!--wandering--");
      mood = 2;
      PCLastSeenPosY = PCPosY;
      PCLastSeenPosX = PCPosX;
    }
    else {
      /*move randomizer for wandering*/
      var creatureMoveRandom = Math.floor(Math.random() * 4) + 1;
      if (creatureMoveRandom == 1) {
      if (creaturePosY < maxWallY) {
        console.log("Creature moved north");
        creaturePosY++;
      }
    } else if (creatureMoveRandom == 2) {
        if (creaturePosX < maxWallX) {
        console.log("Creature moved east");
        creaturePosX++;
      }
      } else if (creatureMoveRandom == 3) {
        if (creaturePosY > 1) {
        console.log("Creature moved south");
        creaturePosY--;
      }
      } else if (creatureMoveRandom == 4) {
        if (creaturePosX > 1) {
        console.log("Creature moved west");
        creaturePosX--;
      }
      } else {
        console.log("Creature can't move in this direction");
      }
    }
  }
  /* CAUTIOUS */
  if (mood == 2) {
    if (cBrain < 6) {
      if (Math.abs(creaturePosY - PCPosY) == 1 && Math.abs(creaturePosX - PCPosX) == 1 || Math.abs(creaturePosY - PCPosY) == 2 && Math.abs(creaturePosX - PCPosX) == 2) { /*is it near?--not in room--*/
      console.log("The creature is nearby!--cautious--");
    PCLastSeenPosY = PCPosY;
    PCLastSeenPosX = PCPosX;
    }
    else if (Math.abs(creaturePosY - PCPosY) == 0 && Math.abs(creaturePosX - PCPosX) == 0) { /*is it in the room?*/
      console.log("The creature is in the room!");
      cBrain++;
      cBrain++;
      } else {
      console.log("The creature moves 2 PC last seen");
      creaturePosY = PCLastSeenPosY;
      creaturePosX = PCLastSeenPosX;
      if (Math.abs(creaturePosY - PCPosY) == 1 && Math.abs(creaturePosX - PCPosX) == 1) /*is it near?*/ {
        console.log("The creature is nearby!--cautious2--");
        PCLastSeenPosY = PCPosY;
        PCLastSeenPosX = PCPosX;
      }
      else {mood = 1;}
    }
    }
    else {
      mood = 3;
      cBrain = 0;
    }
  }
  /* HUNTING */
if (mood == 3) {
  if (Math.abs(creaturePosY - PCPosY) == 1 && Math.abs(creaturePosX - PCPosX) == 1 || Math.abs(creaturePosY - PCPosY) == 2 && Math.abs(creaturePosX - PCPosX) == 2) { /*is it near?--not in room--*/
 console.log("The creature is nearby!--hunting--");
  CreaturePosY = PCPosY;
  CreaturePosX = PCPosX;
  cBrain++
  }
  else if (Math.abs(creaturePosY - PCPosY) == 0 && Math.abs(creaturePosX - PCPosX) == 0) 
  { /*is it in the room?*/
  console.log("The creature is in the room!");
  if (cBrain> 10){
    alert ('you died L skill issue')
  }
    else {
  cBrain++;
  cBrain++;
    }
  } else {
  console.log("The creature moves 2 PC last seen/stayed still");
  creaturePosY = PCLastSeenPosY;
  creaturePosX = PCLastSeenPosX;
  PCLastSeenPosY = PCPosY;
  PCLastSeenPosX = PCPosX;
  }
PCLastSeenPosY = PCPosY;
PCLastSeenPosX = PCPosX;
}
}
  
function scanItems () /*check 4 items or room stuff*/{
  if (PCPosX === doorPos[0] && PCPosY === doorPos[1]) {
  alert('You found the exit! You may leave now or find more treasures.');

  }
  if (PCPosY === treasureY[0] && PCPosX === treasureX[0]) {
  alert('You found a treasure!');
  }
  if (PCPosY === treasureY[1] && PCPosX === treasureX[1]) {
  alert('You found a treasure!');
  }
    if (PCPosY === treasureY[2] && PCPosX === treasureX[2]) {
    alert('You found a treasure!');
    }
    if (PCPosY === treasureY[3] && PCPosX === treasureX[3]) {
    alert('You found a treasure!');
    }
    if (PCPosY === treasureY[4] && PCPosX === treasureX[4]) {
    alert('You found a treasure!');
    }
  }

function creatureMoveRando (){
    var randomNum = Math.floor(Math.random() * 8) - 4;
    cBrain += randomNum;
          /*move randomizer for wandering cuz in room*/
            var creatureMoveRandom = Math.floor(Math.random() * 4) + 1;
            if (creatureMoveRandom == 1) {
            if (creaturePosY < maxWallY) {
              alert ('the creature ran north')
              creaturePosY++;
            }
          } else if (creatureMoveRandom == 2) {
              if (creaturePosX < maxWallX) {
                alert ('the creature ran east')
              creaturePosX++;
            }
            } else if (creatureMoveRandom == 3) {
              if (creaturePosY > 1) {
                alert ('the creature ran south')
              creaturePosY--;
            }
            } else if (creatureMoveRandom == 4) {
              if (creaturePosX > 1) {
                alert ('the creature ran west')
              creaturePosX--;
            }
            } else {
              console.log("Creature can't move in this direction");
            }
  }
function playerMove() {
  //pillar checks
  console.log ("players turn happens")
if (PCPosX+1 === pillarX[0] && PCPosY === pillarY[0] && playerMoveCheck ===2)
{
  alert ("a piller blocks your way. you can't move East.");
}
else if (PCPosX === pillarX[0] && PCPosY+1 === pillarY[0] && playerMoveCheck === 1)
  {
    alert ("a piller blocks your way. you can't move North.");
  }
  else if
    (PCPosX === pillarX[0] && PCPosY-1 === pillarY[0] && playerMoveCheck === 3)
    {
      alert ("a piller blocks your way. you can't move South.");
    }
  else if (PCPosX-1 === pillarX[0] && PCPosY === pillarY[0] && playerMoveCheck === 4)
    {
      alert ("a piller blocks your way. you can't move West.");
    }
    else if (PCPosX+1 === pillarX[1] && PCPosY === pillarY[1] && playerMoveCheck ===2)
    {
      alert ("a piller blocks your way. you can't move East.");
    }
    else if (PCPosX === pillarX[1] && PCPosY+1 === pillarY[1] && playerMoveCheck === 1)
      {
        alert ("a piller blocks your way. you can't move North.");
      }
      else if
        (PCPosX === pillarX[1] && PCPosY-1 === pillarY[1] && playerMoveCheck === 3)
        {
          alert ("a piller blocks your way. you can't move South.");
        }
      else if (PCPosX-1 === pillarX[1] && PCPosY === pillarY[1] && playerMoveCheck === 4)
        {
          alert ("a piller blocks your way. you can't move West.");
        }
        else if (PCPosX+1 === pillarX[2] && PCPosY === pillarY[2] && playerMoveCheck ===2)
        {
          alert ("a piller blocks your way. you can't move East.");
        }
        else if (PCPosX === pillarX[2] && PCPosY+1 === pillarY[2] && playerMoveCheck === 1)
          {
            alert ("a piller blocks your way. you can't move North.");
          }
          else if (PCPosX === pillarX[2] && PCPosY-1 === pillarY[2] && playerMoveCheck === 3)
            {
              alert ("a piller blocks your way. you can't move South.");
            }
          else if (PCPosX-1 === pillarX[2] && PCPosY === pillarY[2] && playerMoveCheck === 4)
            {
              alert ("a piller blocks your way. you can't move West.");
            }
    //actual move, no pillars that way :)
else  {
{
  
  if (playerMoveCheck == 1) //move NORTH
  {
      if (PCPosY < maxWallY) {
        PCHasTurn--;
        PCPosY++;
        console.log('moved north');
        scanItems();

      //too heavy? creature moves twice
        if (score > (difficulty*-1) +4) {
          creatureTurn();
          console.log ('EXTRA TURN creature');
        }
      creatureTurn();} else {
        alert("You can't go any further north");
      }
  }
  else if (playerMoveCheck == 2)//move EAST
  {
    
    if (PCPosX < maxWallX)
    {
    PCHasTurn--
    PCPosX++;
      console.log ('moved east');

      scanItems();
      //too heavy? creature moves twice
        if (score > (difficulty*-1) +4) {
          creatureTurn();
          console.log ('EXTRA TURN creature');
        }
    creatureTurn();}
      else {alert("You can't go any further east");}
    }
  else if (playerMoveCheck == 3) // move SOUTH
  {

    if (PCPosY > 1)
    {
    PCPosY--;
    PCHasTurn--
    console.log ('moved south');
      scanItems();
    //too heavy? creature moves twice
      if (score > (difficulty*-1) +4) {
        creatureTurn();
        console.log ('EXTRA TURN creature');
      }
    creatureTurn();}
    else
    {
      alert("You can't go any further south!");
    } 
  }
  else if (playerMoveCheck == 4)  //move WEST
  {
   
    if (PCPosX > 1){
    PCHasTurn--
    PCPosX--;
      console.log ('moved west');
      scanItems();
      //too heavy? creature moves twice
        if (score > (difficulty*-1) +4) {
          creatureTurn()
          console.log ('EXTRA TURN creature');
        }
      creatureTurn();}
    else{
      alert("You can't go any further west!");
    }
  }
}
}
}}
//i just wanted the start button and finding a door to be different, but not that i couldnt add other uses for startup later
function trueStartup () 
{
  level = 0;
  startup ();
}
