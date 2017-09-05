(() => {

    const inputValueNotEmpty = (input) => input.value.trim().length > 0;
    const validNumber = (value) => value.match(/^[ 0-9]+$/) != null;
    const validNumberWithDot = (value) => value.match(/^\d*(\.\d\d?)?$/) != null;

    const accountNativeSelect = document.getElementById('account-select');
    const accountCustomSelect = document.querySelector('div.account-custom-select');
    function validateTransferAccount() {
        let valid = inputValueNotEmpty(accountNativeSelect);
        if (!valid) {
            accountCustomSelect.classList.add('custom-select-error')
        } else {
            accountCustomSelect.classList.remove('custom-select-error');
        }
    }
    accountNativeSelect.addEventListener('blur', validateTransferAccount);

    const recipientInput = document.getElementById('recipient');
    const recipientInputContainer = document.querySelectorAll('div.input-container')[0];
    function validateTransferRecipient() {
        let valid = inputValueNotEmpty(recipientInput);
        if (!valid) {
            recipientInputContainer.classList.add('input-select-error');
        } else {
            recipientInputContainer.classList.remove('input-select-error');
        }
    }
    recipient.addEventListener('blur', validateTransferRecipient);

    const numberInput = document.getElementById('number');
    function validateTransferNumber() {
        let numberLength = numberInput.value.replace(/\s/g,'').length;
        let valid = (validNumber(numberInput.value) && numberLength == 26);
        if(!valid) {
            numberInput.classList.add('input-select-error');
        } else {
            numberInput.classList.remove('input-select-error');
        }
    }
    numberInput.addEventListener('blur', validateTransferNumber);

    const sumInput = document.getElementById('sum');
    function validateTransferSum() {
        let numberFormat = sumInput.value.trim().replace(/[,]/g, '.');
        let valid = inputValueNotEmpty(sumInput) && validNumberWithDot(numberFormat);
        if (!valid) {
            sumInput.classList.add('input-select-error');
        } else {
            sumInput.classList.remove('input-select-error');
        }
    }
    sumInput.addEventListener('blur', validateTransferSum);

    const currencySelect = document.getElementById('currency-select');
    function validateTransferCurrency() {
        let valid = currencySelect.value.length > 0;
        if (!valid) {
            currencySelect.classList.add('input-select-error');
        } else {
            currencySelect.classList.remove('input-select-error');
        }
    }
    currencySelect.addEventListener('blur', validateTransferCurrency);

    // TODO define date format
    const whenInput = document.getElementById('when');
    const whenContainer = document.querySelectorAll('div.input-container')[1];
    function validateTransferDate() {
        let valid = inputValueNotEmpty(whenInput)
        if (!valid) {
            whenContainer.classList.add('input-select-error');
        } else {
            whenContainer.classList.remove('input-select-error');
        }
    }
    whenInput.addEventListener('blur', validateTransferDate);

    const titleInput = document.getElementById('title');
    function validateTransferTitle() {
        let valid = inputValueNotEmpty(title);
        if (!valid) {
            titleInput.classList.add('input-select-error');
        } else {
            titleInput.classList.remove('input-select-error');
        }
    }
    titleInput.addEventListener('blur', validateTransferTitle);

    const typeRbWrappersList = document.querySelectorAll('div.type-icon-bg');
    function validateTransferType() {
        const transferTypeSelected = document.querySelector('input[name=transfer-type]:checked');
        if(!transferTypeSelected) {
            typeRbWrappersList.forEach(element => element.classList.add('type-icon-bg-error'));
        } else {
            typeRbWrappersList.forEach(element => element.classList.remove('type-icon-bg-error'));
        }
    }

    const whereRbWrappersList = document.querySelectorAll('div.where-rb-wrapper');
    function validateTransferWhere() {
        const transferWhereSelected = document.querySelector('input[name=transfer-where]:checked');
        if (!transferWhereSelected) {
            whereRbWrappersList.forEach(element => element.classList.add('rb-wrapper-error'));
        } else {
            whereRbWrappersList.forEach(element => element.classList.remove('rb-wrapper-error'));
        }
    }

    const optionRbWrappersList = document.querySelectorAll('div.option-rb-wrapper');
    function validateTransferOption() {
        const transferOptionSelected = document.querySelector('input[name=transfer-options]:checked');
        if (!transferOptionSelected) {
            optionRbWrappersList.forEach(element => element.classList.add('rb-wrapper-error'));
        } else {
            optionRbWrappersList.forEach(element => element.classList.remove('rb-wrapper-error'));
        }
    }

    const continueBtn = document.querySelector('a.continue');
    continueBtn.addEventListener('click', function() {
        validateTransferAccount();        
        validateTransferType();
        validateTransferRecipient();
        validateTransferWhere();
        validateTransferNumber();
        validateTransferSum();
        validateTransferCurrency();
        validateTransferDate();
        validateTransferTitle();
        validateTransferOption();
    });
})();
