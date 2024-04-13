// Variables for gamification
let points = 0;
let badgesEarned = [];

// Function to update progress bar
function updateProgressBar() {
  const progressBar = document.getElementById('progressBar');
  const progressPercentage = (points / 1000) * 100; // Assuming 1000 points for full progress
  progressBar.style.width = `${progressPercentage}%`;
}

// Function to update badges
function updateBadges() {
  const badges = document.getElementById('badges');
  badges.innerHTML = '<h3>Badges</h3><ul>';
  badgesEarned.forEach(badge => {
    badges.innerHTML += `<li>${badge}</li>`;
  });
  badges.innerHTML += '</ul>';
}

// Function to update leaderboard
function updateLeaderboard() {
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '<h3>Leaderboard</h3><ol>';
  // Dummy data for demonstration
  const players = [
    { name: 'Player 1', points: 500 },
    { name: 'Player 2', points: 400 }
  ];
  players.forEach(player => {
    leaderboard.innerHTML += `<li>${player.name} - ${player.points} points</li>`;
  });
  leaderboard.innerHTML += '</ol>';
}

// Function to award points
function awardPoints(amount) {
  points += amount;
  updateProgressBar();
}

// Function to unlock badges
function unlockBadge(badge) {
  if (!badgesEarned.includes(badge)) {
    badgesEarned.push(badge);
    updateBadges();
  }
}

// Original functions from the previous script

const accentSelector = document.getElementById('accentSelector');
const learningArea = document.getElementById('learningArea');
const textToSpeak = document.getElementById('textToSpeak');
const userInput = document.getElementById('userInput');
const feedback = document.getElementById('feedback');

// Sample text to speak for American and British accents
const americanText = "How are you doing today?";
const britishText = "How are you today?";

function startLearning() {
  const selectedAccent = accentSelector.value;
  if (selectedAccent === 'american') {
    textToSpeak.textContent = americanText;
  } else if (selectedAccent === 'british') {
    textToSpeak.textContent = britishText;
  }
  learningArea.style.display = 'block';
}

function checkAnswer() {
  const selectedAccent = accentSelector.value;
  const userAnswer = userInput.value.trim().toLowerCase();
  let correctAnswer;
  if (selectedAccent === 'american') {
    correctAnswer = americanText.toLowerCase();
  } else if (selectedAccent === 'british') {
    correctAnswer = britishText.toLowerCase();
  }

  if (userAnswer === correctAnswer) {
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    awardPoints(100); // Award 100 points for correct answer
    unlockBadge('Accent Master'); // Unlock "Accent Master" badge
  } else {
    feedback.textContent = "Incorrect. Try again.";
    feedback.style.color = "red";
  }
}
function callAI() {
  const inputText = document.getElementById('inputText').value;
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
  const apiUrl = 'https://api-inference.huggingface.co/models/dima806/english_accents_classification';

  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
          prompt: inputText,
          max_tokens: 150
      })
  })
  .then(response => response.json())
  .then(data => {
      console.log('API Response:', data); // Log the response for debugging
      if (data && data.choices && data.choices.length > 0) {
          document.getElementById('outputText').innerText = data.choices[0].text.trim();
      } else {
          console.error('Invalid API response:', data);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
