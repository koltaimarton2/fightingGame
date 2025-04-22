const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

const gravity = 0.4


class Character {
    constructor(position, speed, color, offset) {
        this.position = position
        this.speed = speed
        this.height = 175
        this.width = 75
        this.canJump
        this.facingDirection = 1;
        this.isCrouching = false
        this.lastKey 
        this.color = color
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset ,
            width: 75 ,
            height: 50,
        }
        this.isAttacking
        
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
        
        if (this.isAttacking) {
            ctx.fillStyle = "green"
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)    
        }


    }
    update() {
        this.draw()

        updateOffset(player,player2)

        this.attackBox.position.x = this.position.x + (this.attackBox.offset.x * this.facingDirection)
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        this.position.x += this.speed.x
        this.position.y += this.speed.y

        if (this.isCrouching && this.canJump) {
            this.height = 100; 
            this.position.y = 257.2 + 75
        } 

        if (this.position.y + this.height + this.speed.y >= canvas.height - 130) {
            this.speed.y = 0
            this.canJump = true;
        }
        else {
            this.speed.y += gravity
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}



const keys = {
    a:{
        pressed : false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    e: {
        pressed: false
    }


}



const player = new Character(
    { x: 100, y: 0},
    { x: 0, y: 0 },
    'red',
    { x: 37.5, y: 0}
);


const player2 = new Character(
    { x: 500, y: 0},
    {x: 0, y: 0},
    'blue',
    { x: 37.5, y: 0}
)

let lastKey;
let lastKey2;

function detectCollision(rectangle1, rectangle2) {
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height);
}


function updateOffset(rectangle1, rectangle2) {
    if (rectangle1.position.x < rectangle2.position.x) {
        rectangle1.facingDirection = 1  
        rectangle2.facingDirection = -1 
    } else {
        rectangle1.facingDirection = -1 
        rectangle2.facingDirection = 1  
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player2.update();

    player.speed.x = 0;
    player2.speed.x = 0;
    
    if (keys.a.pressed && lastKey === 'a') {
        if (player.position.x != 30 && player.position.x != 25 ) {
            if (player.isCrouching) {
                player.speed.x = -5
            }
            else {
                player.speed.x = -10
            }
        }
    }
    else if (keys.d.pressed && lastKey === 'd') {
        if (player.position.x != canvas.width  - player.width -25 && player.position.x != canvas.width  - player.width -20 ) {
            if (player.isCrouching) {
                player.speed.x = 5
            }
            else {
                player.speed.x = 10
            }
        }
    }


    


    if (keys.ArrowLeft.pressed && lastKey2 === 'ArrowLeft') {
        if (player2.position.x != 30 && player2.position.x != 25 ) {
            if (player2.isCrouching) {
                player2.speed.x = -5
            }
            else {
                player2.speed.x = -10
            }
        }
    }
    else if (keys.ArrowRight.pressed && lastKey2 === 'ArrowRight') {
        if (player2.position.x != canvas.width  - player2.width -25 && player2.position.x != canvas.width  - player2.width -20 ) {
            if (player2.isCrouching) {
                player2.speed.x = 5
            }
            else {
                player2.speed.x = 10
            }
        }
    }


    if (detectCollision(player,player2) && player.isAttacking)
    {
        player.isAttacking = false
        console.log("KURVAAAA")
    }
    if (detectCollision(player2,player) &&player2.isAttacking    )
    {
        player2.isAttacking = false
        console.log("KURVAAAA")
    }
    


    
    requestAnimationFrame(animate);
}



function moveCharacter(e) {
    switch (e.key) {
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break;
        case 'w':
            if (player.canJump) {
                player.speed.y = -7.5
                player.canJump = false
            }
            break
        case 's':
            player.isCrouching = true
            
            break
        case 'e':
            player.attack()
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            lastKey2 = 'ArrowLeft'
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            lastKey2 = 'ArrowRight'
            break;
        case 'ArrowUp':
            if (player2.canJump) {
                player2.speed.y = -7.5
                player2.canJump = false
            }
            break
        case 'ArrowDown':
            player2.isCrouching = true;
            break
        case ' ':
            player2.attack()
            break
        

    }
}

function stopCharacter(e) {
    switch (e.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 's':
            player.isCrouching = false
            player.position.y = 257.2 
            player.height = 175;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowDown':
            player2.isCrouching = false
            player2.position.y = 257.2 
            player2.height = 175;
            break
    }
}


document.addEventListener("keydown", moveCharacter)
document.addEventListener("keyup", stopCharacter)




animate()








