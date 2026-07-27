const defaultUsername = 'ghost';
const defaultPassword = '1234';

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const loginContainer = document.querySelector('.login-container');
    const successMessage = document.getElementById('successMessage');

    if (username === defaultUsername && password === defaultPassword) {
        errorMessage.textContent = '';
        loginContainer.style.display = 'none';
        successMessage.style.display = 'block';
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});
