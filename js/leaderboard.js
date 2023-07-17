// Retrieve the quiz ID from the URL params
const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('id');

// Function to fetch the leaderboard data from the server
async function fetchLeaderboard() {
  try {
    const response = await fetch(`http://localhost:3000/api/leaderboard/${quizId}`);
    const data = await response.json();
    const leaderboard = data.leaderboard;

    // Display the leaderboard rankings
    renderLeaderboard(leaderboard);
  } catch (error) {
    console.error(error);
    alert('Failed to fetch leaderboard. Please try again.');
  }
}

// Function to render the leaderboard rankings
function renderLeaderboard(leaderboard) {
  const leaderboardContainer = document.querySelector('#leaderboard-container');

  // Clear the leaderboard container
  leaderboardContainer.innerHTML = '';

  // Render each entry in the leaderboard
  leaderboard.forEach((entry) => {
    const entryElement = document.createElement('div');
    entryElement.classList.add('leaderboard-entry');

    const rankElement = document.createElement('span');
    rankElement.textContent = `Rank: ${entry.rank}`;
    entryElement.appendChild(rankElement);

    const emailElement = document.createElement('span');
    emailElement.textContent = `Email: ${entry.email}`;
    entryElement.appendChild(emailElement);

    const scoreElement = document.createElement('span');
    scoreElement.textContent = `Score: ${entry.score}`;
    entryElement.appendChild(scoreElement);

    leaderboardContainer.appendChild(entryElement);
  });
}

// Fetch the leaderboard data when the page loads
fetchLeaderboard();
