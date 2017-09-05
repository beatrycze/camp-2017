(() => {

    const login = document.getElementById('userLogin');
    const password = document.getElementById('userPassword');
    const button = document.getElementsByClassName('button')[0];
    const validationMessage = document.querySelector('div.validation-message');

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
                login.classList.add('login-error');
                password.classList.add('login-error');
                validationMessage.classList.remove('hide');
                validationMessage.innerHTML=response.responseJSON.message;
            },
            success: function(response) {
                window.location = "./index.html";
            }
        });
    });

})();
