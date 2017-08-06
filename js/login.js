(() => {

    const login = document.getElementById('userLogin');
    const password = document.getElementById('userPassword');
    const button = document.getElementsByClassName('button')[0];
    const errorLogin = document.querySelector('p.login');
    const errorPassword = document.querySelector('p.password');

    // console.log(login, password, button);

    const acceptLogin = () => {
        login.classList.remove('error');
        errorLogin.classList.add('hidden');
    }

    const displayLoginError = () => {
        login.classList.add('error');
        errorLogin.classList.remove('hidden');
    }

    const acceptPassword = () => {
        password.classList.remove('error');
        errorPassword.classList.add('hidden');
    }

    const displayPasswordError = () => {
        password.classList.add('error');
        errorPassword.classList.remove('hidden');
    }

    button.addEventListener('click', event => {
        if (!login.value && password.value) { // login empty
            acceptPassword();
            displayLoginError();
        } else if (login.value && !password.value) { // password empty
            acceptLogin();
            displayPasswordError();
        } else if (!login.value && !password.value) { // login & password empty
            displayLoginError();
            displayPasswordError();
        } else { // login & password not empty
            acceptLogin();
            acceptPassword();
            window.setTimeout(function() {
                window.location = "./index.html";
            }, 500);
            // console.log(login.value, password.value);
        }
        event.preventDefault();
    });

})();
