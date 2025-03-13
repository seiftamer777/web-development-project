function validateLogin(event) {
    // Prevent the form from submitting by default
    event.preventDefault();

    const loginUsername = document.getElementById('loginUsername').value.trim();
    const loginPassword = document.getElementById('loginPassword').value;

    // Hardcoded credentials check
    if (loginUsername === 'youssef22' && loginPassword === 'seiftamer@1') {
        // Redirect to the adminu route
        window.location.href = '/admin';
    } else {
        // Retrieve user object from localStorage
        const storedUserJSON = localStorage.getItem('user');
        const storedUser = JSON.parse(storedUserJSON);

        if (storedUser && storedUser.username === loginUsername && storedUser.password === loginPassword) {
            // Redirect to another page if login is successful
            window.location.href = 'D:/Web Development/project/html files/Home.html'; // Change this to your desired URL
        } else {
            alert("Invalid Username or password!");
        }
    }
}
function redirectToHome(){
    window.location.href = '/Home';
}