import lineChart from './components/line-chart/line-chart.js';

const main = async () => {
    const container = d3.select('#container');

    const response = await d3.json('../data/platform-cluster.json');

    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S%Z');
    const xAccessor = d => parseTime(d[0]);
    const yAccessor = d => d[1];

    let yMax = 0;
    response.results[0].series.forEach(series => {
        const max = d3.max(series.values.map(d => yAccessor(d)));
        if (max > yMax) {
            yMax = max;
        }
    });

    const seriesNameAccessor = d => d.tags.host;
    const seriesValuesAccessor = d => d.values;

    const props = {
        container: container.nodes()[0],
        width: 1200,
        height: 600,
        series: response.results[0].series,
        dates: response.results[0].series[0].values.map(xAccessor),
        seriesNameAccessor: seriesNameAccessor,
        seriesValuesAccessor: seriesValuesAccessor,
        xAccessor: xAccessor,
        yAccessor: yAccessor,
        yMax: yMax
    }

    lineChart(props);
};

main()