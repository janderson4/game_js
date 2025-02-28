// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player properties
const player = {
    x: 150,
    y: 400,
    width: 50,
    height: 50,
    speed: 5
};

// Array for falling obstacles
let obstacles = [];
let gameOver = false;

// Key event handling
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
});

// Generate obstacles
function spawnObstacle() {
    const size = 50;
    obstacles.push({ x: Math.random() * (canvas.width - size), y: 0, width: size, height: size, speed: 3 });
}

// Update game state
function update() {
    if (gameOver) return;
    
    obstacles.forEach(obstacle => {
        obstacle.y += obstacle.speed;
        
        // Collision detection
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            gameOver = true;
            alert("Game Over!");
        }
    });
    
    // Remove obstacles that are off-screen
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

// Render game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw obstacles
    ctx.fillStyle = "red";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Game loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

gameLoop();
setInterval(spawnObstacle, 1000);
