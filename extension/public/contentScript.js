console.log("Current page URL:", window.location.href);


const fillLoginForm = (username, password) => {
    const usernameField = document.querySelector('input[type="text"], input[type="email"]');

    const passwordField = document.querySelector('input[type="password"]');
    if (usernameField && passwordField) {
        usernameField.value = username;
        passwordField.value = password;
    }

};
