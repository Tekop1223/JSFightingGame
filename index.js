const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
const speed = 10;
const background = new Sprite({
    position: {
        x: 0,
        y: 200,
    },
    
    imageSrc: './Assets/BackgroundImg/Background.gif',
    scale: 2.5,
    framesMax: 1
})


const shop = new Sprite({
    position: {
        x: 1800,
        y: 740,
    },
    imageSrc: './Assets/Sprites/shop.gif',
    scale: 4,
    framesMax: 6
})


const player = new Fighter ({ 
    position: {
        x: 0, 
        y: 950,
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 610
    },
    color: 'red',
    imageSrc: './Assets/Sprites/Player2.png',
    framesMax: 10,
    scale: 4,
});

const keys = {
    w: {
        isDown: false
    },
    a: {
        isDown: false
    },
    d: {
        isDown: false
    },

    ArrowUp: {
        isDown: false
    },
    ArrowLeft: {
        isDown: false
    },
    ArrowRight: {
        isDown: false
    }
}


const enemy = new Fighter({
    position: {
        x: 400, 
        y: 1300,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    offset: {
        x: 0,
        y: 710,
    },
    color: 'blue',
    imageSrc: './Assets/Sprites/Player1.png',
    framesMax: 10,
    scale: 4,
});

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0
    enemy.velocity.x = 0

    // Player movement
    if (keys.a.isDown && player.lastKey === 'a') {
        player.velocity.x = -speed;
    } else if (keys.d.isDown && player.lastKey === 'd') {
        player.velocity.x = speed;
    }

    // Enemy movement
    if (keys.ArrowLeft.isDown && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -speed;
    } else if (keys.ArrowRight.isDown && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = speed;
    }

    // Collision detection
    if (
        rectangularCollision({
            rect1: player,
            rect2: enemy
        }) && player.isAttacking 
    ) {
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector("#enemyHealth").style.width = enemy.health + '%';
    }

    // wall collosion
    if (player.position.x < 0) {
        player.position.x = 0;
    } else if (player.position.x + player.width > canvas.width) {
        player.position.x = canvas.width - player.width;
    }

    if (enemy.position.x < 0) {
        enemy.position.x = 0;
    } else if (enemy.position.x + enemy.width > canvas.width) {
        enemy.position.x = canvas.width - enemy.width;
    }




    if (
        rectangularCollision({
            rect1: enemy,
            rect2: player
        }) && enemy.isAttacking 
    ) {
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector("#playerHealth").style.width = player.health + '%' ;

    }

    if (enemy.health <= 0 || player.health <= 0){
        pickAWinner({player, enemy, timerId})
    }
    

    
}



animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            player.velocity.y = -speed;
            break;
        case 'a':
            keys.a.isDown = true;
            player.lastKey = 'a'
            break;
        case 'd':
            keys.d.isDown = true;
            player.lastKey = 'd'
            break;
        case ' ':
            player.attack();
            break;

        case 'ArrowUp':
            enemy.velocity.y = -speed;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.isDown = true;
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowRight':
            keys.ArrowRight.isDown = true;
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowDown':
            enemy.attack();
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.isDown = false;
            break;
        case 'd':
            keys.d.isDown = false;
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.isDown = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.isDown = false;
            break;
    }
});