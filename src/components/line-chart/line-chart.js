
const lineChart = (props) => {
    const {
        container,
        width: svgWidth,
        height: svgHeight,
        series,
        dates,
        seriesNameAccessor = d => d.name,
        seriesValuesAccessor = d => d.values,
        xAccessor = d => d.date,
        yAccessor = d => d.count,
        yMax
    } = props;

    const margin = { top: 30, right: 10, bottom: 50, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const bounds = d3.select(container)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleTime()
        .domain(d3.extent(dates))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([height, 0]);

    const xAxisGroup = bounds.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    const yAxisGroup = bounds.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yScale)
            .tickFormat(d => d));

    const lineGenerator = d3.line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)));

    bounds.selectAll('.line-series')
        .data(series)
        .enter()
        .append('path')
        .attr('class', d => `line-series ${seriesNameAccessor(d).toLowerCase()}`)
        .attr('d', d => lineGenerator(seriesValuesAccessor(d)))
        .style('fill', 'none')
        .style('stroke', 'steelblue');
};

export default lineChart;