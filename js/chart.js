(() => {
    const getChartParams = endpoint => {
        return $.get(endpoint).then(response => {
            return response.content;
        });
    }

    const paramsPromise = getChartParams("https://efigence-camp.herokuapp.com/api/data/chart");
    paramsPromise.then(params => {

        const dates = params.map(element => element.date);
        const values = params.map(element => element.amount);
        c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: [
                    ['x', ...dates],
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
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
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
                left: 20,
            },
        });
    });
})();
