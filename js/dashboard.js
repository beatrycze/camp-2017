(() => {

    const getProductsData = (endpoint, containerClassName) => {

        $.get(endpoint, (response) => {
            const productsContainer = document.querySelector(containerClassName);
            const productsList = response.content;

            const productTemplate = (productData) => {
                let icon;
                let bankLoansStyle;
                
                switch(productData.type) {
                    case "Wallet":
                        icon = "fa fa-credit-card fa-3x";
                        bankLoansStyle = "";
                    break;
                    case "Deposits":
                        icon = "fa fa-university fa-3x";
                        bankLoansStyle = "";
                    break;
                    case "Accounts":
                        icon = "fa fa-tasks fa-3x";
                        bankLoansStyle = "";
                    break;
                    case "Funds":
                        icon = "fa fa-bar-chart fa-3x";
                        bankLoansStyle = "";
                    break;
                    case "Bank loans":
                        icon = "fa fa-hand-o-right fa-3x";
                        bankLoansStyle = "bank-loan-style";
                    break;
                    default: 
                        icon = "";
                }

                return `
                    <ul class="products-list ${bankLoansStyle}">
                        <li class="list-element-inline icon"><i class="${icon}" aria-hidden="true"></i></li>
                        <li class="list-element-inline type">${productData.type}</li>
                        <li class="list-element-inline amount">${productData.amount} ${productData.currency}</li>
                    </ul>
                `
            };

            productsList.forEach((element, index) => {
                const template = productTemplate(element);
                productsContainer.insertAdjacentHTML("beforeend", template);
                // $(".products").append(template);
            });
        })
    }

    const getHistoryData = (endpoint, containerClassName) => {
        $.get(endpoint, (response) => {
            const historyContainer = document.querySelector(containerClassName);
            const historyList = response.content;

            const historyTemplate = (historyData) => {
                let dataFormatted = historyData.date.slice(8) + "." + historyData.date.slice(5,7);
                return `
                    <ul class="history-row">
                        <li class="list-element-inline date">${dataFormatted}</li>
                        <li class="list-element-inline description">${historyData.description}</li>
                        <li class="list-element-inline amount"><span class="sum">${historyData.amount}</span> ${historyData.currency}</li>
                    </ul>
                `
            }

            historyList.forEach((element, index) => {
                const template = historyTemplate(element);
                historyContainer.insertAdjacentHTML("beforeend", template);
            });
        })
    }

    const summaryData = (endpoint, balanceIdName, fundsIdName, paymentsIdName) => {
        $.get(endpoint, (response) => {
            const balanceContainer = document.getElementById(balanceIdName);
            const fundsContainer = document.getElementById(fundsIdName);
            const paymentsContainer = document.getElementById(paymentsIdName);
            const summaryData = response.content[0];

            const balanceTemplate = `<span class="sum">${summaryData.balance}</span>`;
            balanceContainer.insertAdjacentHTML("afterbegin", balanceTemplate);

            const fundsTemplate = `<span class="sum">${summaryData.funds}</span>`;
            fundsContainer.insertAdjacentHTML("afterbegin", fundsTemplate);

            const paymentsTemplate = `<span class="sum">${summaryData.payments}</span>`;
            paymentsContainer.insertAdjacentHTML("afterbegin", paymentsTemplate);

            // for (var key in summaryData) {
            //     console.log(`${key}: ${summaryData[key]}`);
            // }
        })
    }

    getProductsData("https://efigence-camp.herokuapp.com/api/data/products", '.products');
    getHistoryData("https://efigence-camp.herokuapp.com/api/data/history", '.history');
    summaryData("https://efigence-camp.herokuapp.com/api/data/summary", 'balance-amount', 'funds-amount', 'payments-amount');
})();