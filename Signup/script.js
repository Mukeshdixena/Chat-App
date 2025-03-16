document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    console.log({ name, email, phone, password });

    const response = await axios.post(`${CONFIG.API_BASE_URL}/api/postUser`, {
        username: name, email: email, phonenumber: phone, password: password
    });
    console.log(response);
});