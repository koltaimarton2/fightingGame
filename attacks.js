import { ctx, canvas, player, player2 } from "./script.js";

export class Attack {
    constructor(owner) {
        this.owner = owner;
    }

    start() {
    
    }

    update() {

    }
}



export class Melee extends Attack {
    constructor(owner) {
        super(owner)
        this.duration = 100
        this.timer = 0
        this.isAttacking = false;
    }    

    start() {
        super.start()
        this.timer = this.duration
        this.isAttacking = true;
        this.owner.isAttacking = true
    }

    update(deductTime) {
        if (this.isAttacking) {
            this.timer -= deductTime
            if (this.timer <= 0) {
                this.isAttacking = false;
                this.owner.isAttacking = false
            }
        }
    }


}

export class Ranged extends Attack {
    constructor(owner) {
        super(owner)
        this.projectiles = []
        this.projectileSpeed = 10;
        
    }
    
    start() {
        super.start();
        const direction = this.owner.facingDirection;
        const projectile = {
            x: this.owner.position.x + this.owner.width / 2,
            y: this.owner.position.y + this.owner.height / 4,
            speedX: this.projectileSpeed * direction,
            width: 20,
            height: 20,
            active: true,
            alreadyCollided: false
        };
        this.projectiles.push(projectile);
    }
    
    update(enemy) {
        this.projectiles.forEach((p) => {
            if (p.active) {
                p.x += p.speedX;
                ctx.fillStyle = 'orange';
                ctx.fillRect(p.x, p.y, p.width, p.height);

                if (p.x < 0 || p.x > canvas.width) {
                    p.active = false
                    console.log("Projectile disabled")
                }

                if (p.x >= enemy.position.x && p.x <= enemy.position.x + enemy.width && p.y >= enemy.position.y && p.y <= enemy.position.y + enemy.height && p.alreadyCollided == false) {
                    console.log("Hit")
                    enemy.health -= 10
                    console.log(enemy.health)
                    p.alreadyCollided = true
                }
                
            }
            
            
        
        })
        this.projectiles = this.projectiles.filter(p => p.active);
        
    }
    

}


