import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import React, { useEffect, useState } from 'react'
import useData from '../Hooks/useData';
import { ChakraProvider, Flex, Box, Grid } from "@chakra-ui/react";
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
  const { data, error } = useData(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-slate-50">
      <ChakraProvider>
      <Box ml={{ base: 0, md: 64 }}>
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