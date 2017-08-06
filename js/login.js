(() => {

    const login = document.getElementById('userLogin');
    const password = document.getElementById('userPassword');
    const button = document.getElementsByClassName('button')[0];
    const errorLogin = document.querySelector('p.login');
    const errorPassword = document.querySelector('p.password');

    // console.log(login, password, button);

    button.addEventListener('click', event => {
        if (!login.value && password.value) { // login empty
            password.classList.remove('error');
            errorPassword.classList.add('hidden');
            login.classList.add('error');
            errorLogin.classList.remove('hidden');
        } else if (login.value && !password.value) { // password empty
            login.classList.remove('error');
            errorLogin.classList.add('hidden');
            password.classList.add('error');
            errorPassword.classList.remove('hidden');
        } else if (!login.value && !password.value) { // login & password empty
            login.classList.add('error');
            password.classList.add('error');
            errorLogin.classList.remove('hidden');
            errorPassword.classList.remove('hidden');
        } else { // login & password not empty
            login.classList.remove('error');
            errorLogin.classList.add('hidden');
            password.classList.remove('error');
            errorPassword.classList.add('hidden');
            window.setTimeout(function() {
                window.location = "./index.html";
            }, 500);
            // console.log(login.value, password.value);
        }
        event.preventDefault();
    });

})();
