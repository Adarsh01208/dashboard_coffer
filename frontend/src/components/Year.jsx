import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box, Heading } from '@chakra-ui/react';

const Year = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const refCurrent = chartRef.current;

    // Extract start year and end year from the data
    const startYears = data.map(item => item.start_year).filter(year => year !== null);
    const endYears = data.map(item => item.end_year).filter(year => year !== null);

    // Count occurrences of years
    const startYearCounts = {};
    const endYearCounts = {};
    startYears.forEach(year => {
      startYearCounts[year] = startYearCounts[year] ? startYearCounts[year] + 1 : 1;
    });
    endYears.forEach(year => {
      endYearCounts[year] = endYearCounts[year] ? endYearCounts[year] + 1 : 1;
    });

    const allYears = [...new Set([...Object.keys(startYearCounts), ...Object.keys(endYearCounts)])].sort((a, b) => a - b);
    const startYearValues = allYears.map(year => startYearCounts[year] || 0);
    const endYearValues = allYears.map(year => endYearCounts[year] || 0);

    // Set up dimensions and margins
    const margin = { top: 20, right: 30, bottom: 60, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select(refCurrent)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3.scaleBand()
      .domain(allYears)
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max([...startYearValues, ...endYearValues])])
      .nice()
      .range([height, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add bars for start years
    svg.selectAll('.bar-start')
      .data(startYearValues)
      .enter()
      .append('rect')
      .attr('class', 'bar-start')
      .attr('x', (d, i) => x(allYears[i]))
      .attr('y', d => y(d))
      .attr('width', x.bandwidth() / 2)
      .attr('height', d => height - y(d))
      .attr('fill', 'rgb(75, 192, 192)')
      .append("title")
      .text((d, i) => `Start Year: ${allYears[i]}\nCount: ${d}`);

    // Add bars for end years
    svg.selectAll('.bar-end')
      .data(endYearValues)
      .enter()
      .append('rect')
      .attr('class', 'bar-end')
      .attr('x', (d, i) => x(allYears[i]) + x.bandwidth() / 2)
      .attr('y', d => y(d))
      .attr('width', x.bandwidth() / 2)
      .attr('height', d => height - y(d))
      .attr('fill', 'rgb(255, 99, 132)')
      .append("title")
      .text((d, i) => `End Year: ${allYears[i]}\nCount: ${d}`);

    // Add X axis label
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('x', width / 2 + margin.left)
      .attr('y', height + margin.top + 20)
      .text('Year');

    // Add Y axis label
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -margin.top - height / 2 + 20)
      .text('Count');

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 150}, 10)`);

    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'rgb(75, 192, 192)');

    legend.append('text')
      .attr('x', 30)
      .attr('y', 15)
      .text('Start Year')
      .style('font-size', '14px')
      .attr('alignment-baseline', 'middle');

    legend.append('rect')
      .attr('x', 0)
      .attr('y', 30)
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', 'rgb(255, 99, 132)');

    legend.append('text')
      .attr('x', 30)
      .attr('y', 45)
      .text('End Year')
      .style('font-size', '14px')
      .attr('alignment-baseline', 'middle');

    // Cleanup function to remove the SVG on component unmount
    return () => {
      d3.select(refCurrent).select('svg').remove();
    };
  }, [data]);

  return (
    <Box
      p={6}
      borderRadius={20}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      ml={50}
      shadow="md"
      pb={100}
    >
      <Heading as="h4" mb={4}>
        Years
      </Heading>
      <div ref={chartRef}></div>
    </Box>
  );
};

export default Year;
