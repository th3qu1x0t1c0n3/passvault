document.getElementById('save').addEventListener('click', async () => {
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    await fetch('https://your-api-url.com/api/passwords', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ website, username, password }),
    });

    alert('Password saved successfully');
});
