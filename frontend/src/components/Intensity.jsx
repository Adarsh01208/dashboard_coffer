import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Heading, Select, Flex } from '@chakra-ui/react';

const Intensity = ({ data }) => {
  const chartRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState('All');

  // Extract unique years from the provided data
  const uniqueYears = ['All', ...new Set(data.map(item => item.start_year))];

  useEffect(() => {
    drawChart();
  }, [data, selectedYear]);

  const drawChart = () => {
    // Filter data based on the selected year
    const filteredData = selectedYear === 'All' ? data : data.filter(item => item.start_year === selectedYear);

    // Extract intensity data and years from the filtered data
    const intensityData = filteredData.map(item => item.intensity);
    const years = filteredData.map(item => item.start_year);

    // Remove existing chart if any
    d3.select(chartRef.current).selectAll("*").remove();

    // Set up dimensions and margins
    const margin = { top: 50, right: 50, bottom: 70, left: 70 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleBand()
      .domain(years)
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(intensityData)])
      .nice()
      .range([height, 0]);

    // Add bars
    svg.selectAll('rect')
      .data(intensityData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(years[i]))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d))
      .attr('fill', '#6c757d')
      .attr('opacity', '0.7')
      .append("title")
      .text((d) => `${d}%`);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .attr('font-size', '12px');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .attr('font-size', '12px');

    // Add X axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Arial, sans-serif')
      .attr('font-size', '14px')
      .text('Year');

    // Add Y axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 20)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Arial, sans-serif')
      .attr('font-size', '14px')
      .text('Intensity (%)');

    // Add chart title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Arial, sans-serif')
      .attr('font-size', '16px')
      .text('Intensity Chart');
  };

  return (
    <div style={{ margin: '50px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#f8f9fa' }}>
       <Flex justify="space-between" align="center">
        <Heading as="h4" mb={4}>Intensity</Heading>
        <Select w="200px" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} mb={4}>
          {uniqueYears.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </Select>
      </Flex>
      <div ref={chartRef}></div>
    </div>
  );
};

export default Intensity;
