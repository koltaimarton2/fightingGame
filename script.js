const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

const gravity = 0.4

let canJump = false

class Character {
    constructor(position, speed) {
        this.position = position
        this.speed = speed
        this.height = 300
        this.width = 75
    }

    draw() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y,this.width, this.height)
        
    }
    update() {
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        if (this.position.y + this.height + this.speed.y >= canvas.height) {
            this.speed.y = 0
            canJump = true;
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
    { x: 100, y: 262.5 },
    { x: 0, y: 0 }
);


const player2 = new Character(
    { x: 500, y: 262.5},
    {x: 0, y: 0}
)

let lastKey;


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();

    player.speed.x = 0;
    
    if (keys.a.pressed && lastKey === 'a') {
        if (player.position.x != 0) {
            player.speed.x = -10
        }
    }
    else if (keys.d.pressed && lastKey === 'd') {
        if (player.position.x != canvas.width  - player.width + 5 ) {
            player.speed.x = 10
        }


    if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        if (player.position.x != 0) {
            player.speed.x = -10
        }
    }
    else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        if (player.position.x != canvas.width  - player.width + 5 ) {
            player.speed.x = 10
        }
    }}

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
            if (canJump) {
                player.speed.y = -7.5
                lastKey = 'w'
                canJump = false
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
    }
}


document.addEventListener("keydown", moveCharacter)
document.addEventListener("keyup", stopCharacter)




animate()








