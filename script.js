const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

const gravity = 0.4


class Character {
    constructor(position, speed) {
        this.position = position
        this.speed = speed
        this.height = 175
        this.width = 75
        this.canJump
        this.lastKey 
        this.attackBox = {
            position: this.position ,
            width: 100 ,
            height: 50,
        }
    }

    draw() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
        
        ctx.fillStyle = "green"
        ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)


    }
    update() {
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        if (this.position.y + this.height + this.speed.y >= canvas.height - 130) {
            this.speed.y = 0
            this.canJump = true;
        }
        else {
            this.speed.y += gravity
        }
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
    }


}



const player = new Character(
    { x: 100, y: 0},
    { x: 0, y: 0 }
);


const player2 = new Character(
    { x: 500, y: 0},
    {x: 0, y: 0}
)

let lastKey;
let lastKey2;


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player2.update();

    player.speed.x = 0;
    player2.speed.x = 0;
    
    if (keys.a.pressed && lastKey === 'a') {
        if (player.position.x != 0) {
            player.speed.x = -10
        }
    }
    else if (keys.d.pressed && lastKey === 'd') {
        if (player.position.x != canvas.width  - player.width + 5 ) {
            player.speed.x = 10
        }
    }


    if (keys.ArrowLeft.pressed && lastKey2 === 'ArrowLeft') {
        if (player2.position.x != 0) {
            player2.speed.x = -10
        }
    }
    else if (keys.ArrowRight.pressed && lastKey2 === 'ArrowRight') {
        if (player2.position.x != canvas.width  - player2.width + 5 ) {
            player2.speed.x = 10
        }
    }


    if (
        player.attackBox.position.x + player.attackBox.width >= player2.position.x  && 
        player.attackBox.position.x <= player2.position.x + player2.width &&
    )
    {
        
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
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
    }
}


document.addEventListener("keydown", moveCharacter)
document.addEventListener("keyup", stopCharacter)




animate()








