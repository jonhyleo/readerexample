// Import our custom CSS
import '../scss/styles.scss';

// Display alert with username and password when the login button is clicked
const loginBtn = document.querySelector('.login-btn');
const form = document.getElementById('login-form');
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const username = form.querySelector('.username').value;
  const password = form.querySelector('.password').value;

  username && password && alert(`You have logged in with:\n\nUsername: ${username} Password: ${password}`);

  form.reset();
});
