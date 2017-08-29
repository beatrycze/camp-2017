(() => {
    const getChartValues = endpoint => {
        return $.get(endpoint).then(response => {
            const chartList = response.content;
            const chartValuesList = chartList.map((element) => {
                return element.amount;
            });
            return chartValuesList;
        });
    }

    const valuesPromise = getChartValues("https://efigence-camp.herokuapp.com/api/data/chart");
    valuesPromise.then(values => {
        var colors = ['red','green','blue','yellow','black','red'];

        c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                    ['amount', ...values]
                ],
                types: {
                    amount: 'area-spline'
                },
                colors: {
                    amount: '#0d7e8c'
                },
                labels: true
            },
            point: {
                    show: false
            },
            axis: {
                x: {
                    show: false
                },
                y: {
                    inner: true,
                    tick: {
                        values: getScale(values, 5)
                    }
                }
            },
            legend: {
                show: false
            },
            padding: {
                top: 20,
                right: 0,
                bottom: 0,
                left: 10,
            },
        });
    });
})();
