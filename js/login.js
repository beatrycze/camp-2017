(() => {

    const login = document.getElementById('userLogin');
    const password = document.getElementById('userPassword');
    const button = document.getElementsByClassName('button')[0];
    const errorText = document.querySelector('p.hidden');

    // console.log(login, password, button);

    button.addEventListener('click', event => {
        if(login.value) {
            login.classList.remove('error');            
            errorText.classList.add('hidden');
            window.setTimeout(function(){
                window.location = "./index.html";
            }, 500);
            console.log( login.value );
        } else {
            login.classList.add('error');            
            errorText.classList.remove('hidden');
        }
        event.preventDefault();
    });

})();
