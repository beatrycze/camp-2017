(() => {

    const fieldErrorClassName = 'input-select-error';
    const EXPECTED_ACCOUNT_LENGTH = 26;

    const inputValueNotEmpty = (input) => input.value.trim().length > 0;
    const validNumber = (value) => value.match(/^[ 0-9]+$/) != null;
    const validNumberWithDot = (value) => value.match(/^\d*(\.\d\d?)?$/) != null;

    const validate = (valid, selector, className) => {
        if (!valid) {
            selector.classList.add(className);
        } else {
            selector.classList.remove(className);
        }
    };

    const validateRadioButtons = (selector, rbList, className) => {
        if(!selector) {
            rbList.forEach(element => element.classList.add(className));
        } else {
            rbList.forEach(element => element.classList.remove(className));
        }
    };

    const validateRadioButtonsOnClick = (rbList, fn) => {
        rbList.forEach(element => element.addEventListener('click', fn));
    };

    const accountNativeSelect = document.getElementById('account-select');
    const accountCustomSelect = document.querySelector('div.account-custom-select');
    function validateTransferAccount() {
        let valid = inputValueNotEmpty(accountNativeSelect);
        validate(valid, accountCustomSelect, 'custom-select-error');
    }
    accountNativeSelect.addEventListener('blur', validateTransferAccount);

    const recipientInput = document.getElementById('recipient');
    const recipientInputContainer = document.querySelectorAll('div.input-container')[0];
    function validateTransferRecipient() {
        let valid = inputValueNotEmpty(recipientInput);
        validate(valid, recipientInputContainer, fieldErrorClassName);
    }
    recipient.addEventListener('blur', validateTransferRecipient);

    const numberInput = document.getElementById('number');
    function validateTransferNumber() {
        let numberLength = numberInput.value.replace(/\s/g,'').length;
        let valid = (validNumber(numberInput.value) && numberLength == EXPECTED_ACCOUNT_LENGTH);
        validate(valid, numberInput, fieldErrorClassName);
    }
    numberInput.addEventListener('blur', validateTransferNumber);

    const sumInput = document.getElementById('sum');
    function validateTransferSum() {
        let numberFormat = sumInput.value.trim().replace(/[,]/g, '.');
        let valid = inputValueNotEmpty(sumInput) && validNumberWithDot(numberFormat);
        validate(valid, sumInput, fieldErrorClassName);
    }
    sumInput.addEventListener('blur', validateTransferSum);

    const currencySelect = document.getElementById('currency-select');
    function validateTransferCurrency() {
        let valid = currencySelect.value.length > 0;
        validate(valid, currencySelect, fieldErrorClassName);
    }
    currencySelect.addEventListener('blur', validateTransferCurrency);

    // TODO define date format
    const whenInput = document.getElementById('when');
    const whenContainer = document.querySelectorAll('div.input-container')[1];
    function validateTransferDate() {
        let valid = inputValueNotEmpty(whenInput);
        validate(valid, whenContainer, fieldErrorClassName);
    }
    whenInput.addEventListener('blur', validateTransferDate);

    const titleInput = document.getElementById('title');
    function validateTransferTitle() {
        let valid = inputValueNotEmpty(title);
        validate(valid, titleInput, fieldErrorClassName);
    }
    titleInput.addEventListener('blur', validateTransferTitle);

    const typeRbWrappersList = document.querySelectorAll('div.type-icon-bg');
    function validateTransferType() {
        const transferTypeSelected = document.querySelector('input[name=transfer-type]:checked');
        validateRadioButtons(transferTypeSelected, typeRbWrappersList, 'type-icon-bg-error');
    }

    const transferTypeRbList = document.querySelectorAll('input[name=transfer-type]');
    validateRadioButtonsOnClick(transferTypeRbList, validateTransferType);

    const whereRbWrappersList = document.querySelectorAll('div.where-rb-wrapper');
    function validateTransferWhere() {
        const transferWhereSelected = document.querySelector('input[name=transfer-where]:checked');
        validateRadioButtons(transferWhereSelected, whereRbWrappersList, 'rb-wrapper-error');
    }

    const transferWhereRbList = document.querySelectorAll('input[name=transfer-where]');
    validateRadioButtonsOnClick(transferWhereRbList, validateTransferWhere);

    const optionRbWrappersList = document.querySelectorAll('div.option-rb-wrapper');
    function validateTransferOption() {
        const transferOptionSelected = document.querySelector('input[name=transfer-options]:checked');
        validateRadioButtons(transferOptionSelected, optionRbWrappersList, 'rb-wrapper-error');
    }

    const transferOptionsRbList = document.querySelectorAll('input[name=transfer-options]');
    validateRadioButtonsOnClick(transferOptionsRbList, validateTransferOption);

    const validateTransferForm = function() {
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
    };

    const transferForm = document.getElementById('transfer');
    transferForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validateTransferForm();
    });
})();
