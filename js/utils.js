// client/js/utils.js

// Function to display an error message
function displayError(message) {
    const errorContainer = document.querySelector('#error-container');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  }
  
  // Function to clear the error message
  function clearError() {
    const errorContainer = document.querySelector('#error-container');
    errorContainer.textContent = '';
    errorContainer.style.display = 'none';
  }
  
  // Function to display a success message
  function displaySuccess(message) {
    const successContainer = document.querySelector('#success-container');
    successContainer.textContent = message;
    successContainer.style.display = 'block';
  }
  
  // Function to clear the success message
  function clearSuccess() {
    const successContainer = document.querySelector('#success-container');
    successContainer.textContent = '';
    successContainer.style.display = 'none';
  }
  
  // export { displayError, clearError, displaySuccess, clearSuccess };
  