import { useState, useEffect } from 'react';
import { Box, Heading, Flex, Text, Icon } from '@chakra-ui/react';
import { BsClockHistory } from 'react-icons/bs';
import { FaParking, FaCar } from 'react-icons/fa';
import axios from 'axios';

const HomePage = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [registeredCars, setRegisteredCars] = useState(0);
  const [parkedCars, setParkedCars] = useState(0);
  const [parkedIn24hrs, setParkedIn24hrs] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
      fetchCarData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchCarData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cars');
      const cars = response.data;

      // Calculate the number of registered cars
      setRegisteredCars(cars.length);

      // Calculate the number of currently parked cars
      const currentlyParked = cars.filter(car => car.loginStatus);
      setParkedCars(currentlyParked.length);

      // Calculate the number of cars parked in the last 24 hours
      const parkedInLast24hrs = cars.filter(car => {
        const lastTimeIn = car.timeIn[car.timeIn.length - 1];
        return (
          lastTimeIn &&
          (new Date() - new Date(lastTimeIn.date)) / (1000 * 60 * 60) <= 24
        );
      });
      setParkedIn24hrs(parkedInLast24hrs.length);
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };

  return (
    <Box p={4}>
      <Text mb={2}>Current Time: {currentDateTime.toLocaleString()}</Text>
      <Flex justifyContent="space-between" mt={20} color="maroon">
        <Box textAlign="center">
          <Icon as={FaCar} boxSize={10} />
          <Text mt={2}>Registered Cars</Text>
          <Text fontWeight="bold">{registeredCars}</Text>
        </Box>
        <Box textAlign="center">
          <Icon as={FaParking} boxSize={10} />
          <Text mt={2}>Currently Parked</Text>
          <Text fontWeight="bold">{parkedCars}</Text>
        </Box>
        <Box textAlign="center">
          <Icon as={BsClockHistory} boxSize={10} />
          <Text mt={2}>Parked in 24 Hrs.</Text>
          <Text fontWeight="bold">{parkedIn24hrs}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
