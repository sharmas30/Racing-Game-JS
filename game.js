const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
startScreen.addEventListener('click', start);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

player = {
    speed: 7,
    score: 0,
};
keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) ||
        (aRect.left > bRect.right) || (aRect.right < bRect.left))

}

function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item) {
        if (item.y > 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> your final score is " +
        (player.score + 1) + "<br> press here to start";

}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item) {
        if (isCollide(car, item)) {
            console.log("Hitt It");
            endGame();
        }

        if (item.y > 550) {
            item.y -= 600;
            item.style.left = Math.floor(Math.random() * 350) + 'px';
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay() {
    // console.log("game is started")
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if (player.start) {

        moveLines();
        moveEnemy(car);
        if (keys.ArrowUp && player.y > (road.top + 120)) {
            player.y -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 85)) {
            player.y += player.speed;
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerText = "Score: " + player.score;
    }
}

function start() {
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    moveLines();
    let car = document.createElement('div');
    car.setAttribute("class", 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    const car_color = ['blue', 'green', 'yello']
    for (x = 0; x < 4; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = (x * 150);
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundImage = "url(image/car" + (x + 2) + ".png)";
        enemyCar.style.left = Math.floor(Math.random() * 350) + 'px';
        gameArea.appendChild(enemyCar);
    }
}