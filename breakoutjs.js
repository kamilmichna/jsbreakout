const canva = document.getElementById('game_canvas')
const canvas = canva.getContext('2d');
const pointsContainer = document.getElementById('points');
const lifesContainer = document.getElementById('lifes');
'use strict'
let gameData = {
    points: 0,
    gameFinished: false,
    gameFailed: false,
    lifeCounter: 3,
}
class Elements {
    constructor(position_x, position_y, width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.position_x = position_x;
        this.position_y = position_y;
    }
}

class Player extends Elements {
    constructor(position_x, position_y, width, height, color) {
        super(position_x, position_y, width, height, color);
        this.clickHandle();
    }
    clickHandle() {
        document.addEventListener('keydown', (e) => {
            let code = e.keyCode;
            switch (code) {
                case 37:
                    if (this.position_x >= 0) {
                        this.position_x -= 40;
                    }
                    break;

                case 39:
                    if (this.position_x < canva.width - this.width) {

                        this.position_x += 40;
                    }
                    break;


            }
        })
    }

}

class StaticElements extends Elements {
    constructor(position_x, position_y, width, height, color) {
        super(position_x, position_y, width, height, color);
        this.collisionHandle();
        this.display = true;
    }

    collisionHandle() {

        setInterval(() => {
            if (this.display != false) {
                if (ball.position_y + ball.height >= this.position_y && ball.position_y <= this.position_y + this.height && ball.position_x >= this.position_x && ball.position_x <= this.position_x + this.width) {
                    ball.velocity_y *= -1;
                    this.display = false;
                    gameData.points+=1;

                }

            }
        }, 1000 / 60)


    }
}




class Ball extends Elements {
    constructor(position_x, position_y, width, height, color, velocity) {
        super(position_x, position_y, width, height, color);
        this.velocity = velocity / 10;
        this.velocity_x = this.velocity;
        this.velocity_y = this.velocity;
        this.move();



    }
    move() {


        setInterval(() => {
            this.wallCollision();
            this.position_x += this.velocity_x;
            this.position_y += this.velocity_y;
        }, 1000 / 60)

    }
    wallCollision() {
        if (this.position_x >= canva.width - this.width || this.position_x <= 0) {
            this.velocity_x *= -1;
        } else if (this.position_y >= canva.height - this.height) {
            if (gameData.lifeCounter > 1){
                gameData.lifeCounter--;
                this.velocity_y *= -1;         
            }
            else{
                document.querySelector('#loose').style.opacity="1";
            }
        } 
        else if (this.position_y <= 0){
            this.velocity_y *= -1;
        }
        else if (this.position_y >= player.position_y - this.height && this.position_x >= player.position_x && this.position_x <= player.position_x + player.width) {
            this.velocity_y *= -1;
        }

    }
 

}



let player = new Player(340, 580, 250, 20, 'red'); /* initialize player and ball */
let ball = new Ball(400, 550, 20, 20, "green", 60)


let objects = []; /*Array of all objects in game , kinematics and statics */
let staticObjects = [
    /*Array of all static objects, such blocks, just use "new StaticElements(etc),"*/
    new StaticElements(20, 50, 50, 50, 'blue'),
    new StaticElements(120, 50, 50, 50, 'blue'),
    new StaticElements(220, 50, 50, 50, 'blue'),
    new StaticElements(320, 50, 50, 50, 'blue'),
    new StaticElements(420, 50, 50, 50, 'blue'),
    new StaticElements(520, 50, 50, 50, 'blue'),
    new StaticElements(620, 50, 50, 50, 'blue'),
    new StaticElements(720, 50, 50, 50, 'blue'),
    new StaticElements(20, 150, 760, 50, 'green'),
    new StaticElements(20, 250, 200, 50, 'green'),
    new StaticElements(320, 250, 200, 50, 'green'),
    new StaticElements(580, 250, 200, 50, 'green'),


];

objects.push(player);
objects.push(ball);
objects.push(...staticObjects)

function checkIfGameIsDone(){
    if (gameData.gameFinished === false){
        let done = true;
        staticObjects.map(el=>{
            if (el.display === true){
                done = false;
            }
        })
        if (done === true){
            gameData.gameFinished = true;
            document.querySelector('#win').style.opacity="1";
        }
    }
}
function mainLoop() {
    canvas.clearRect(0, 0, canva.width, canva.height);
    checkIfGameIsDone();
    lifesContainer.textContent = `Pozostałe życia: ${gameData.lifeCounter}`;
    pointsContainer.textContent = `Liczba trafień: ${gameData.points}`;
    for (let x = 0; x < objects.length; x++) {
        if (objects[x].display != false) {
            canvas.fillStyle = objects[x].color;
            canvas.fillRect(objects[x].position_x, objects[x].position_y, objects[x].width, objects[x].height);
        }
    }

    window.requestAnimationFrame(mainLoop)

}

mainLoop();


