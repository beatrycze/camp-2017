(() => {

    const login = document.getElementById('userLogin');
    const button = document.getElementsByClassName('button')[0];

    // console.log(login, button);

    button.addEventListener('click', event => {
        event.preventDefault();
        console.log( login.value );
    });

})();
