// client/js/api.js

// Function to make a POST request to create a quiz
async function createQuiz(quizData) {
    try {
      const response = await fetch('http://localhost:3000/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }
  }
  
  // Function to make a GET request to retrieve all quizzes
  async function getAllQuizzes() {
    try {
      const response = await fetch('http://localhost:3000/api/quizzes');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error retrieving quizzes:', error);
      throw error;
    }
  }
  
  // Function to make a GET request to retrieve a quiz by ID
  async function getQuizById(quizId) {
    try {
      const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error retrieving quiz:', error);
      throw error;
    }
  }
  
  // Function to make a PUT request to update a quiz by ID
  async function updateQuiz(quizId, quizData) {
    try {
      const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating quiz:', error);
      throw error;
    }
  }
  
  // Function to make a DELETE request to delete a quiz by ID
  async function deleteQuiz(quizId) {
    try {
      const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  }
  
  // Export the API functions
//   export { createQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz };
  