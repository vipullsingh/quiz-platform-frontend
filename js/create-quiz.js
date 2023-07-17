document.addEventListener('DOMContentLoaded', () => {
    const createQuizForm = document.querySelector('#create-quiz-form');
    const questionsContainer = document.querySelector('#questions-container');
  
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
    createQuizForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const quizCreator = document.querySelector('#quiz-creator').value;
      const quizTitle = document.querySelector('#quiz-title').value;
      const quizDescription = document.querySelector('#quiz-description').value;
      const numQuestions = parseInt(document.querySelector('#num-questions').value);
  
      if (questions.length === numQuestions) {
        // Prepare the quiz data to send to the server
        const quizData = {
          creator: quizCreator,
          title: quizTitle,
          description: quizDescription,
          questions: questions.map((_, index) => {
            const questionInput = document.querySelector(`input[name='question-${index}']`);
            const answerOptionInputs = document.querySelectorAll(`input[name='answer-option-${index}']`);
            const correctOptionsInput = document.querySelector(`input[name='correct-options-${index}']`);
  
            const answerOptions = Array.from(answerOptionInputs).map((input) => input.value);
            const correctOptions = correctOptionsInput.value
              .split(',')
              .map((option) => parseInt(option.trim()));
  
            return {
              title: questionInput.value,
              answerOptions,
              correctOptions,
            };
          }),
        };
  
        try {
          // Send the quiz data to the server
          const response = await fetch('https://quiz-feus.onrender.com/api/quizzes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizData),
          });
  
          if (!response.ok) {
            throw new Error('Failed to create quiz');
          }
  
          // Clear the form and questions
          createQuizForm.reset();
          questionsContainer.innerHTML = '';
          questions = [];
  
          alert('Quiz created successfully!');
        } catch (error) {
          console.error(error);
          alert('Failed to create quiz. Please try again.');
        }
      }
    });
  
    // Event listener for the number of questions input
    document.querySelector('#num-questions').addEventListener('input', (event) => {
      const numQuestions = parseInt(event.target.value);
      questions = Array(numQuestions).fill('');
      renderQuestions();
    });
  
    // Function to render the questions in the form
    function renderQuestions() {
      questionsContainer.innerHTML = '';
  
      questions.forEach((_, index) => {
        const questionField = createQuestionField(index);
        questionsContainer.appendChild(questionField);
      });
    }
  });
  