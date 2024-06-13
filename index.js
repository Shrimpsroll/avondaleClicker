// Variable Declaration
var points = 0;
var ppc = 0.1;
var pps = 0;
var bankPoints = 0;
var background = ''; // Add a variable to store the background
var gameEvent = false;

// Upgrade data
var upgrades = [
    { title: 'Quark', type: 'ppc', baseCost: 10, cost: 10, effect: 0.1 },
    { title: 'Proton', type: 'pps', baseCost: 20, cost: 20, effect: 0.1 },
    { title: 'Atom', type: 'pps', baseCost: 100, cost: 100, effect: 1.1 },
    { title: 'Atom Accelerator', type: 'ppc', baseCost: 100, cost: 100, effect: 1.1 },
    { title: 'Archie', type: 'bg', baseCost: 200, cost: 200, effect: "url('img/archie.JPG')" },
    { title: 'Molecule', type: 'pps', baseCost: 1000, cost: 1000, effect: 5 },
    { title: 'Mixures', type: 'ppc', baseCost: 1000, cost: 1000, effect: 5 },
    { title: 'Tissue', type: 'pps', baseCost: 5000, cost: 5000, effect: 8 },
    { title: 'Organ', type: 'ppc', baseCost: 6000, cost: 6000, effect: 8.5},
    { title: 'System', type: 'pps', baseCost: 20000, cost: 20000, effect: 15.2 },
    { title: 'David (The Hot One)', type: 'bg', baseCost: 30000, cost: 30000, effect: "url('img/davidBG.JPG')" },
];

// Intervals
setInterval(secondFunction, 1000);
// Save game periodically
setInterval(saveGame, 10000);
setInterval(interest, 30000);


// Function declarations
function clicker() {
    points += ppc;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("points").innerHTML = Math.abs(formatNumber(points));
    document.getElementById('pps').innerHTML = formatNumber(pps) + " PPS";
    document.getElementById('bankPoints').innerHTML = formatNumber(bankPoints);
}

function secondFunction() {
    points += pps;
    updateDisplay();
}

function createUpgradeButtons() {
    const upgradesContainer = document.getElementById('upgrades');
    upgradesContainer.innerHTML = ''; // Clear any existing buttons

    upgrades.forEach((upgrade, index) => {
        const button = document.createElement('button');
        button.id = `upgrade-${index}`;
        if (upgrade.type === 'ppc' || upgrade.type === 'pps') {
            button.innerHTML = `${upgrade.title} (Cost: ${upgrade.cost} Gives: ${upgrade.effect} ${upgrade.type})`;
        } else {
            button.innerHTML = `${upgrade.title} (Cost: ${upgrade.cost})`;
        }
        button.onclick = () => buyUpgrade(index);
        upgradesContainer.appendChild(button);
    });
}

function buyUpgrade(index) {
    const upgrade = upgrades[index];
    if (points >= upgrade.cost - 0.001) {
        points -= upgrade.cost;
        if (upgrade.type === 'ppc') ppc += upgrade.effect;
        if (upgrade.type === 'pps') pps += upgrade.effect;
        if (upgrade.type === 'bg') {
            background = upgrade.effect;
            document.body.style.background = upgrade.effect;
        }
        if(upgrade.type === 'ppc' || upgrade.type === 'pps'){
        upgrade.cost = Math.floor(upgrade.cost * 1.2); // Increase cost exponentially
        document.getElementById(`upgrade-${index}`).innerHTML = `${upgrade.title} (Cost: ${upgrade.cost} Gives: ${upgrade.effect} ${upgrade.type})`;
        }
        updateDisplay();
        saveGame();
    } else {
        alert('Not enough points to buy this upgrade!');
    }
}

// Save the game state to localStorage
function saveGame() {
        if(gameEvent === false){
    const gameState = {
        points: points,
        ppc: ppc,
        pps: pps,
        upgrades: upgrades,
        background: background, // Save the background
        bankPoints: bankPoints
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}}


// Load the game state from localStorage
function loadGame() {
    const savedGame = localStorage.getItem('gameState');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        points = gameState.points;
        ppc = gameState.ppc;
        pps = gameState.pps;
        upgrades = gameState.upgrades;
        background = gameState.background; // Load the background
        bankPoints = gameState.bankPoints;

        // Apply background upgrade if already purchased
        if (background) {
            document.body.style.background = background;
        }
    }
    updateDisplay();
    createUpgradeButtons();
}

// Initialize the game
loadGame();
createUpgradeButtons();

// bank
function interest(){
    if (bankPoints > 0){
        bankPoints = bankPoints * 1.009;
    }
}

// bank buttons
function depositAll(){
    bankPoints = bankPoints + points;
    points = 0;
    updateDisplay();
}
function depositHalf(){
    bankPoints = bankPoints + points * 0.5;
    points = points * 0.5;
    updateDisplay();
}
function withdrawAll(){
    points = points + bankPoints;
    bankPoints = 0;
    updateDisplay();
}
function withdrawHalf(){
    points = points + bankPoints * 0.5;
    bankPoints = bankPoints * 0.5;
    updateDisplay();
}

// buttons
function bankButton(){
    saveGame();
    window.location.href = "bank.html";
}
function homeButton(){
    saveGame();
    window.location.href = "index.html";
}
function casinoButton(){
    saveGame();
    window.location.href = "casino.html";
}

// reset button
function resetGame() {
    points = 0;
    ppc = 0.1;
    pps = 0;
    bankPoints = 0;
    background = '';
    upgrades = [
        { title: 'Quark', type: 'ppc', baseCost: 10, cost: 10, effect: 0.1 },
        { title: 'Proton', type: 'pps', baseCost: 20, cost: 20, effect: 0.1 },
        { title: 'Atom', type: 'pps', baseCost: 100, cost: 100, effect: 1.1 },
        { title: 'Atom Accelerator', type: 'ppc', baseCost: 100, cost: 100, effect: 1.1 },
        { title: 'Archie', type: 'bg', baseCost: 200, cost: 200, effect: "url('img/archie.JPG')" },
        { title: 'Molecule', type: 'pps', baseCost: 1000, cost: 1000, effect: 5 },
        { title: 'Mixures', type: 'ppc', baseCost: 1000, cost: 1000, effect: 5 },
        { title: 'Tissue', type: 'pps', baseCost: 5000, cost: 5000, effect: 8 },
        { title: 'Organ', type: 'ppc', baseCost: 6000, cost: 6000, effect: 8.5},
        { title: 'System', type: 'pps', baseCost: 20000, cost: 20000, effect: 15.2 },
        { title: 'David (The Hot One)', type: 'bg', baseCost: 30000, cost: 30000, effect: "url('img/davidBG.JPG')" },
    ];
    document.body.style.background = '';
    updateDisplay();
    createUpgradeButtons();
    saveGame();
}


// casino stuff
function coinflip(){
    var input = document.getElementById("casinoPoints").value;
    if (input <= points){
        const result = Math.floor(Math.random() * 2);
        if (result === 0) {
            // Win scenario (double the points)
            const winnings = +input;
            points = points + winnings;
            alert(`You won the coinflip and doubled your points! You earned ${formatNumber(winnings)} points.`);
        } else {
            points = points - +input;
            alert(`You lost the coinflip idiot`)
        }
    }
}
    var slot1 = document.getElementById('slot1');
    var slot2 = document.getElementById('slot2');
    var slot3 = document.getElementById('slot3');
    var pointsDisplay = document.getElementById('points');
    var spinButton = document.getElementById('spin-button');
    var resultDisplay = document.getElementById('result');


    function spin() {
        if (points <= 0) {
            document.getElementById("result").innerHTML = 'You have no points left!';
            return;
        }

        const cost = Math.ceil(points * 0.5);
        points = points - cost;

        let spins = 20; // Number of "spins" to animate
        const spinInterval = 50; // Time between each spin (ms)

        const animateSpins = () => {
            if (spins > 0) {
                document.getElementById("slot1").innerHTML = getRandomSlot();
                document.getElementById("slot2").innerHTML = getRandomSlot();
                document.getElementById("slot3").innerHTML = getRandomSlot();
                spins--;
                setTimeout(animateSpins, spinInterval);
            } else {
                finalizeSpin(cost);
            }
        };

        animateSpins();
    };

    function finalizeSpin(cost){
        const results = [getRandomSlot(), getRandomSlot(), getRandomSlot()];

        document.getElementById("slot1").innerHTML = results[0];
        document.getElementById("slot2").innerHTML = results[1];
        document.getElementById("slot3").innerHTML = results[2];

        let message = '';
        if (results[0] === results[1] && results[1] === results[2]) {
            const reward = cost * 5;
            points += reward;
            message = `Jackpot! You won ${reward} points!`;
        } else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
            const reward = cost * 2;
            points += reward;
            message = `You won ${reward} points!`;
        } else {
            message = 'You lost! Better luck next time.';
        }

        document.getElementById("result").innerHTML = message;
    };

    function getRandomSlot() {
        const skewedRandom = Math.random();
        if (skewedRandom < 0.8) {
            return Math.floor(Math.random() * 5) + 3; // More likely to lose with higher numbers
        } else {
            return Math.floor(Math.random() * 3); // Less likely to win with lower numbers
        }
    };



// events
var eventImage = document.getElementById("eventImage");
eventImage.style.display = "none";

function gameEventImage(){
    const rng = Math.floor(Math.random() * 3 + 1);
    if(rng === 1){
        eventImage.style.display = "block";
        eventImage.src = "img/positive.png";
        gameEvent = true;
        const oldpps = pps;
        const oldppc = ppc;
        pps = pps * 2;
        ppc = ppc * 2;
        setTimeout(() => {
            pps = pps - oldpps;
        }, 5000);
        
        setTimeout(() => {
            ppc = ppc - oldppc;
        }, 5000);

        setTimeout(() => {
            gameEvent = false;
        }, 5000);
        
        setTimeout(() => {
            eventImage.style.display = "none";
        }, 5000);
    } if (rng === 2){
        eventImage.style.display = "block";
        eventImage.src = "img/desire.png";
        points = 0;
        setTimeout(() => {
            eventImage.style.display = "none";
        }, 5000);
        
    }
    if (rng === 3){
        eventImage.style.display = "block";
        eventImage.src = "img/Untitled-1.png";
        background = '';
        document.body.style.background = "";
        setTimeout(() => {
            eventImage.style.display = "none";
        }, 5000);
    }
}
function formatNumber(num) {
    if (num >= 1e12) {
        return (num / 1e12).toFixed(1) + 'T'; // Divide by 1 trillion and append 'T'
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'B'; // Divide by 1 billion and append 'B'
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M'; // Divide by 1 million and append 'M'
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K'; // Divide by 1 thousand and append 'K'
    }
    return num.toLocaleString(); // Return the number as a string if less than 1 thousand
}