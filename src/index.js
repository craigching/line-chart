import lineChart from './components/line-chart/line-chart.js';
// import logs from './services/elastic.js';

const main = async () => {
    const container = d3.select('#container');

    const response = await d3.json('../data/one.json');
    const data = response.results[0].series[0].values;

    console.log('data', data);

    const xAccessor = d => new Date(d[0]);
    const yAccessor = d => d[1];

    const props = {
        container: container.nodes()[0],
        width: 1200,
        height: 200,
        data: data,
        xAccessor: xAccessor,
        yAccessor: yAccessor
    }

    lineChart(props);
};

main()