import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';

const Year = ({ data }) => {
  // Extract start year and end year from the data
  const startYears = data.map(item => item.start_year);
  const endYears = data.map(item => item.end_year);

  // Count occurrences of years
  const startYearCounts = {};
  const endYearCounts = {};
  startYears.forEach(year => {
    startYearCounts[year] = startYearCounts[year] ? startYearCounts[year] + 1 : 1;
  });
  endYears.forEach(year => {
    endYearCounts[year] = endYearCounts[year] ? endYearCounts[year] + 1 : 1;
  });

  // Prepare data for the chart
  const chartData = {
    labels: [...new Set([...Object.keys(startYearCounts), ...Object.keys(endYearCounts)])],
    datasets: [
      {
        label: 'Start Year',
        data: Object.values(startYearCounts),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'End Year',
        data: Object.values(endYearCounts),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

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
      <Heading as="h2" mb={4}>
        Year Distribution
      </Heading>
      <Line data={chartData} />
    </Box>
  );
};

export default Year;
