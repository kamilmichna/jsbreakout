const canva = document.getElementById('game_canvas')
const canvas = canva.getContext('2d');


class Elements{
    constructor(position_x,position_y,width,height,color){
        this.width = width;
        this.height = height;
        this.color = color;
        this.position_x = position_x;
        this.position_y = position_y;
    }
}

class Player extends Elements{
    constructor(position_x,position_y,width,height,color){
        super(position_x,position_y,width,height,color);
        this.clickHandle();
   }
    clickHandle(){
        document.addEventListener('keydown',(e)=>{
            let code = e.keyCode;
            switch(code){
                case 37:
                    if (this.position_x!=0){
                        this.position_x -= 20;
                    }
                    break;
           
                case 39:
                    if (this.position_x<canva.width-this.width){

                        this.position_x += 20;
                    }
                    break;
         
                
            }
        })
    }
  
}

class StaticElements extends Elements{
       constructor(position_x,position_y,width,height,color){
            super(position_x,position_y,width,height,color);
            this.collisionHandle();
            this.display = true;
       }

       collisionHandle(){
            
                /* works , but its To-do
                this.display=false;*/
                
            
       }
}

class Ball extends Elements{
    constructor(position_x,position_y,width,height,color,velocity){
        super(position_x,position_y,width,height,color);
        this.velocity = velocity/10;
        this.velocity_x = this.velocity;
        this.velocity_y = this.velocity;
        this.move();
        
        
        
   }
   move(){

      
       setInterval(()=>{
           this.wallCollision();
           this.position_x+=this.velocity_x;
           this.position_y+=this.velocity_y;
       },1000/60)
      
    }
    wallCollision(){
        if (this.position_x>=canva.width-this.width || this.position_x<=0){
            this.velocity_x*=-1;
        }
        else if (this.position_y>=canva.height-this.height || this.position_y <= 0){
            this.velocity_y*=-1;
        
        }
        else if (this.position_y>=player.position_y-this.height && this.position_x >= player.position_x && this.position_x <= player.position_x + player.width){
            this.velocity_y*=-1;
        }
            
    }
    
}
let player = new Player(340,560,250,20,'red');
let ball = new Ball(700,100,20,20,"green",60)


let objects = []; /*Array of all objects in game , kinematics and statics */
let staticObjects = [
    /*Array of all static objects, such blocks, just use "new StaticElements(etc),"*/
 
];

objects.push(player);
objects.push(ball);
objects.push(...staticObjects)


function mainLoop(){
    canvas.clearRect(0,0,canva.width,canva.height)
    for (let x=0;x<objects.length;x++){
        if (objects[x].display!=false){
            canvas.fillStyle= objects[x].color;
            canvas.fillRect(objects[x].position_x,objects[x].position_y,objects[x].width,objects[x].height);
        } 
    }
   
    window.requestAnimationFrame(mainLoop)
    
}

mainLoop();




