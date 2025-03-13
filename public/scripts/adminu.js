// Function to validate the form
function validateForm() { 
    let isValid = true;

    const firstname = document.getElementById("firstname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    
    // Validate username
    if (firstname === "") {
        alert("Name cannot be empty.");
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(firstname)) {
        alert("Name contains invalid characters. Please use letters only.");
        isValid = false;
    }

    // Validate email
    if (email === "") {
        alert("Email cannot be empty.");
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email format. Please enter a valid email address.");
        isValid = false;
    }

    // Validate password
    if (password === "") {
        alert("Password cannot be empty.");
        isValid = false;
    } else if (password.length < 6) {
        alert("Password should be at least 6 characters long.");
        isValid = false;
    }

    // Final check if all fields are valid
    if (isValid) {
        alert("Form is valid. Submitting...");
    } else {
        alert("Please correct the errors in the form.");
    }

    return isValid;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        validateForm(); // Call the validation function when the form is submitted
    });
});
