
import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import axios from 'axios';
import { ChakraProvider, Flex, Box, Grid } from "@chakra-ui/react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Intensity from './Intensity';
import Region from './Region';
import Topics from './Topics';
import Relevance from './Relevance';
import Sector from './Sector';
import Likelihood from './Likelihood';
import Country from './Country';
import Year from './Year';
import Footer from './Footer';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const API_URL = "http://localhost:8000"; // replace with your backend URL
      try {
        const response = await axios.get(`${API_URL}/data`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchDataFromApi();
  }, []);
  return (
    <div>
      <ChakraProvider>
      <Sidebar/>
      <Box ml={{ base: 0, md: 64 }}>
        <Navbar />
        <div className="mt-10 p-2">
          <Intensity data={data} />
          <Flex direction={{ base: "column", md: "row" }} m={50}>
            <Box
              flex={{ base: "1", md: "0.5" }}
              maxW="50%"
              p={5}
              m={2}
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
              borderRadius={20}
            >
              <Region data={data} />
            </Box>
            <Box
              flex={{ base: "1", md: "0.5" }}
              maxW="50%"
              p={5}
              m={2}
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
              borderRadius={20}
            >
              <Topics data={data} />
            </Box>
          </Flex>
          <Relevance data={data} />
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            <Box>
              .
              <Sector data={data} />
            </Box>
            <Box>
              <Likelihood data={data} />
            </Box>
          </Grid>
          <Country data={data} />
          <Year data={data} />
        </div>
        <Footer/>
      </Box>
    </ChakraProvider>


    </div>
   
  )
}

export default Home