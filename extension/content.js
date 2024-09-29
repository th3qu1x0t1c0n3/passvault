window.onload = () => {
    chrome.storage.sync.get(['username', 'password'], (data) => {
        const usernameField = document.querySelector('input[name="username"]');
        const passwordField = document.querySelector('input[name="password"]');

        if (usernameField && passwordField) {
            usernameField.value = data.username;
            passwordField.value = data.password;
        }
    });
};
