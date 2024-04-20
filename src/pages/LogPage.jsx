import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Button,
  Flex,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import LogsPDF from '../components/LogsPDF';

const LogPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchData();

    const fetchDataInterval = setInterval(fetchData, 500);

    return () => clearInterval(fetchDataInterval);
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      if (!selectedDate) return; // Add null check for selectedDate

      const dateString = selectedDate.toISOString();
      if (!dateString) return; // Add null check for dateString

      const dateParts = dateString.split('T');
      if (!dateParts[0]) return; // Add null check for dateParts

      const response = await axios.get(
        `http://localhost:5000/logs/date/${dateParts[0]}`
      );
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <Box p={4}>
      <Heading size="md">Log</Heading>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
        />
        <PDFDownloadLink document={<LogsPDF logs={logs} />} fileName="logs.pdf">
          {({ loading }) => (loading ? 'Loading document...' : 'Export to PDF')}
        </PDFDownloadLink>
      </Flex>
      <Center>
        <Table variant="striped" colorScheme="gray" width="75%">
          <Thead>
            <Tr>
              <Th>RFID no.</Th>
              <Th>Date</Th>
              <Th>Time in</Th>
              <Th>Time out</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs.map((log, index) => (
              <React.Fragment key={index}>
                {log.timeIn.map((timeIn, idx) => (
                  <Tr key={`${index}-${idx}`}>
                    <Td>{log.ownerName}</Td>
                    <Td>{timeIn.date.split('T')[0]}</Td>
                    <Td>{timeIn.time}</Td>
                    {log.timeOut[idx] ? (
                      <Td>{log.timeOut[idx].time}</Td>
                    ) : (
                      <Td>-</Td>
                    )}
                  </Tr>
                ))}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </Center>
    </Box>
  );
};

export default LogPage;
