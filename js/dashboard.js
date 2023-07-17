document.addEventListener('DOMContentLoaded', () => {
    const createQuizForm = document.querySelector('#create-quiz-form');
    const questionsContainer = document.querySelector('#questions-container');
    const quizzesContainer = document.querySelector('#quizzes-container');
  
    let questions = [];
  
    // Function to create a question input field
    function createQuestionField(questionIndex) {
      const questionField = document.createElement('div');
      questionField.classList.add('question-field');
  
      const questionTitle = document.createElement('label');
      questionTitle.textContent = `Question ${questionIndex + 1}:`;
      questionField.appendChild(questionTitle);
  
      const questionInput = document.createElement('input');
      questionInput.type = 'text';
      questionInput.name = `question-${questionIndex}`;
      questionInput.placeholder = 'Enter the question';
      questionField.appendChild(questionInput);
  
      const answerOptionsTitle = document.createElement('label');
      answerOptionsTitle.textContent = 'Answer Options:';
      questionField.appendChild(answerOptionsTitle);
  
      for (let i = 0; i < 4; i++) {
        const answerOptionInput = document.createElement('input');
        answerOptionInput.type = 'text';
        answerOptionInput.name = `answer-option-${questionIndex}`;
        answerOptionInput.placeholder = `Enter answer option ${i + 1}`;
        questionField.appendChild(answerOptionInput);
      }
  
      const correctOptionsTitle = document.createElement('label');
      correctOptionsTitle.textContent = 'Correct Options:';
      questionField.appendChild(correctOptionsTitle);
  
      const correctOptionsInput = document.createElement('input');
      correctOptionsInput.type = 'text';
      correctOptionsInput.name = `correct-options-${questionIndex}`;
      correctOptionsInput.placeholder = 'Enter correct options (comma-separated)';
      questionField.appendChild(correctOptionsInput);
  
      return questionField;
    }
  
    // Event listener for the form submission
    // createQuizForm.addEventListener('submit', async (event) => {
    //   event.preventDefault();
  
    //   const quizTitle = document.querySelector('#quiz-title').value;
    //   const quizDescription = document.querySelector('#quiz-description').value;
    //   const numQuestions = parseInt(document.querySelector('#num-questions').value);
  
    //   if (questions.length === numQuestions) {
    //     const quizData = {
    //       title: quizTitle,
    //       description: quizDescription,
    //       questions: questions.map((question, index) => {
    //         const answerOptions = [];
    //         const correctOptions = [];
  
    //         for (let i = 0; i < 4; i++) {
    //           answerOptions.push(document.querySelector(`input[name='answer-option-${index}'][value='${i}']`).value);
    //         }
  
    //         const correctOptionsInput = document.querySelector(`input[name='correct-options-${index}']`);
    //         const correctOptionsString = correctOptionsInput.value;
    //         correctOptions.push(...correctOptionsString.split(',').map((option) => parseInt(option.trim())));
  
    //         return {
    //           title: question,
    //           answerOptions,
    //           correctOptions,
    //         };
    //       }),
    //     };
  
    //     try {
    //       const response = await fetch('http://localhost:3000/api/quizzes/', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(quizData),
    //       });
  
    //       if (response.ok) {
    //         // Quiz created successfully
    //         createQuizForm.reset();
    //         questionsContainer.innerHTML = '';
    //         questions = [];
    //         alert('Quiz created successfully!');
    //       } else {
    //         // Error creating the quiz
    //         const errorData = await response.json();
    //         console.error('Error creating quiz:', errorData.message);
    //       }
    //     } catch (error) {
    //       console.error('Error creating quiz:', error);
    //     }
    //   }
    // });
  
    // Function to render the questions in the form
    function renderQuestions() {
      questionsContainer.innerHTML = '';
  
      questions.forEach((question, index) => {
        const questionField = createQuestionField(index);
        questionsContainer.appendChild(questionField);
      });
    }
  
    // Event listener for the number of questions input
    // document.querySelector('#num-questions').addEventListener('input', (event) => {
    //   const numQuestions = parseInt(event.target.value);
    //   questions = Array(numQuestions).fill('');
    //   renderQuestions();
    // });
  
    // Function to render the quizzes in the UI
    function renderQuizzes(quizzes) {
      quizzesContainer.innerHTML = '';
  
      quizzes.forEach((quiz) => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');
  
        const quizCreator = document.createElement('p');
        quizCreator.textContent = `Creator: ${quiz.creator}`;
        quizCard.appendChild(quizCreator);
  
        const quizTitle = document.createElement('h3');
        quizTitle.textContent = quiz.title;
        quizCard.appendChild(quizTitle);
  
        const quizDescription = document.createElement('p');
        quizDescription.textContent = quiz.description;
        quizCard.appendChild(quizDescription);
  
        const numQuestions = document.createElement('p');
        numQuestions.textContent = `No. of Questions: ${quiz.questions.length}`;
        quizCard.appendChild(numQuestions);
  
        const takeQuizButton = document.createElement('button');
        takeQuizButton.textContent = 'Take Quiz';
        takeQuizButton.addEventListener('click', () => {
          // Redirect to the quiz page for the selected quiz
          window.location.href = `quiz.html?id=${quiz._id}`;
        });
        quizCard.appendChild(takeQuizButton);
  
        const leaderboardButton = document.createElement('button');
        leaderboardButton.textContent = 'Leaderboard';
        leaderboardButton.addEventListener('click', () => {
          // Redirect to the leaderboard page for the selected quiz
          window.location.href = `leaderboard.html?id=${quiz.id}`;
        });
        quizCard.appendChild(leaderboardButton);
  
        quizzesContainer.appendChild(quizCard);
      });
    }
  
// Fetch the quizzes from the server
async function fetchQuizzes() {
  try {
    const response = await fetch('http://localhost:3000/api/quizzes/');
    const responseData = await response.json();

    if (response.ok) {
      // Quizzes fetched successfully
      const quizzesData = responseData.quizzes; // Extract the quizzes array from the response data
      renderQuizzes(quizzesData);
    } else {
      // Error fetching quizzes
      console.error('Error fetching quizzes:', responseData.message);
    }
  } catch (error) {
    console.error('Error fetching quizzes:', error);
  }
}

  
    // Call the fetchQuizzes function to populate the UI
    fetchQuizzes();
  });
  