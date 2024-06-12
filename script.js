document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.kookplaat');
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
    const platformen = document.querySelector('#platformen');

    let timeLeft;
    let score;
    let timer;
    let draggedElement = null;

    const tools = [
        { name: 'Chef Knife', img: './images/issa_knife.png', detail: 'A sharp knife for cutting ingredients with precision.' },
        { name: 'Cooking Pot', img: './images/pot.png', detail: 'A pot for boiling and cooking various ingredients.' },
        { name: 'Pan', img: './images/download.png', detail: 'A non-stick pan excellent for cooking stuff without needing fat.' },
        { name: 'Cutting Board', img: './images/snijplank.png', detail: 'Double sided cutting board perfect for cutting fresh food'}
    ];                    

    const ingredients = [
        { name: 'Tomato', img: './images/tomato.png' },
        { name: 'Onion', img: './images/onion.png' },
        { name: 'Garlic', img: './images/garlic.png' },
        { name: 'Meat', img: './images/rundergehakt.png' },
        { name: 'Spaghetti', img: './images/spaghetti.png' }
    ];

    const startGame = () => {
        timeLeft = 10000000000000000000;
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
        explanationScreen.style.display = "none"
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

    const changeImageOnHover = (knife, target, newImage) => {
        knife.addEventListener('dragover', e => {
            if (draggedItem === knife) {
                target.img = newImage;
            }
        });
    };

    const panInteractions = (ingredient, newPanImage) => {
        ingredient.addEventListener('dragover', e => {
            if (draggedItem === ingredient && pan.img.includes('pan_boven')) {
                pan.img = newPanImage;
                ingredient.style.display = 'none';
            }
        });
    };
    const setPanOnKookplaat = (pan, kookplaat, fixedImage) => {
        kookplaat.addEventListener('dragover', e => {
            e.preventDefault();
            if (draggedItem === pan) {
                pan.img = fixedImage;
                pan.draggable = false;
                kookplaat.appendChild(pan);
            }
        });
    };

    const setCookingPotOnKookplaat = (pot, kookplaat, fixedImage) => {
        kookplaat.addEventListener('dragover', e => {
            e.preventDefault();
            if (draggedItem === pot) {
                pot.draggable = false;
                kookplaat.appendChild(pot);
            }
        });
    };

    cookingPot.addEventListener('dragover', e => {
        if (draggedItem && draggedItem.name ==='spaghetti') {
            cookingPot.classList.add('full');
            draggedItem.style.display = 'none';
        }
    });

    const combineCookingPotMetPan = (cookingPot, pan, finalImage) => {
        pan.addEventListener('dragover', e => {
            if (draggedItem === cookingPot && cookingPot.classList.contains('vol')) {
                pan.img = finalImage;
                cookingPot.style.display = 'none';
            }
        });
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


