"use strict";
(function() {
    const gameBoard = document.querySelector('#game-board');
    const timerElement = document.querySelector('#timer');
    const scoreElement = document.querySelector('#score');
    const hintButton = document.querySelector('#hint-button');
    const hintText = document.querySelector('#hint-text');
    const gameOverScreen = document.querySelector('#game-over');
    const victoryScreen = document.querySelector('#victory');
    const restartButton = document.querySelector('#restart-button');

    let timeLeft;
    let score;
    let timer;
    let currentLevel;
    let currentItems;

    const levels = [
        {
            items: [
                //{ name: 'Chef Knife', hint: 'Look near the cutting board.', img: 'knife.png' }
            ]
        }
    ];

    const startGame = function() {
        timeLeft = 60;
        score = 0;
        currentLevel = 0;
        updateTimerDisplay();
        updateScoreDisplay();
        hideScreens();
        loadLevel();
        startTimer();
    };

    const startTimer = function() {
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    };

    const updateTimer = function() {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            gameOver();
        }
    };

    const updateTimerDisplay = function() {
        timerElement.textContent = `Time: ${timeLeft}`;
    };

    const updateScoreDisplay = function() {
        scoreElement.textContent = `Score: ${score}`;
    };

    const loadLevel = function() {
        gameBoard.innerHTML = '';
        hintText.textContent = '';
        currentItems = levels[currentLevel].items.slice();
        
        currentItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('game-item');
            itemElement.style.backgroundImage = `url(${item.img})`;
            itemElement.dataset.name = item.name;
            itemElement.dataset.hint = item.hint;
            itemElement.style.top = `${Math.random() * (gameBoard.clientHeight - 50)}px`;
            itemElement.style.left = `${Math.random() * (gameBoard.clientWidth - 50)}px`;
            itemElement.addEventListener('click', () => collectItem(itemElement));
            gameBoard.appendChild(itemElement);
        });
    };


    const levelComplete = function() { // Voor als ze slagen het level te completen
        // Is voor later
        clearInterval(timer);
        if (currentLevel < levels.length - 1) {
            victoryScreen.classList.remove('hidden');
        } 
    };

    const gameOver = function() {
        gameOverScreen.classList.remove('hidden');
    };

    const hideScreens = function() {
        gameOverScreen.classList.add('hidden');
        victoryScreen.classList.add('hidden');
    };

    hintButton.addEventListener('click', function() {
        if (currentItems.length > 0) {
            const randomItem = currentItems[Math.floor(Math.random() * currentItems.length)];
            hintText.textContent = randomItem.hint;
        }
    });

    restartButton.addEventListener('click', function() {
        hideScreens();
        startGame();
    });

    startGame();
})();
