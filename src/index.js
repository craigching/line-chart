import lineChart from './components/line-chart/line-chart.js';

const main = async () => {
    const container = d3.select('#container');

    const response = await d3.json('../data/platform-cluster.json');

    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S%Z');
    const xAccessor = d => parseTime(d[0]);
    const yAccessor = d => d[1];

    let yMax = 0;
    const series = response.results[0].series.map(series => {
        const max = d3.max(series.values.map(d => yAccessor(d)));
        if (max > yMax) {
            yMax = max;
        }
        return {
            name: series.tags.host,
            values: series.values
        }
    });

    const data = {
        series: series,
        dates: response.results[0].series[0].values.map(d => xAccessor(d)),
        yMax: yMax
    }

    console.log('data', data);

    const props = {
        container: container.nodes()[0],
        width: 1200,
        height: 600,
        data: data,
        xAccessor: xAccessor,
        yAccessor: yAccessor
    }

    lineChart(props);
};

main()