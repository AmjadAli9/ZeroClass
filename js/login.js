function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}
const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if (username === 'user' && password === 'password') {
      
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 5000); 

        const greetingMessage = document.createElement('div');
        greetingMessage.textContent = `Hello, ${username}!`;
        document.body.appendChild(greetingMessage);

        setTimeout(() => {
            greetingMessage.remove(); 
        }, 5000);
    } else {
        alert('Invalid username or password');
    }
