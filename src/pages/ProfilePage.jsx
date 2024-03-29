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
} from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import LogsPDF from '../components/LogsPDF';

const LogPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/logs`);
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <Box p={4}>
      <Heading size="md">Log</Heading>
      <Center>
        <Button mb={4}>
          <PDFDownloadLink
            document={<LogsPDF logs={logs} />}
            fileName="logs.pdf"
          >
            {({ loading }) =>
              loading ? 'Loading document...' : 'Export to PDF'
            }
          </PDFDownloadLink>
        </Button>
      </Center>
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
                    <Td>{log.rfid}</Td>
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
