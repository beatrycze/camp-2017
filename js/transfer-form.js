(() => {

    const notEmpty = (value) => value.trim().length > 0;
    const properAccountFormat = (value) => value.replace(/\s/g,'').match(/^[0-9]{26}$/) != null;
    const properAmountFormat = (value) => value.trim().match(/^\d*(.|,)?\d\d?$/) !=null && value.trim().match(/[1-9]{1}/) !=null;

    const properDateFormat = (value) => value.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/) !=null;
    const dateNotFromPast = (input) => {
        let dateValid = properDateFormat(input.value);
        let selectedDate = input.value.replace(/\/|\./g,'-').split('-').reverse().join('-');
        let currentDate = new Date();
        let currentDateToCompare = [ currentDate.getFullYear(), ("0" + (currentDate.getMonth() + 1)).slice(-2), currentDate.getDate() ].join('-');
        if ( dateValid && ( selectedDate < currentDateToCompare) ) {
            // console.log('Wpisz datę bieżącą lub przyszłą.');
        } else if ( dateValid && (selectedDate >= currentDateToCompare) ) {
            return true;
        }
    };

    const rbChecked = (input) => input.checked;

    const customFieldClassName = 'custom-border';
    const fieldErrorClassName = 'input-select-error';

    const stringToValidatorMap = {
        notEmpty: notEmpty,
        accountFormat: properAccountFormat,
        amountFormat: properAmountFormat,
        dateFormat: dateNotFromPast,
        rbChecked: rbChecked
    };

    let fieldValidationRules = [];
    $('form[data-validate]').each((formIndex, formElement) => {
    // why jQuery .find(): http://subinsb.com/jquery-to-javascript#find
        $(formElement).find('input[data-validate][type="text"], select[data-validate]')
        .each((fieldIndex, fieldElement) => {
            let validators = $(fieldElement).data('validate').split(' ');
            let targetErrorSelectors = ( fieldElement.parentNode.classList.contains(customFieldClassName) ) ? [fieldElement.parentNode] : [fieldElement];
            fieldValidationRules.push({
                targetErrorSelectors: targetErrorSelectors,
                element: fieldElement,
                validators: validators.map(validator => stringToValidatorMap[validator])
            });
        });

        let rbsAggregate = $(formElement).find('input[type="radio"]').toArray().reduce((aggr, node) => {
            if(!(node.name in aggr)) {
                aggr[node.name] = [];
            }
            aggr[node.name].push(node);
            return aggr;
        }, {});
        for(let rbName in rbsAggregate) {
            if(rbsAggregate.hasOwnProperty(rbName)) {
                let radioButtons = rbsAggregate[rbName];
                let validators = $(radioButtons[0]).data('validate').split(' ');
                let targetErrorSelectors = radioButtons.map(rb => rb.parentNode);
                fieldValidationRules.push({
                    targetErrorSelectors: targetErrorSelectors,
                    elements: radioButtons,
                    validators: validators.map(validator => stringToValidatorMap[validator])
                });
            }
        }
    });

    function fieldIsCorrect(value, validators) {
        return validators.reduce(function(aggr, validator) {
            return aggr && validator(value);
        }, true);
    }

    function atLeastOneTruthy(booleans) {
        return booleans.reduce(function(aggr, bool) {
            return aggr || bool;
        }, false);
    }

    const displayErrorCss = (valid, selectors, className) => {
        if (!valid) {
            selectors.forEach(selector => selector.classList.add(className));
        } else {
            selectors.forEach(selector => selector.classList.remove(className));
        }
    };

    function validateOnSubmit(fieldValidationRules) {
        fieldValidationRules.forEach(function(field) {
            if(field.element) {
                let isCorrect = fieldIsCorrect(field.element.value, field.validators);
                if (!isCorrect) {
                    // console.log(`Wiedz, że coś się dzieje z ${field.fieldType}`);
                }
                displayErrorCss(isCorrect, field.targetErrorSelectors, fieldErrorClassName);
            } else if (field.elements) {
                let isCorrect = atLeastOneTruthy(field.elements.map(rbChecked));
                displayErrorCss(isCorrect, field.targetErrorSelectors, fieldErrorClassName);
            }
        });
    }

    function validateOnBlur(fieldValidationRules) {
        fieldValidationRules.forEach(function(field) {
            if(field.element) {
                field.element.addEventListener('blur', function() {
                    let isCorrect = fieldIsCorrect(field.element.value, field.validators);
                    displayErrorCss(isCorrect, field.targetErrorSelectors, fieldErrorClassName);
                });
            }
        });
    }

    function validateRbsOnClick(fieldValidationRules) {
        fieldValidationRules.forEach(function(field) {
            if(field.elements) {
                field.elements.forEach(element => element.addEventListener('click', function() {
                    let isCorrect = rbChecked(element);
                    displayErrorCss(isCorrect, field.targetErrorSelectors, fieldErrorClassName);
                }));
            }
        });
    }

    validateOnBlur(fieldValidationRules);
    validateRbsOnClick(fieldValidationRules);

    const transferForm = document.getElementById('transfer');
    transferForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validateOnSubmit(fieldValidationRules);
    });
})();
