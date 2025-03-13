function CheckPassword(event) {
    // Prevent the form from submitting by default
    event.preventDefault();

    // Get form input values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Email validation
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Password strength validation
    if (!validatePassword(password)) {
        alert("Password must be at least 8 characters long and include a number and a special character.");
        return;
    }

    // Compare the values of the password and repeat password fields
    if (password !== repeatPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Create a user object to send to the server
    const user = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password
    };

    // Send a POST request to the server to save the user
    fetch('/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            console.log("User created:", data);
            // Redirect to login page after successful signup
            window.location.href = '/login';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Email validation function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Password strength validation function
function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

function redirectToHome(){
    window.location.href = '/Home';
}
