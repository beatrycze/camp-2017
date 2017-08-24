const chart = c3.generate({
    data: {
        columns: [
            ['data1', 12000, 6000, 4000, 10000, 17000, 8000, 3000]
        ],
        types: {
            data1: 'area-spline'
        },
        colors: {
          data1: '#0d7e8c'
        },
        labels: true
    },
    axis: {
      x: {
        show: false
      },
      y: {
        inner: true,
        tick: {
          values: [0, 5000, 10000, 15000, 20000]
        }
      }
    },
    legend: {
        show: false
    },
    padding: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 20,
    },
});
