(() => {

    // $('form[data-validate]').each((formIndex, formElement) => {
    //     $(formElement).find('input[data-validate], select[data-validate]')
    //     .each((inputIndex, inputElement) => {
    //         let validators = $(inputElement).data('validate').split(' ');
    //         console.log(validators);
    //     })
    // });
    // // http://subinsb.com/jquery-to-javascript#find

    const fieldErrorClassName = 'input-select-error';

    const fieldNotEmpty = (field) => field.value.trim().length > 0;
    const properAccountFormat = (input) => input.value.replace(/\s/g,'').match(/^[0-9]{26}$/) != null;
    const properAmountFormat = (input) => input.value.trim().match(/^\d*(.|,)?\d\d?$/) !=null && input.value.trim().match(/[1-9]{1}/) !=null;

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

    // const accountNativeSelect = document.getElementById('account-select');
    // const accountCustomSelect = document.querySelector('div.account-custom-select');
    // function validateTransferAccount() {
    //     let valid = fieldNotEmpty(accountNativeSelect);
    //     validate(valid, accountCustomSelect, 'custom-select-error');
    // }
    // accountNativeSelect.addEventListener('blur', validateTransferAccount);

    // const recipientInput = document.getElementById('recipient');
    // const recipientInputContainer = document.querySelector('div.recipient-input-container');
    // function validateTransferRecipient() {
    //     let valid = fieldNotEmpty(recipientInput);
    //     validate(valid, recipientInputContainer, fieldErrorClassName);
    // }
    // recipient.addEventListener('blur', validateTransferRecipient);

    const numberInput = document.getElementById('number');
    function validateTransferNumber() {
        let valid = properAccountFormat(numberInput);
        validate(valid, numberInput, fieldErrorClassName);
    }
    numberInput.addEventListener('blur', validateTransferNumber);

    const sumInput = document.getElementById('sum');
    function validateTransferSum() {
        let valid = properAmountFormat(sumInput);
        validate(valid, sumInput, fieldErrorClassName);
    }
    sumInput.addEventListener('blur', validateTransferSum);

    // const currencySelect = document.getElementById('currency-select');
    // function validateTransferCurrency() {
    //     // let valid = currencySelect.value.length > 0; // mogę to spr także za pomocą fieldNotEmpty
    //     let valid = fieldNotEmpty(currencySelect);
    //     validate(valid, currencySelect, fieldErrorClassName);
    // }
    // currencySelect.addEventListener('blur', validateTransferCurrency);

    // TODO define date format
    // const whenInput = document.getElementById('when');
    // const whenContainer = document.querySelector('div.when-input-container');
    // function validateTransferDate() {
    //     let valid = fieldNotEmpty(whenInput);
    //     validate(valid, whenContainer, fieldErrorClassName);
    // }
    // whenInput.addEventListener('blur', validateTransferDate);

    // const titleInput = document.getElementById('title');
    // function validateTransferTitle() {
    //     let valid = fieldNotEmpty(titleInput);
    //     validate(valid, titleInput, fieldErrorClassName);
    // }
    // titleInput.addEventListener('blur', validateTransferTitle);

    function generateFieldContentValidator(fieldSelector, fieldContainer) {
        if (fieldContainer) {
            function checkIfNotEmpty() {
                let valid = fieldNotEmpty(fieldSelector);
                validate(valid, fieldContainer, fieldErrorClassName);
            }
            fieldSelector.addEventListener('blur', checkIfNotEmpty);
        } else {
            function checkIfNotEmpty() {
                let valid = fieldNotEmpty(fieldSelector);
                validate(valid, fieldSelector, fieldErrorClassName);
            }
            fieldSelector.addEventListener('blur', checkIfNotEmpty);
        }
        return checkIfNotEmpty;
    }

    const accountNativeSelect = document.getElementById('account-select');
    const accountCustomSelect = document.querySelector('div.account-custom-select');
    const validateTransferAccount = generateFieldContentValidator(accountNativeSelect, accountCustomSelect);

    const recipientInput = document.getElementById('recipient');
    const recipientInputContainer = document.querySelector('div.recipient-input-container');
    const validateTransferRecipient = generateFieldContentValidator(recipientInput, recipientInputContainer);

    // const validateTransferSumNotEmpty = generateFieldContentValidator(sumInput);

    const currencySelect = document.getElementById('currency-select');
    const validateTransferCurrency = generateFieldContentValidator(currencySelect);

    // TODO define date format
    const whenInput = document.getElementById('when');
    const whenContainer = document.querySelector('div.when-input-container');
    const validateTransferDate = generateFieldContentValidator(whenInput, whenContainer);

    const titleInput = document.getElementById('title');
    const validateTransferTitle = generateFieldContentValidator(titleInput);

    function generateRbValidator(rbSelector, rbName) {
        const rbWrappersList = document.querySelectorAll(rbSelector);
        function validateRbs() {
            const rbSelected = document.querySelector(`input[name=${rbName}]:checked`);
            validateRadioButtons(rbSelected, rbWrappersList, 'rb-error');
        }
        const rbList = document.querySelectorAll(`input[name=${rbName}]`);
        rbList.forEach(element => element.addEventListener('click', validateRbs));
        return validateRbs;
    }

    const validateTransferType = generateRbValidator('div.type-icon-bg', 'transfer-type');
    const validateTransferWhere = generateRbValidator('div.where-rb-wrapper', 'transfer-where');
    const validateTransferOption = generateRbValidator('div.option-rb-wrapper', 'transfer-options');

    const validateTransferForm = function() {
        validateTransferAccount();        
        validateTransferType();
        validateTransferRecipient();
        validateTransferWhere();
        validateTransferNumber();
        // validateTransferSumNotEmpty();
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
