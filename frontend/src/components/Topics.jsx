import React, { useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Box, Heading, Select, Flex } from '@chakra-ui/react';

const Topics = ({ data }) => {
  const [selectedTopic, setSelectedTopic] = useState('All'); // Set default value to 'All'

  // Extract unique topics
  const topics = ['All', ...new Set(data.map(item => item.topic))];

  // Filter data based on the selected topic
  const filteredData = selectedTopic === 'All' ? data : data.filter(item => item.topic === selectedTopic);

  const chartData = {
    labels: filteredData.map(item => item.topic),
    datasets: [
      {
        data: filteredData.map(item => item.relevance),
        backgroundColor: [
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Teal
          '#9966FF', // Purple
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        max: 5,
      },
    },
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h4">Topics</Heading>
        <Select value={selectedTopic} onChange={handleTopicChange} w="200px">
          {topics.map((topic, index) => (
            <option key={index} value={topic}>{topic}</option>
          ))}
        </Select>
      </Flex>
      <PolarArea data={chartData} options={chartOptions} />
    </Box>
  );
};

export default Topics;
