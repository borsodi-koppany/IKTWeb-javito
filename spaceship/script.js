document.querySelector('.restartButton').style.userSelect = 'none';
        const startScreen = document.getElementById('startScreen');
        const gameOverScreen = document.getElementById('gameOverScreen');
        const gameCanvas = document.getElementById('gameCanvas');
        const ctx = gameCanvas.getContext('2d');

        let selectedSpaceship = '';
        let score = 0;

        function showStartScreen() {
            startScreen.style.display = 'flex';
            gameOverScreen.style.display = 'none';
            gameCanvas.style.display = 'none';
        }

        function addMouseEvents() {
            const spaceshipImages = document.querySelectorAll('.shipOption img');
        
            spaceshipImages.forEach(spaceshipImage => {
                spaceshipImage.addEventListener('mouseover', () => {
                    spaceshipImage.parentElement.style.border = '2px solid #3498db';
                });
        
                spaceshipImage.addEventListener('mouseout', () => {
                    spaceshipImage.parentElement.style.border = '2px solid transparent';
                });
            });
        }
        
        addMouseEvents();

        function showGameOverScreen() {
            startScreen.style.display = 'none';
            gameOverScreen.style.display = 'flex';
            gameCanvas.style.display = 'none';
            scoreElement.innerText = "";

            document.getElementById('scoreDiv').innerText = 'Pontszám: ' + score;
            document.getElementById('scoreDiv').style.userSelect = 'none';
        }

        function restartGame() {
            window.location.reload()
        }

        function startGame(spaceshipImageSrc) {
            const selectedOptions = document.querySelectorAll('.shipOption.selected');
            selectedOptions.forEach(option => option.classList.remove('selected'));

            score = 0;
            selectedSpaceship = spaceshipImageSrc;
            startScreen.style.display = 'none';
            gameOverScreen.style.display = 'none';
            gameCanvas.style.display = 'block';
            initGame();
        }

        function initGame() {
            const spaceshipImage = new Image();
            spaceshipImage.src = selectedSpaceship;
        
            const spaceship = {
                x: gameCanvas.width / 2,
                y: gameCanvas.height + 650,
                width: 100,
                height: 100,
                speed: 15
            };
        
            const bullets = [];
            const meteors = [];
        
            const scoreElement = document.createElement('div');
            scoreElement.id = 'scoreElement';
            scoreElement.style.position = 'absolute';
            scoreElement.style.fontSize = '24px';
            scoreElement.style.color = '#fff';
            scoreElement.style.top = '10px';
            scoreElement.style.left = '10px';
            scoreElement.style.userSelect = 'none';
            document.body.appendChild(scoreElement);
        
            function updateScore() {
                scoreElement.innerText = 'Pontszám: ' + score;
            }

            function drawSpaceship() {
                ctx.drawImage(spaceshipImage, spaceship.x - spaceship.width / 2, spaceship.y - spaceship.height / 2, spaceship.width, spaceship.height);
            }

            function drawBullets() {
                ctx.fillStyle = 'red';
                bullets.forEach(bullet => {
                    ctx.fillRect(bullet.x - 2, bullet.y - 10, 4, 10);
                });
            }

            function drawMeteors() {
                meteors.forEach(meteor => {
                    const meteorImage = new Image();
                    meteorImage.src = meteor.image;
                    ctx.drawImage(meteorImage, meteor.x - meteor.size / 2, meteor.y - meteor.size / 2, meteor.size, meteor.size);
                });
            }

            function moveSpaceship(e) {
                if (e.key === 'ArrowLeft' && spaceship.x - spaceship.width / 2 > 0) {
                    spaceship.x -= spaceship.speed;
                } else if (e.key === 'ArrowRight' && spaceship.x + spaceship.width / 2 < gameCanvas.width) {
                    spaceship.x += spaceship.speed;
                } else if (e.key === 'ArrowUp' && spaceship.y - spaceship.height / 2 > 0) {
                    spaceship.y -= spaceship.speed;
                } else if (e.key === 'ArrowDown' && spaceship.y + spaceship.height / 2 < gameCanvas.height) {
                    spaceship.y += spaceship.speed;
                }
            }

            function shoot() {
                bullets.push({ x: spaceship.x, y: spaceship.y });
            }

            function createMeteor() {
                const size = Math.random() * 120 + 40;
                const x = Math.random() * (gameCanvas.width - size) + size / 2;
                const y = -size / 2;
                const speed = Math.random() * 2 + 1;
            
                const images = ['pictures/meteor1.png', 'pictures/meteor2.png', 'pictures/meteor3.png'];
                const randomImage = images[Math.floor(Math.random() * images.length)];
            
                meteors.push({ x, y, size, speed, image: randomImage });
            }

            function updateGameArea() {
                ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

                drawSpaceship();
                drawBullets();
                drawMeteors();

                bullets.forEach(bullet => {
                    bullet.y -= 5;
                });

                meteors.forEach(meteor => {
                    meteor.y += meteor.speed;

                    if (
                        meteor.x + meteor.size / 2 > spaceship.x - spaceship.width / 2 &&
                        meteor.x - meteor.size / 2 < spaceship.x + spaceship.width / 2 &&
                        meteor.y + meteor.size / 2 > spaceship.y - spaceship.height / 2 &&
                        meteor.y - meteor.size / 2 < spaceship.y + spaceship.height / 2
                    ) {
                        showGameOverScreen();
                    }

                    bullets.forEach(bullet => {
                        if (
                            bullet.x > meteor.x - meteor.size / 2 &&
                            bullet.x < meteor.x + meteor.size / 2 &&
                            bullet.y > meteor.y - meteor.size / 2 &&
                            bullet.y < meteor.y + meteor.size / 2
                        ) {
                            bullets.splice(bullets.indexOf(bullet), 1);
                            meteors.splice(meteors.indexOf(meteor), 1);
                            score += 1;
                            updateScore();
                        }
                    });
                });

                if (Math.random() < 0.02) {
                    createMeteor();
                }

                requestAnimationFrame(updateGameArea);
            }

            window.addEventListener('keydown', moveSpaceship);
            window.addEventListener('click', shoot);

            gameCanvas.width = window.innerWidth;
            gameCanvas.height = window.innerHeight;

            updateGameArea();
        }

        showStartScreen();