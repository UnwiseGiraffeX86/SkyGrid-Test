document.getElementById('login-button').addEventListener('click', () => {
    // Redirect the user to Google's authentication page
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth'
        + '?client_id=YOUR_CLIENT_ID'
        + '&redirect_uri=YOUR_REDIRECT_URI'
        + '&response_type=token'
        + '&scope=email profile';
});
