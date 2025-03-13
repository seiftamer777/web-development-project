// validation.js

function validateForm() {
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const quantity = document.getElementById('quantity').value.trim();
    const price = document.getElementById('price').value.trim();
    const images = document.getElementById('images').value.trim();
    const category = document.getElementById('category').value.trim();
    const ratingsAverage = document.getElementById('ratingsAverage').value.trim();

    // Validate name
    if (name === "") {
        alert("Product name cannot be empty.");
        isValid = false;
    } else if (name.length < 3 || name.length > 100) {
        alert("Product name must be between 3 and 100 characters.");
        isValid = false;
    }

    // Validate description (optional, minlength 20)
    if (description.length > 0 && description.length < 20) {
        alert("Product description must be at least 20 characters.");
        isValid = false;
    }

    // Validate quantity
    if (quantity === "") {
        alert("Quantity cannot be empty.");
        isValid = false;
    } else if (isNaN(quantity) || parseInt(quantity) <= 0) {
        alert("Quantity must be a positive number.");
        isValid = false;
    }

    // Validate price
    if (price === "") {
        alert("Price cannot be empty.");
        isValid = false;
    } else if (isNaN(price) || parseFloat(price) <= 0) {
        alert("Price must be a positive number.");
        isValid = false;
    }
    // Validate images (optional, comma-separated URLs)
    if (images.length > 0) {
        const imageArray = images.split(',').map(image => image.trim());
        imageArray.forEach(image => {
            // Basic URL format check
            if (image === "" || !isValidUrl(image)) {
                alert("Invalid image URL format.");
                isValid = false;
            }
        });
    }

    // Validate category (optional)
    if (category.length > 50) {
        alert("Category must not exceed 50 characters.");
        isValid = false;
    }
    // Validate ratingsAverage (optional, min 1, max 5)
    if (ratingsAverage !== "" && (isNaN(ratingsAverage) || parseFloat(ratingsAverage) < 1 || parseFloat(ratingsAverage) > 5)) {
        alert("Ratings average must be between 1 and 5.");
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
