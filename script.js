document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.kookplaat');
    const timerElement = document.querySelector('#timer');
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
    const tafel = document.querySelector('.tafel');

    let timeLeft;
    let timer;
    let draggedElement = null;

    const startGame = () => {
        timeLeft = 90;
        updateTimerDisplay();
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

    const proceed = () => {
        explanationScreen.style.display = "none"
    };

    const tools = document.querySelectorAll(".tool-image")
    const ingredients = document.querySelectorAll(".ingredient-image")

    const loadMenus = () => {
        
        tools.forEach(tool => {
            tool.addEventListener('dragstart', dragStart);
        });

        ingredients.forEach(ingredient => {
            ingredient.addEventListener('dragstart', dragStart);
        });

        platformen.addEventListener('dragover', dragOver)
        platformen.addEventListener('drop', drop)

    }

    

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
        draggedElement.classList.add("dropped-image")
        platformen.appendChild(draggedElement);
        draggedElement.style.position = 'absolute';
        if (draggedElement === pan) {
            draggedElement.style.left = `360px`;
            draggedElement.style.top = `75px`;
        } else if (draggedElement === pot) {
            draggedElement.style.left = `120px`;
            draggedElement.style.top = `80px`;
        } else {
            draggedElement.style.left = `${e.clientX - platformen.offsetLeft - draggedElement.width / 2 -48}px`;
            draggedElement.style.top = `${e.clientY - platformen.offsetTop - draggedElement.height / 2 +90}px`;    
        }
        draggedElement = null;
    };


    const knife = document.querySelector('#Chef-Knife')
    const pot = document.querySelector('#Cooking-Pot')
    const pan = document.querySelector('#Pan')
    const board = document.querySelector('#Cutting-Board')
    const tomato = document.querySelector('#Tomato')
    const onion = document.querySelector('#Onion')
    const garlic = document.querySelector('#Garlic')
    const meat = document.querySelector('#Meat')
    const spaghetti = document.querySelector('#Spaghetti')
    const bord = document.querySelector('#Plate')


    const changeImageOnHover = (knife, target, newImage) => {
        knife.addEventListener('dragover', e => {
            try {
                if (draggedElement === target) {
                    target.src = newImage
                }
            } catch (err) {
                return
            }
        });
    };

    changeImageOnHover(knife, tomato, "./images/gesneden_tomaat-removebg-preview.png")
    changeImageOnHover(knife, onion, "./images/gesneden_ajuin-removebg-preview.png")
    changeImageOnHover(knife, garlic, "./images/gesneden_look-removebg-preview.png")

    const panInteractions = (ingredient, newPanImage) => {
        pan.addEventListener('dragover', e => {
            if (draggedElement === ingredient && ingredient.src.includes('gesneden_') && pan.src.includes('pan_')) {
                pan.src = newPanImage
                ingredient.style.display = 'none'
            }
            if (draggedElement === ingredient && ingredient.src.includes('runder') && pan.src.includes('pan_met')) {
                pan.src = newPanImage
                ingredient.style.display = 'none'
            }
        });
    };

    const setPanOnKookplaat = (pan, kookplaat) => {
        kookplaat.addEventListener('dragover', e => {
            try {
                e.preventDefault();
                if (draggedElement === pan) {
                    pan.draggable = false
                    
                }
            } catch (err) {
                return
            }
            
        });
    };

    setPanOnKookplaat(pan, gameBoard)
    panInteractions(tomato, "./images/pan_met_saus.png")
    panInteractions(garlic, "./images/pan_met_saus.png")
    panInteractions(onion, "./images/pan_met_saus.png")
    panInteractions(meat, "./images/pan_met_bolognaise.png")

    

    const setCookingPotOnKookplaat = (pot, kookplaat) => {
        kookplaat.addEventListener('dragover', e => {
            try {
                e.preventDefault()
                if (draggedElement === pot) {
                    pot.draggable = false;
                    
                    
                }
            } catch (err) {
                return
            }
            
        });
    };

    const potInteractions = (ingredient) => {
        pot.addEventListener('dragover', e => {
            if (draggedElement === ingredient) {
                ingredient.style.display = 'none';
                pot.draggable = true
                pot.classList.add('vol')
            }
            
        });
    };

    setCookingPotOnKookplaat(pot, gameBoard)
    potInteractions(spaghetti)

    

    const combineCookingPotMetPan = (cookingPot, pan, finalImage) => {
        pan.addEventListener('dragover', e => {
            if (draggedElement === cookingPot && cookingPot.classList.contains('vol')) {
                pan.src = finalImage;
                pan.draggable = true;
                pan.removeEventListener('drop', drop)
                cookingPot.style.display = 'none';
            }
        });
    };

    combineCookingPotMetPan(pot, pan, "./images/pan_met_spaghetti.png")

    const serveren = (bord, pan, klaar) => {
        bord.addEventListener('dragover', e => {
            if (draggedElement === pan && pan.src.includes("pan_met_sp")) {
                bord.src = klaar
                pan.style.display = 'none'
                victoryScreen.classList.remove('hidden')
            }
        })
    }

    serveren(bord, pan, "./images/klaar-removebg-preview.png")


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
        location.reload();
    });

    gameOverRestartButton.addEventListener('click', () => {
        hideScreens();
        location.reload();
    });

    victoryRestartButton.addEventListener('click', () => {
        hideScreens();
        location.reload();
    });

    startButton.addEventListener('click', () => {
        hideScreens();
    });

    proceedButton.addEventListener('click', () => {
        startGame();
        proceed();
    });

});


