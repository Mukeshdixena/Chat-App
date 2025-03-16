document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const userData = { username: name, email, phonenumber: phone, password };

    console.log(userData);

    try {
        const response = await axios.post(`${CONFIG.API_BASE_URL}/api/postUser`, userData);

        if (response.status === 201) {
            // Redirect to the sign-in page on success
            window.location.href = "../index.html"; // Adjust this URL based on your sign-in page path
        }
    } catch (error) {
        console.error('Error submitting the form:', error);
        // Handle error, e.g., show a message to the user
    }
});
