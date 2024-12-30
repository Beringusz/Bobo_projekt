document.querySelector('.autentificare-submit').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email_inst').value;
    const password = document.getElementById('parola').value;

    const response = await fetch('http://localhost:3000/check-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        alert('Server error. Please try again later.');
        return;
    }

    const result = await response.json();
    if (result.success) {
        window.open("adaugare.html");
    } else {
        alert('Invalid credentials. Please try again.');
    }
});
