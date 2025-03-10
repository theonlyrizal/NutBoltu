document.getElementById('toggleSignup').addEventListener('click', function() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn.textContent === 'Login') {
        loginBtn.textContent = 'Sign Up';
        this.textContent = 'Already have an account? Login';
    } else {
        loginBtn.textContent = 'Login';
        this.textContent = "Don't have an account? Sign up";
    }
});