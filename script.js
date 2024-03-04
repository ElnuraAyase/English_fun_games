const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const typingBlock = document.getElementById('typingBlock');
const speedButton = document.getElementById('speedButton');
const topicButton = document.getElementById('topicButton');
const startButton = document.getElementById('startButton');

let words = []; // Array to store falling words
let typedLetters = ''; // String to store typed letters
let matchedWords = 0; // Number of words matched
let ongoingScore = 0; // Ongoing score (removed lastScore as it's not being used)
let speedLevel = 1; // Speed level: 0 for slow, 1 for medium, 2 for fast
const speeds = [0.5, 1, 2]; // Speed values for slow, medium, and fast
const speedLabels = ['Slow', 'Medium', 'Fast'];

let selectedTopic = 0; // Default topic index


const topics = [
    {
        name: 'Food',
        words: ["apple", "banana", "orange", "grape", "strawberry", "melon", "pear", "pineapple", "peach", "kiwi", "cherry", "blueberry", "watermelon", "apricot", "coconut", "fig", "mango", "papaya", "plum", "lemon", "lime", "grapefruit", "avocado", "blackberry", "raspberry", "nectarine", "cranberry", "date", "guava"] // Level A1 - Food
    },
    {
        name: 'Travel',
        words: ["vacation", "beach", "mountain", "hotel", "sightseeing", "passport", "ticket", "destination", "tourist", "flight", "cruise", "adventure", "souvenir", "guide", "explore", "journey", "resort", "culture", "excursion", "luggage", "seaside", "camping", "hostel", "itinerary", "visiting", "traveler", "backpacking", "sunscreen", "map"] // Level A1 - Travel
    },
    // Add more topics as needed
];

// Function to generate a random word
function generateWord() {
    const topicWords = topics[selectedTopic].words;
    const randomIndex = Math.floor(Math.random() * topicWords.length);
    const word = topicWords[randomIndex];
    return {
        text: word,
        x: Math.random() * (canvas.width - 100), // Random x-coordinate within canvas width
        y: 0, // Start from the top
        color: 'white' // Initial color
    };
}

// Function to draw the shooter sign (light blue line) and typed letters
function drawShooter() {
    ctx.clearRect(0, canvas.height - 50, canvas.width, 50); // Clear shooter area
    ctx.fillStyle = '#add8e6'; // Light blue color
    ctx.fillRect(canvas.width / 2 - 50, canvas.height - 30, 100, 2); // Draw shooter sign (line)
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(typedLetters, canvas.width / 2, canvas.height - 30); // Draw typed letters at the bottom center
}

// Function to draw the falling words
function drawWords() {
    ctx.clearRect(0, 0, canvas.width, canvas.height - 50); // Clear canvas except the shooter area
    words.forEach(word => {
        ctx.fillStyle = word.color;
        ctx.font = '20px Arial';
        ctx.fillText(word.text, word.x, word.y);
    });
}

// Function to move the falling words downward
function moveWords() {
    words.forEach(word => {
        word.y += speeds[speedLevel]; // Change the speed based on the speed level
    });
}

// Function to handle typing
function handleTyping(event) {
    const typedLetter = event.key.toLowerCase();
    
    if (event.key === 'Enter') {
        typedLetters = ''; // Clear typed letters when Enter key is pressed
    } else if (event.key === 'Backspace') {
        typedLetters = typedLetters.slice(0, -1); // Remove last character when Backspace key is pressed
    } else {
        typedLetters += typedLetter;
        let wordMatched = false; // Flag to track if a word has been matched
        // Check if any word matches the typed letters
        words.forEach((word, index) => {
            if (typedLetters === word.text) {
                words.splice(index, 1); // Remove the matched word
                matchedWords++; // Increment matched words count
                ongoingScore++; // Increment ongoing score
                typedLetters = ''; // Clear typed letters
                wordMatched = true; // Set flag to true
            }
        });
        if (wordMatched) {
            // Change color of matched word to yellow
            words.forEach(word => {
                if (word.color === 'yellow') {
                    word.color = 'white'; // Reset color of previously matched word to white
                }
            });
        }
    }
}

// Function to start a new game
function startGame() {
    gameRunning = true;
    gameLoop(); // Start the game loop
}

// Event listener for start game button
startButton.addEventListener('click', startGame);

// Function to update the game state
function update() {
    if (!gameRunning) return; // Exit if game is not running
    if (Math.random() < 0.01) { // Adjust the frequency of word generation
        words.push(generateWord());
    }
    moveWords();
}

// Function to render the game
function render() {
    if (!gameRunning) return; // Exit if game is not running
    drawWords();
    drawShooter(); // You need to implement this function for the shooter to appear
    // Draw top text
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText("Ongoing Score: " + ongoingScore, 10, 20); // Adjusted position for the score
    ctx.fillText("Matched Words: " + matchedWords, 10, 40); // Adjusted position for the matched words count
}

// Main game loop
function gameLoop() {
    if (!gameRunning) return; // Exit if game is not running
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Event listener for typing
window.addEventListener('keydown', handleTyping);

// Event listener for speed change button
speedButton.addEventListener('click', () => {
    if (!gameRunning) return; // Exit if game is not running
    speedLevel = (speedLevel + 1) % speeds.length; // Cycle through speed levels
    speedButton.textContent = `Change Speed (${speedLabels[speedLevel]})`;
});


