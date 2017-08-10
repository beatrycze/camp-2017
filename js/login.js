(() => {

    const login = document.getElementById('userLogin');
    const password = document.getElementById('userPassword');
    const button = document.getElementsByClassName('button')[0];
    const errorLogin = document.querySelector('p.login');
    const errorPassword = document.querySelector('p.password');

    const validationMessage = document.querySelector('div.validation-message');

    // console.log(login, password, button);

    // const acceptLogin = () => {
    //     login.classList.remove('error');
    //     errorLogin.classList.add('hidden');
    // }

    // const displayLoginError = () => {
    //     login.classList.add('error');
    //     errorLogin.classList.remove('hidden');
    // }

    // const acceptPassword = () => {
    //     password.classList.remove('error');
    //     errorPassword.classList.add('hidden');
    // }

    // const displayPasswordError = () => {
    //     password.classList.add('error');
    //     errorPassword.classList.remove('hidden');
    // }

    // button.addEventListener('click', event => {
    //     if (!login.value && password.value) { // login empty
    //         acceptPassword();
    //         displayLoginError();
    //     } else if (login.value && !password.value) { // password empty
    //         acceptLogin();
    //         displayPasswordError();
    //     } else if (!login.value && !password.value) { // login & password empty
    //         displayLoginError();
    //         displayPasswordError();
    //     } else { // login & password not empty
    //         acceptLogin();
    //         acceptPassword();
    //         window.setTimeout(function() {
    //             window.location = "./index.html";
    //         }, 500);
    //         // console.log(login.value, password.value);
    //     }
    //     event.preventDefault();
    // });

    button.addEventListener('click', event => {
        event.preventDefault();
        $.ajax({
            type: "post",
            data: {
                login: login.value,
                password: password.value
            },
            url: "https://efigence-camp.herokuapp.com/api/login",
            error: function(response) {
                // console.log(response);
                login.classList.add('error');
                password.classList.add('error');
                validationMessage.classList.remove('hidden');
                validationMessage.innerHTML=response.responseJSON.message;
            },
            success: function(response) {
                window.location = "./index.html";
            }
        });
    });

})();
