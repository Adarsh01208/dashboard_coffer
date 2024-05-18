import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  Box,
  Flex,
  Heading,
  Select,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";

const Country = ({ data }) => {
  const { colorMode } = useColorMode();
  const [selectedCountry, setSelectedCountry] = useState(
    "United States of America"
  );
  const chartRef = useRef(null);

  useEffect(() => {
    drawChart();
  }, [selectedCountry, data, colorMode]);

  const drawChart = () => {
    const countryData = data.filter(
      (entry) => entry.country === selectedCountry
    );

    const sectors = {};
    countryData.forEach((entry) => {
      if (!sectors[entry.sector]) {
        sectors[entry.sector] = [];
      }
      sectors[entry.sector].push(entry.intensity);
    });

    const sectorLabels = Object.keys(sectors);
    const sectorIntensities = sectorLabels.map(
      (sector) => sectors[sector]
    );

    const chartBackgroundColor =
      colorMode === "light"
        ? "rgba(79, 59, 169, 0.7)"
        : "rgba(144, 104, 190, 0.7)";

    // Remove existing chart if any
    d3.select(chartRef.current).selectAll("*").remove();

    // Set up dimensions and margins
    const margin = { top: 50, right: 50, bottom: 70, left: 70 };
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleBand()
      .domain(sectorLabels)
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sectorIntensities, d => d3.max(d))])
      .nice()
      .range([height, 0]);

    // Add bars
    svg.selectAll("rect")
      .data(sectorIntensities)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(sectorLabels[i]))
      .attr("y", d => yScale(d3.max(d)))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d3.max(d)))
      .attr("fill", chartBackgroundColor)
      .append("title")
      .text((d, i) => `Sector: ${sectorLabels[i]}\nIntensity: ${d3.max(d)}`);

    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(yScale));

    // Add X axis label
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + margin.left)
      .attr("y", height + margin.top + 40)
      .text("Sector");

    // Add Y axis label
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height / 2 + 20)
      .text("Intensity");

    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Intensity by Sector");
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box p={6} shadow="md" bg={useColorModeValue("white", "gray.800")} borderRadius={20} m={50}>
      <Flex direction="column">
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h4">Country</Heading>
          <Select
            value={selectedCountry}
            onChange={handleCountryChange}
            w="200px"
            colorScheme="purple"
          >
            <option value="United States of America">
              United States of America
            </option>
            <option value="Mexico">Mexico</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Russia">Russia</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
          </Select>
        </Flex>
        <Box height="500px" ref={chartRef}></Box>
      </Flex>
    </Box>
  );
};

export default Country;
