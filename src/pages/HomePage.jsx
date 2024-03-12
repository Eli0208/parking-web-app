// src/components/HomePage.js
import { useState, useEffect } from 'react';
import { Box, Heading, Flex, Text, Icon } from '@chakra-ui/react';
import { BsClockHistory } from 'react-icons/bs';
import { FaParking, FaCar } from 'react-icons/fa';

const HomePage = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box p={4}>
      <Text mb={2}>Current Time: {currentDateTime.toLocaleString()}</Text>
      <Flex justifyContent="space-between" mt={20} color="maroon">
        <Box textAlign="center">
          <Icon as={FaCar} boxSize={10} />
          <Text mt={2}>Registered Cars</Text>
          <Text fontWeight="bold">10</Text> {/* Replace with actual number */}
        </Box>
        <Box textAlign="center">
          <Icon as={FaParking} boxSize={10} />
          <Text mt={2}>Currently Parked</Text>
          <Text fontWeight="bold">5</Text> {/* Replace with actual number */}
        </Box>
        <Box textAlign="center">
          <Icon as={BsClockHistory} boxSize={10} />
          <Text mt={2}>Parking in 24 Hrs.</Text>
          <Text fontWeight="bold">3</Text> {/* Replace with actual number */}
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
