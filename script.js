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

    let timeLeft;
    let score;
    let timer;
    let currentIngredients;

    const tools = [
        { name: 'Chef Knife', img: 'knife.png', detail: 'A sharp knife for cutting ingredients with precision.' },
        { name: 'Cooking Pot', img: 'pot.png', detail: 'A pot for boiling and cooking various ingredients.' },
        { name: 'Pan', img: 'pan.png', detail: 'A non stick pan excellent for cooking stuff without needing a fat.' },
        // We kunnen meer toevoegen, zal ook nodig zijn
    ];

    const ingredients = [
        { name: 'Tomato', img: 'tomato.png' },
        { name: 'Onion', img: 'onion.png' },
        { name: 'Garlic', img: 'garlic.png' },
        // Zelfde als de tools
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
        // Hierin steken we wat er gebeurdt als we op een tool klikken
        console.log(`Selected tool: ${tool.name}`);
    };

    const selectIngredient = function(ingredient) {
        // Zelfde als de tools maar voor de ingredients
        console.log(`Selected ingredient: ${ingredient.name}`);
    };

    const gameOver = function() {
        gameOverScreen.classList.remove('hidden');
    };

    const hideScreens = function() {
        gameOverScreen.classList.add('hidden');
        victoryScreen.classList.add('hidden');
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

    startGame();
});
