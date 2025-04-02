const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

const gravity = 0.2

class Character {
    constructor(position, speed) {
        this.position = position
        this.speed = speed
        this.height = 300
    }

    draw() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y,75, this.height)
        
    }
    update() {
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        if (this.position.y + this.height + this.speed.y >= canvas.height) {
            this.speed.y = 0
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
    w: {
        pressed: false
    },
    s: {
        pressed:false
    }

}



const player = new Character(
    { x: 100, y: 262.5 },
    { x: 0, y: 0 }
);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    requestAnimationFrame(animate);
}


function moveCharacter(e) {
    e.preventDefault()
    if (e.code == "ArrowDown"|| e.code == "KeyS") {
        e.preventDefault()
        player.speed.x = 0
        player.speed.y = 10 
        console.log("down")  
    }
    if (e.code == "ArrowUp" && e.code != lastKey || e.code == "KeyW" &&  e.code != lastKey) {
        e.preventDefault()
        player.speed.x = 0
        player.speed.y = -10
        console.log("up")  
    }
    if (e.code == "ArrowLeft"||e.code == "KeyA") {
        e.preventDefault()
        player.speed.x = -10
        player.speed.y = 0
        console.log("left")  
    }
    if (e.code == "ArrowRight"||e.code == "KeyD") {
        e.preventDefault()
        player.speed.x =10
        player.speed.y = 0
        console.log("right")  
    }
    lastKey = e.code
}

function stopCharacter(e) {
    if (
        e.code === "ArrowDown" || e.code === "KeyS" ||
        e.code === "ArrowUp" || e.code === "KeyW"
    ) {
        player.speed.y = 0;
    }
    if (
        e.code === "ArrowLeft" || e.code === "KeyA" ||
        e.code === "ArrowRight" || e.code === "KeyD"
    ) {
        player.speed.x = 0;
    }
}


document.addEventListener("keydown", moveCharacter)
document.addEventListener("keyup", stopCharacter)




animate()








