import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Flex, Heading, Select } from '@chakra-ui/react';

const Region = ({ data }) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Filter data by selected region
  useEffect(() => {
    if (selectedRegion) {
      const filtered = data.filter(item => item.region === selectedRegion);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedRegion, data]);

  // Extract region counts from the filtered data
  const regionCounts = {};
  filteredData.forEach(item => {
    if (item.region in regionCounts) {
      regionCounts[item.region]++;
    } else {
      regionCounts[item.region] = 1;
    }
  });

  // Extract all regions from the original data
  const allRegions = [...new Set(data.map(item => item.region))];

  // Convert region counts object to arrays for chart data
  const chartData = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        data: Object.values(regionCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#FF9800',
          '#9C27B0',
          '#3F51B5',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#FF9800',
          '#9C27B0',
          '#3F51B5',
        ],
      },
    ],
  };

  // Options for the pie chart
  const options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
          return `${data.labels[tooltipItem.index]}: ${currentValue} (${percentage}%)`;
        }
      }
    }
  };

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={4}>
        <Heading as="h4" mb={0}>
          Regions
        </Heading>
        <Select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          w="200px"
          placeholder="Select a region"
        >
          <option value="">All Regions</option>
          {allRegions.map((region, index) => (
            <option key={index} value={region}>{region}</option>
          ))}
        </Select>
      </Flex>
      <Doughnut data={chartData} options={options} />
    </Box>
  );
};

export default Region;
