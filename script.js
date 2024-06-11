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
    let draggedElement = null;

    const tools = [
        { name: 'Chef Knife', img: 'issa_knife.png', detail: 'A sharp knife for cutting ingredients with precision.' },
        { name: 'Cooking Pot', img: 'pot.png', detail: 'A pot for boiling and cooking various ingredients.' },
        { name: 'Pan', img: 'download.jpeg', detail: 'A non-stick pan excellent for cooking stuff without needing fat.' },
    ];                      /*hier*/

    const ingredients = [
        { name: 'Tomato', img: 'tomato.png' },
        { name: 'Onion', img: 'onion.png' },
        { name: 'Garlic', img: 'garlic.png' },
    ];

    const startGame = () => {
        timeLeft = 60;
        score = 0;
        currentLevel = 0;
        updateTimerDisplay();
        updateScoreDisplay();
        hideScreens();
        loadMenus();
        startTimer();
        showGameElements();
        clearGameBoard();
    };

    const startTimer = () => {
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    };

    const updateTimer = () => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            gameOver();
        }
    };

    const updateTimerDisplay = () => {
        timerElement.textContent = `Time: ${timeLeft}`;
    };

    const updateScoreDisplay = () => {
        scoreElement.textContent = `Score: ${score}`;
    };

    const proceed = () => {
        const explanationChildren = explanationScreen.children;
        for (let i = 0; i < explanationChildren.length; i++) {
            explanationChildren[i].classList.add('hidden');
        }
    };

    const loadMenus = () => {
        toolsMenu.innerHTML = '';
        ingredientsMenu.innerHTML = '';

        tools.forEach(tool => {
            const toolElement = document.createElement('div');
            toolElement.classList.add('menu-item');
            
            const toolImage = document.createElement('img');
            toolImage.src = tool.img;
            toolImage.alt = tool.name;
            toolImage.classList.add('tool-image');
            toolImage.draggable = true;
            toolElement.appendChild(toolImage);
            
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = tool.detail;
            toolElement.appendChild(tooltip);

            toolImage.addEventListener('dragstart', dragStart);
            toolsMenu.appendChild(toolElement);
        });

        ingredients.forEach(ingredient => {
            const ingredientElement = document.createElement('div');
            ingredientElement.classList.add('menu-item');
            
            const ingredientImage = document.createElement('img');
            ingredientImage.src = ingredient.img;
            ingredientImage.alt = ingredient.name;
            ingredientImage.classList.add('ingredient-image');
            ingredientImage.draggable = true;
            ingredientElement.appendChild(ingredientImage);

            ingredientImage.addEventListener('dragstart', dragStart);
            ingredientsMenu.appendChild(ingredientElement);
        });

        gameBoard.addEventListener('dragover', dragOver);
        gameBoard.addEventListener('drop', drop);
    };

    const selectTool = (tool) => {
        console.log(`Selected tool: ${tool.name}`);
    };

    const selectIngredient = (ingredient) => {
        console.log(`Selected ingredient: ${ingredient.name}`);
    };

    const gameOver = () => {
        gameOverScreen.classList.remove('hidden');
    };

    const hideScreens = () => {
        gameOverScreen.classList.add('hidden');
        victoryScreen.classList.add('hidden');
        startScreen.classList.add('hidden');
    };

    const showGameElements = () => {
        header.classList.remove('hidden');
        gameContainer.classList.remove('hidden');
    };

    const dragStart = (e) => {
        draggedElement = e.target;
        setTimeout(() => e.target.classList.add('hide'), 0);
    };
    const clearGameBoard = () => {
        gameBoard.innerHTML = '';
    };
    const dragOver = (e) => {
        e.preventDefault();
    };

    const drop = (e) => {
        e.preventDefault();
        draggedElement.classList.remove('hide');
        gameBoard.appendChild(draggedElement);
        draggedElement.style.position = 'absolute';
        draggedElement.style.left = `${e.clientX - gameBoard.offsetLeft - draggedElement.width / 2 -50}px`;
        draggedElement.style.top = `${e.clientY - gameBoard.offsetTop - draggedElement.height / 2 -100}px`;
        draggedElement = null;
    };

    toolsButton.addEventListener('click', () => {
        toolsMenu.classList.remove('hidden');
        ingredientsMenu.classList.add('hidden');
    });

    ingredientsButton.addEventListener('click', () => {
        ingredientsMenu.classList.remove('hidden');
        toolsMenu.classList.add('hidden');
    });

    restartButton.addEventListener('click', () => {
        hideScreens();
        startGame();
    });

    gameOverRestartButton.addEventListener('click', () => {
        hideScreens();
        startGame();
    });

    victoryRestartButton.addEventListener('click', () => {
        hideScreens();
        startGame();
    });

    startButton.addEventListener('click', () => {
        hideScreens();
    });

    proceedButton.addEventListener('click', () => {
        startGame(); 
        proceed();
    });
});


