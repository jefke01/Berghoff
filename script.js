document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('#game-board');
    const timerElement = document.querySelector('#timer');
    const scoreElement = document.querySelector('#score');
    const gameOverScreen = document.querySelector('#game-over');
    const victoryScreen = document.querySelector('#victory');
    const restartButton = document.querySelector('#restart-button');
    const toolsButton = document.querySelector('#tools-button');
    const ingredientsButton = document.querySelector('#ingredients-button');
    const toolsMenu = document.querySelector('#tools-menu');
    const ingredientsMenu = document.querySelector('#ingredients-menu');
    const gameOverRestartButton = document.querySelector('#game-over-restart-button');
    const victoryRestartButton = document.querySelector('#victory-restart-button');
    const startScreen = document.querySelector('#start-screen');
    const explanationScreen = document.querySelector('#explanation');
    const startButton = document.querySelector('#start-button');
    const proceedButton = document.querySelector('#proceed-button');
    const header = document.querySelector('header');
    const gameContainer = document.querySelector('#game-container');

    let timeLeft;
    let score;
    let timer;
    let currentIngredients;

    const tools = [
        { name: 'Chef Knife', img: 'knife.png', detail: 'A sharp knife for cutting ingredients with precision.' },
        { name: 'Cooking Pot', img: 'pot.png', detail: 'A pot for boiling and cooking various ingredients.' },
        { name: 'Pan', img: 'pan.png', detail: 'A non stick pan excellent for cooking stuff without needing a fat.' },
    ];

    const ingredients = [
        { name: 'Tomato', img: 'tomato.png' },
        { name: 'Onion', img: 'onion.png' },
        { name: 'Garlic', img: 'garlic.png' },
    ];

    const startGame = function() {
        timeLeft = 60;
        score = 0;
        currentLevel = 0;
        updateTimerDisplay();
        updateScoreDisplay();
        hideScreens();
        loadMenus();
        startTimer();
        showGameElements();
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

    const proceed = function() {
        const explanationChildren = explanationScreen.children;
        for (let i = 0; i < explanationChildren.length; i++) {
            explanationChildren[i].classList.add('hidden');
        }
    };

    const loadMenus = function() {
        toolsMenu.innerHTML = '';
        ingredientsMenu.innerHTML = '';

        tools.forEach(tool => {
            const toolElement = document.createElement('div');
            toolElement.classList.add('menu-item');
            toolElement.textContent = tool.name;
            toolElement.setAttribute('data-detail', tool.detail);

            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = tool.detail;
            toolElement.appendChild(tooltip);

            toolElement.addEventListener('click', () => selectTool(tool));
            toolsMenu.appendChild(toolElement);
        });

        ingredients.forEach(ingredient => {
            const ingredientElement = document.createElement('div');
            ingredientElement.classList.add('menu-item');
            ingredientElement.textContent = ingredient.name;
            ingredientElement.addEventListener('click', () => selectIngredient(ingredient));
            ingredientsMenu.appendChild(ingredientElement);
        });
    };

    const selectTool = function(tool) {
        console.log(`Selected tool: ${tool.name}`);
    };

    const selectIngredient = function(ingredient) {
        console.log(`Selected ingredient: ${ingredient.name}`);
    };

    const gameOver = function() {
        gameOverScreen.classList.remove('hidden');
    };

    const hideScreens = function() {
        gameOverScreen.classList.add('hidden');
        victoryScreen.classList.add('hidden');
        startScreen.classList.add('hidden');
    };

    const showGameElements = function() {
        header.classList.remove('hidden');
        gameContainer.classList.remove('hidden');
    };

    toolsButton.addEventListener('click', function() {
        toolsMenu.classList.toggle('hidden');
        ingredientsMenu.classList.add('hidden');
    });

    ingredientsButton.addEventListener('click', function() {
        ingredientsMenu.classList.toggle('hidden');
        toolsMenu.classList.add('hidden');
    });

    restartButton.addEventListener('click', function() {
        hideScreens();
        startGame();
    });

    gameOverRestartButton.addEventListener('click', function() {
        hideScreens();
        startGame();
    });

    victoryRestartButton.addEventListener('click', function() {
        hideScreens();
        startGame();
    });

    startButton.addEventListener('click', function() {
        hideScreens();
    });

    proceedButton.addEventListener('click', function() {
        startGame(); 
        proceed();
    });

});
