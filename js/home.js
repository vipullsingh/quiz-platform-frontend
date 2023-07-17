// client/js/home.js

// Function to handle form submission for user registration
function handleRegistration(event) {
    event.preventDefault();
    
    // Get the form data
    const usernameInput = document.querySelector('#username');
    const emailInput = document.querySelector('#email');
    
    const username = usernameInput.value;
    const email = emailInput.value;

    // TODO: Perform validation on the form data
    if (!username || !email) {
      displayError('Please fill in all the fields.');
      return;
    }
    
    // Create an object with the user registration data
    const userData = {
      username: username,
      email: email
    };
    
    // Send a POST request to register the user
    fetch('http://localhost:3000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log('User registration successful:', data);
        alert('Registration successful!');
        // Redirect to the dashboard page after a short delay
        setTimeout(() => {
          window.location.href = './dashboard.html';
        }, 2000);
      })
      .catch(error => {
        // Handle any errors
        alert('An error occurred during registration. Please try again later.');
        console.error('Error registering user:', error);
      });
  }
  
  // Event listener for the registration form submission
  const registrationForm = document.querySelector('#registration-form');
  registrationForm.addEventListener('submit', handleRegistration);
  
  