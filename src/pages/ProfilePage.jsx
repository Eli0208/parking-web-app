import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import axios from 'axios';

const ProfilePage = ({ email }) => {
  const [carDetails, setCarDetails] = useState({});
  const { rfid, plateNo, timeIn, timeOut } = carDetails;

  useEffect(() => {
    // Fetch car details when the component mounts
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `https://parking-web-app-backend.onrender.com/cars/email/${email}`
        );
        setCarDetails(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [email]);

  // Function to convert UTC time to Singapore time
  const convertToSGTime = dateTimeString => {
    const dateTimeUTC = new Date(dateTimeString);
    return dateTimeUTC.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Singapore',
    });
  };

  return (
    <Box p={8}>
      <Stack spacing={4}>
        <Box>
          <FormControl id="rfid">
            <FormLabel>RFID Number</FormLabel>
            <p>{rfid}</p>
          </FormControl>
        </Box>
        <Box>
          <FormControl id="plateNumber">
            <FormLabel>Plate Number</FormLabel>
            <p>{plateNo}</p>
          </FormControl>
        </Box>
      </Stack>
      <Box mt={8}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Time In</Th>
              <Th>Time Out</Th>
            </Tr>
          </Thead>
          <Tbody>
            {timeIn &&
              timeOut &&
              timeIn.map((entry, index) => (
                <Tr key={index}>
                  <Td>{new Date(entry.date).toLocaleDateString()}</Td>
                  <Td>{convertToSGTime(entry.date)}</Td>
                  <Td>
                    {timeOut[index] && convertToSGTime(timeOut[index].date)}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ProfilePage;
