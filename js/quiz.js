document.addEventListener('DOMContentLoaded', () => {
    const quizSection = document.querySelector('#quiz-section');
    const questionTitle = document.querySelector('#question-title');
    const optionsContainer = document.querySelector('#options-container');
    const previousButton = document.querySelector('#previous-button');
    const nextButton = document.querySelector('#next-button');
    const submitButton = document.querySelector('#submit-button');
  
    let quizId = '';
    let currentQuestionIndex = 0;
    let selectedOption = null;
    let quizData = null;
  
    // Function to fetch the quiz data from the server
    async function fetchQuiz() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        quizId = urlParams.get('id');
        const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`);
        const data = await response.json();
        quizData = data.quiz;
        // alert(JSON.stringify(quizData));


  
        renderQuestion(quizData);
        updateNavigationButtons();
      } catch (error) {
        console.error(error);
        alert('Failed to fetch quiz. Please try again.');
      }
    }
  
    // Function to render the current question
    function renderQuestion() {
      const currentQuestion = quizData.questions[currentQuestionIndex];
  
      questionTitle.textContent = currentQuestion.title;
  
      optionsContainer.innerHTML = '';
      currentQuestion.answerOptions.forEach((option, index) => {
        const optionContainer = document.createElement('div');
        optionContainer.classList.add('option');
  
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = 'answer-option';
        optionInput.value = index;
        optionInput.id = `option-${index}`;
        optionInput.addEventListener('change', () => {
          selectedOption = parseInt(optionInput.value);
          updateSelectedOptions();
        });
  
        const optionLabel = document.createElement('label');
        optionLabel.htmlFor = `option-${index}`;
        optionLabel.textContent = option;
  
        optionContainer.appendChild(optionInput);
        optionContainer.appendChild(optionLabel);
  
        optionsContainer.appendChild(optionContainer);
      });
    }
  
    // Function to update the selected options styling
    function updateSelectedOptions() {
      const options = Array.from(optionsContainer.querySelectorAll('input[type="radio"]'));
      options.forEach((option) => {
        const optionContainer = option.parentElement;
        optionContainer.classList.remove('selected');
  
        if (option.checked) {
          optionContainer.classList.add('selected');
        }
      });
    }
  
    // Function to update the navigation buttons visibility
    function updateNavigationButtons() {
      previousButton.disabled = currentQuestionIndex === 0;
      nextButton.disabled = currentQuestionIndex === quizData.questions.length - 1;
  
      if (currentQuestionIndex === quizData.questions.length - 1) {
        submitButton.style.display = 'block';
        nextButton.style.display = 'none';
      } else {
        submitButton.style.display = 'none';
        nextButton.style.display = 'block';
      }
    }
  
    // Event listener for previous button click
    previousButton.addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        updateNavigationButtons();
      }
    });
  
    // Event listener for next button click
    nextButton.addEventListener('click', () => {
      if (currentQuestionIndex < quizData.questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        updateNavigationButtons();
      }
    });
  
    // Event listener for submit button click
    submitButton.addEventListener('click', () => {
      // Calculate the score and redirect to the leaderboard page
      const score = calculateScore();
      const leaderboardURL = `leaderboard.html?id=${quizId}`;
      window.location.href = leaderboardURL;
    });
  
    // Function to calculate the score
    function calculateScore() {
      let score = 0;
  
      quizData.questions.forEach((question, index) => {
        const selectedOptions = optionsContainer.querySelectorAll('input[type="radio"]:checked');
        const selectedOptionsIndexes = Array.from(selectedOptions).map((option) => parseInt(option.value));
  
        if (arraysEqual(selectedOptionsIndexes, question.correctOptions)) {
          score++;
        }
      });
  
      return score;
    }
  
    // Function to compare two arrays for equality
    function arraysEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length !== b.length) return false;
  
      for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
  
      return true;
    }
  
    // Fetch the quiz when the page loads
    fetchQuiz();
  });
  