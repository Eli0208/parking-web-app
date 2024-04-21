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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchData();

    const fetchDataInterval = setInterval(fetchData, 500);

    return () => clearInterval(fetchDataInterval);
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const startDateString = startDate.toISOString().split('T')[0];
      const endDateString = endDate.toISOString().split('T')[0];

      const response = await axios.get(
        `https://parking-web-app-backend.onrender.com/logs/date/${startDateString}/${endDateString}`
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
        <Flex>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div style={{ marginLeft: '20px' }}>
            <label htmlFor="endDate">End Date:</label>
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </Flex>
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
