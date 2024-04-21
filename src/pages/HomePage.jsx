import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex, Text, Icon } from '@chakra-ui/react';
import { BsClockHistory } from 'react-icons/bs';
import { FaParking, FaCar } from 'react-icons/fa';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
      const response = await axios.get(
        'https://parking-web-app-backend.onrender.com/cars'
      );
      const cars = response.data;
      console.log(cars);
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

  // Chart data
  const registeredCarsData = {
    labels: ['Registered Cars'],
    datasets: [
      {
        label: 'Registered Cars',
        data: [registeredCars],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const parkedCarsData = {
    labels: ['Currently Parked'],
    datasets: [
      {
        label: 'Currently Parked',
        data: [parkedCars],
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const parkedIn24hrsData = {
    labels: ['Parked in 24 Hrs.'],
    datasets: [
      {
        label: 'Parked in 24 Hrs.',
        data: [parkedIn24hrs],
        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box p={4}>
      <Heading size="md">Dashboard</Heading>
      <Text mb={2}>Current Time: {currentDateTime.toLocaleString()}</Text>
      <Flex justifyContent="space-between" mt={20} color="maroon">
        <Box textAlign="center">
          <Icon as={FaCar} boxSize={10} />
          <Text mt={2}>Registered Cars</Text>
          <Text fontWeight="bold">{registeredCars}</Text>
          <Line data={registeredCarsData} />
        </Box>
        <Box textAlign="center">
          <Icon as={FaParking} boxSize={10} />
          <Text mt={2}>Currently Parked</Text>
          <Text fontWeight="bold">{parkedCars}</Text>
          <Doughnut data={parkedCarsData} pt="10vh" />
        </Box>
        <Box textAlign="center">
          <Icon as={BsClockHistory} boxSize={10} />
          <Text mt={2}>Parked in 24 Hrs.</Text>
          <Text fontWeight="bold">{parkedIn24hrs}</Text>
          <Line data={parkedIn24hrsData} />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
