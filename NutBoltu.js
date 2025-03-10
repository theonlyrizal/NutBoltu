document.getElementById('toggleSignup').addEventListener('click', function() {
    document.getElementById('loginBtn').textContent = 'Sign Up';
    this.textContent = 'Already have an account? Login';
});