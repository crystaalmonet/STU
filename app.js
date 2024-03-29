let playButton = document.getElementById("play-button")
let myScore = document.getElementById("playerScore")
let alienScore = document.getElementById("alien-Score")
let retreatButton = document.getElementById("retreat-button")
let msgBox = document.getElementById("messages") 
let resumeBtn = document.getElementById("resume-button")


resumeBtn.addEventListener("click", () => {
    play(shipNum);
})


class Ship {
    constructor(name, hull, firepower, accuracy, isAlive){
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.isAlive = true;
    }
    attack (target) {
        let randomNum = Math.random();
        
        if (randomNum < 0.7) {    
            console.log("Nice! You hit the alien ship!");
            msgBox.textContent = "Nice! You hit the alien ship!";
            target.hull = target.hull - this.firepower;
            console.log(`Alien has ${target.hull} hull points left.`)
            msgBox.textContent = `Alien has ${target.hull} hull points left. Press resume to keep fighting or retreat.`;
            
            if (target.hull <= 0) {
                target.isAlive = false;
                console.log(`You destroyed the ship!!! Good Job!`)
                msgBox.textContent = "Awesome! You destroyed the alien ship! Good Job!"
            }
        }
        else {
            console.log(`The Aliens Evaded Your Attack!`)
        }
    }
    retreat () {
        console.log("You have been defeated. Try Again!")
        myScore.textContent = "GAME OVER"
        alienScore.textContent = "ALIENS TAKE OVER!"
        msgBox.textContent = "You retreated. The aliens have taken over and you have been defeated. Restart to try again."
    }
}


let myShip = new Ship("USS Pinkybear", "15", "5",".7");


class alienShip {
    constructor() {
        this.name = "alienShip";
        this.hull = Math.floor((Math.random() * 4) + 3);
        this.firepower = Math.floor((Math.random() * 3) + 2);
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
        this.isAlive = true;
    }
    alienAttack (target) {
        let randomNum = Math.random();
        if (randomNum < this.accuracy) {

            console.log("You've been Hit! -" + this.firepower + " damage to your hull")
            target.hull = target.hull - this.firepower;
            console.log(`You have ${target.hull} hull points left.`)
            msgBox.textContent = msgBox.textContent = "You have " + myShip.hull + " points left. Resume or retreat."
           
            if (target.hull <= 0) {
                target.isAlive = false;
            }
        }
        else {
            console.log(`Evaded alien attack...Recalibrating Lasers..`)
        }
    }
}

    for(let i = 0; i < 6; i++) {
        alienShips[i] = new alienShip;
    }


function battle (myShip, alienShip) {
    while (myShip.isAlive && alienShip.isAlive) {
        if(alienShip.isAlive) {
            myShip.attack(alienShip);
            alienShip.alienAttack(myShip);
            if (myShip.hull < 5 && myShip.hull > 0 && alienShip.isAlive === true)  {
                console.log("Retreat? You are low on hull points.")
                return false;
            } else {
            return true;
            }
        }

    } 
}

console.log(myShip);
console.log(alienShips)
console.log("Hello Space Captain! Your mission is to destroy all Alien Spaceships. Press the Play Button!")
msgBox.textContent = "Hello Space Captain! Your mission is to destroy all alien spaceships. Open the console and press play! Have fun and good luck!"



let shipNum;


function play (num = 0) {
    console.log("YOU GOT THIS! GET THOSE ALIENS!");
    for(let i=num; i < 6; i++) {
        let resume = battle(myShip, alienShips[i]);
        if (resume === false) {
            shipNum = i;
            break;
        } else {
            continue;
        }
    }
    if(myShip.isAlive === true && alienShips[5].hull <= 0) {
        console.log("You've WON! All Ships Destroyed!")
        msgBox.textContent = "YOU ELIMINATED ALL ALIEN SHIPS!!! YOU WIN!!! YAY!!! SPACE IS SAFE!"
        myScore.textContent = "YOU WIN!"
        alienScore.textContent = "ALIENS DED!"
    } 
    else if (myShip.isAlive === false) {
        console.log("You died. Game Over. Restart to try again.")
        myScore.textContent = "GAME OVER"
        alienScore.textContent = "ALIENS WIN"
        msgBox.textContent = "Game Over. Aliens took over the universe. Restart to try again!"
    }
}


