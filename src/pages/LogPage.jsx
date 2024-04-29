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
  }, []);

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

  console.log(logs);

  const convertToPST = dateTimeString => {
    const dateTimeUTC = new Date(dateTimeString);
    return dateTimeUTC.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Singapore',
    });
  };

  const handleFetchData = () => {
    fetchData();
  };

  // Alternative filtering approach
  const filteredLogs = logs.map(log => {
    const filteredTimeIn = log.timeIn.filter(entry => {
      const date = new Date(entry.date);
      return date >= startDate && date <= endDate;
    });

    const filteredTimeOut = log.timeOut.filter(entry => {
      const date = new Date(entry.date);
      return date >= startDate && date <= endDate;
    });

    return {
      ...log,
      timeIn: filteredTimeIn,
      timeOut: filteredTimeOut,
    };
  });

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
          <Button ml={4} onClick={handleFetchData}>
            Fetch Data
          </Button>
        </Flex>
        <PDFDownloadLink
          document={<LogsPDF logs={filteredLogs} />}
          fileName="logs.pdf"
        >
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
            {filteredLogs.map((log, index) => (
              <React.Fragment key={index}>
                {log.timeIn.map((timeIn, idx) => (
                  <Tr key={`${index}-${idx}`}>
                    <Td>{log.ownerName}</Td>
                    <Td>{timeIn.date.split('T')[0]}</Td>
                    <Td>{convertToPST(timeIn.date)}</Td>
                    {log.timeOut[idx] ? (
                      <Td>{convertToPST(log.timeOut[idx].date)}</Td>
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
