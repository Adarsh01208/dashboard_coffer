import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box, Heading, Select, Flex, useColorModeValue } from "@chakra-ui/react";

const Relevance = ({ data }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const svgRef = useRef();

  const filteredData =
    selectedFilter === "all"
      ? data
      : data.filter((item) => item.sector === selectedFilter);

  const sectors = Array.from(new Set(data.map((item) => item.sector)));

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 70, left: 70 };

    svg.attr("viewBox", [0, 0, width, height]);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.likelihood)])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.impact)])
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(width / 80))
      .append("text")
      .attr("x", width - margin.right)
      .attr("y", -4)
      .attr("fill", "currentColor")
      .attr("text-anchor", "end")
      .text("Likelihood");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("x", 4)
      .attr("y", margin.top)
      .attr("dy", ".71em")
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("Impact");

    svg
      .append("g")
      .selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.likelihood))
      .attr("cy", (d) => yScale(d.impact))
      .attr("r", 5)
      .attr("fill", "#4299E1")
      .on("mouseover", (event, d) => {
        const [x, y] = d3.pointer(event);
        d3.select("#tooltip")
          .style("visibility", "visible")
          .style("left", x + "px")
          .style("top", y + "px")
          .html(`<strong>Relevance:</strong> ${d.relevance}<br /><strong>Intensity:</strong> ${d.intensity}<br /><strong>Sector:</strong> ${d.sector}`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("visibility", "hidden");
      });

    // Tooltip
    svg
      .append("g")
      .append("foreignObject")
      .attr("id", "tooltip")
      .attr("width", 100)
      .attr("height", 50)
      .style("position", "absolute")
      .style("visibility", "hidden")
      .append("xhtml:div")
      .style("background", "rgba(255,255,255,0.8)")
      .style("border", "1px solid #000")
      .style("padding", "8px")
      .style("border-radius", "5px")
      .html("");

  }, [filteredData]);

  return (
    <Box
      p={6}
      borderRadius={20}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      ml={50}
      shadow="md"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Heading as="h2">Relevance</Heading>
        <Select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          w="200px"
        >
          <option value="all">All Sectors</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </Select>
      </Flex>
      <svg ref={svgRef} width="800" height="600"></svg>
    </Box>
  );
};

export default Relevance
