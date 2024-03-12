// src/components/LogPage.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';

const LogPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Box p={4}>
      <Box textAlign="right" mb={4}>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
        />
      </Box>
      <Heading size="md">Log</Heading>
      <Center>
        <Table variant="striped" colorScheme="gray" width="75%">
          <Thead>
            <Tr>
              <Th>RFID no.</Th>
              <Th>Time in</Th>
              <Th>Time out</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* Sample data, replace with your actual data */}
            <Tr>
              <Td>12345</Td>
              <Td>08:00 AM</Td>
              <Td>04:30 PM</Td>
            </Tr>
            <Tr>
              <Td>67890</Td>
              <Td>09:15 AM</Td>
              <Td>05:45 PM</Td>
            </Tr>
          </Tbody>
        </Table>
      </Center>
    </Box>
  );
};

export default LogPage;
