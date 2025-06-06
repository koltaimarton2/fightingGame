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
    constructor(owner, cooldown) {
        super(owner)
        this.duration = 100
        this.timer = 0
        this.cooldownDuration = cooldown; 
        this.cooldownTimer = 0;
        this.isAttacking = false;
    }    

    start() {
        if (this.cooldownTimer <= 0 && !this.isAttacking) {
            super.start()
            this.timer = this.duration
            this.isAttacking = true;
            this.owner.isAttacking = true
            this.cooldownTimer = this.cooldownDuration;
    }
}

    update(enemy, deductTime) {
        if (this.isAttacking) {
            this.timer -= deductTime
            if (this.timer <= 0) {
                this.isAttacking = false;
                //this.owner.isAttacking = false
            }
        }

        if (this.cooldownTimer > 0) {
            this.cooldownTimer -= deductTime;
        }
    }


}

export class Ranged extends Attack {
    constructor(owner, cooldown, speed, damage) {
        super(owner)
        this.projectiles = []
        this.projectileSpeed = speed;
        this.cooldownDuration = cooldown; 
        this.cooldownTimer = 0;
        this.damage = damage
        
    }
    
    start() {
    if (this.cooldownTimer <= 0 && !this.isAttacking) {
        super.start();
        const direction = this.owner.facingDirection;
        const projectile = {
            x: this.owner.position.x + this.owner.width / 2,
            y: this.owner.position.y + this.owner.height / 4 + (this.owner.isCrouching ? this.owner.height / 4 : 0),
            speedX: this.projectileSpeed * direction,
            width: 20,
            height: 20,
            active: true,
            alreadyCollided: false
        };
        this.projectiles.push(projectile);
        this.cooldownTimer = this.cooldownDuration;
    }
}
    
    update(enemy, deductTime) {
        this.projectiles.forEach((p) => {
            if (p.active) {
                p.x += p.speedX;
                ctx.fillStyle = 'orange';
                //ctx.fillRect(p.x, p.y, p.width, p.height);
                ctx.save();
                ctx.translate(p.x, p.y);
                if(this.owner.facingDirection == 1) ctx.scale(-1, 1);  
                ctx.drawImage(this.owner.img, 1, 5225, 45, 32, 0, 0, 45, 32)
                ctx.restore();

                if (p.x < 0 || p.x > canvas.width) {
                    p.active = false
                    console.log("Projectile disabled")
                }

                if (p.x >= enemy.position.x && p.x <= enemy.position.x + enemy.width && p.y >= enemy.position.y && p.y <= enemy.position.y + enemy.height && p.alreadyCollided == false) {
                    switch (enemy.index) {
                        case 1:
                            let healthBarA = document.getElementById("healthBarA")
                            let maxHealthBarA = document.getElementById("healthContainerA")
                            let currentWidthA = parseInt(healthBarA.style.width, 10) || 0
                            let maxWidthA = parseInt(maxHealthBarA.style.width, 10) || 0
                            if ((currentWidthA - (this.damage / 100) * maxWidthA) <= 0) {
                                healthBarA.style.width = "0px"
                            }
                            else {
                                healthBarA.style.width = (currentWidthA - (this.damage / 100) * maxWidthA) + "px"
                            }
                            
                            break
                        case 2:
                            let healthBarB = document.getElementById("healthBarB")
                            let maxHealthBarB = document.getElementById("healthContainerB")
                            let currentWidthB = parseInt(healthBarB.style.width, 10) || 0
                            let maxWidthB = parseInt(maxHealthBarB.style.width, 10) || 0
                            console.log(maxHealthBarB)
                            if ((currentWidthB - (this.damage / 100) * maxWidthB) <= 0) {
                                healthBarB.style.width = "0px"
                            }
                            else {
                                healthBarB.style.width = (currentWidthB - (this.damage / 100) * maxWidthB) + "px"
                            }
                    
                            break
                    }
                    enemy.health -= this.damage
                    console.log(enemy.health)
                    p.active = false
                }
                
            }
            
            
        
        })
        this.projectiles = this.projectiles.filter(p => p.active);

        if (this.cooldownTimer > 0) {
            this.cooldownTimer -= deductTime;
        }
        
    }
    

}


