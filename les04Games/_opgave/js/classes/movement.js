// movement.js - Bestuurt de beweging van de helikopter

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            sprHeli.speedY = -3;
            break;
        case 'ArrowDown':
            sprHeli.speedY = 3;
            break;
        case 'ArrowLeft':
            sprHeli.speedX = -3;
            sprHeli.direction = -1;
            break;
        case 'ArrowRight':
            sprHeli.speedX = 3;
            sprHeli.direction = 1;
            break;
        case ' ':
            dropBalloon();
            break;
    }
});

document.addEventListener('keyup', (event) => {
    if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
        sprHeli.speedY = 0;
    }
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        sprHeli.speedX = 0;
    }
});

// balloon.js - Logica voor het laten vallen van ballonnen

function dropBalloon() {
    const sprBalloon = new Sprite({
        id: `balloon-${Date.now()}`,
        url: 'img/balloon.png',
        w: 40,
        h: 60,
        x: sprHeli.x,
        y: sprHeli.y,
    });
    
    let fallSpeed = 1;
    game.addSprite(sprBalloon);
    
    const fallInterval = setInterval(() => {
        sprBalloon.y += fallSpeed;
        fallSpeed += 0.2; // Ballon versnelt
        sprBalloon.repaint();
        
        // Controleer of ballon de grond of het konijn raakt
        if (sprBalloon.y >= 550) {
            clearInterval(fallInterval);
            game.removeSprite(sprBalloon);
            if (sprBalloon.hitBy(sprRabbit)) {
                console.log('Konijn geraakt!');
            }
        }
    }, 50);
    
    // Geluid afspelen
    const audio = new Audio('sounds/falling.mp3');
    audio.play();
}

// rabbit.js - Logica voor het konijn

const sprRabbit = new Sprite({
    id: 'rabbit',
    url: 'img/rabbit.png',
    w: 50,
    h: 40,
    x: 100,
    y: 550,
    frames: [0, 50] // Animatie frames
});

game.addSprite(sprRabbit);

function moveRabbit() {
    sprRabbit.x += 2;
    if (sprRabbit.x > game.w) {
        sprRabbit.x = -sprRabbit.w;
    }
    requestAnimationFrame(moveRabbit);
}

moveRabbit();

// gameLogic.js - Algemene spelregels en interacties

function startGame() {
    spnHits.innerHTML = numHits = 0;
    spnMisses.innerHTML = numMisses = 0;
    game.removeSprite(sprPlay);
    game.setBackground('img/sky.png');
    sprGround.x = 0;
    sprGround.speedX = -0.5;
    sprClouds.x = 0;
    sprClouds.speedX = -2;
    sprHeli.x = 200;
    sprHeli.animDrag = 5;
    doLoop();
}

function doLoop() {
    game.repaint();
    if (sprClouds.x < -sprClouds.w) sprClouds.x = game.w;
    if (sprGround.x < -game.w) sprGround.x = 0;
    if (sprHeli.y < 0) sprHeli.y = 0;
    if (sprHeli.x < -sprHeli.w / 2) sprHeli.x = -sprHeli.w / 2;
    if (sprHeli.x > game.w - sprHeli.w / 2) sprHeli.x = game.w - sprHeli.w / 2;
    if (sprHeli.y > 500) sprHeli.y = 500;
    requestAnimationFrame(doLoop);
}

sprPlay.node.addEventListener('click', startGame);