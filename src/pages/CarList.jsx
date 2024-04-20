import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cars/');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleOpenModal = car => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  return (
    <Box p={4}>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>List of Cars</TableCaption>
        <Thead>
          <Tr>
            <Th>RFID</Th>
            <Th>Owner Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cars.map(car => (
            <Tr key={car._id}>
              <Td>
                <Link onClick={() => handleOpenModal(car)}>{car.rfid}</Link>
              </Td>
              <Td>{car.ownerName}</Td>
              <Td>{car.ownersEmail}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logs for {selectedCar && selectedCar.rfid}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCar && (
              <>
                <Box mb={4}>
                  <strong>RFID:</strong> {selectedCar.rfid}
                </Box>
                <Box mb={4}>
                  <strong>Owner Name:</strong> {selectedCar.ownerName}
                </Box>
                <Box mb={4}>
                  <strong>Email:</strong> {selectedCar.ownersEmail}
                </Box>
                <Box mb={4}>
                  <strong>Plate No:</strong> {selectedCar.plateNo}
                </Box>
                <Box mb={4}>
                  <strong>Brand:</strong> {selectedCar.brand}
                </Box>
                <Box mb={4}>
                  <strong>Model:</strong> {selectedCar.model}
                </Box>
                <Box mb={4}>
                  <strong>Color:</strong> {selectedCar.color}
                </Box>
              </>
            )}
            <Table variant="striped" colorScheme="gray">
              <TableCaption>Logs</TableCaption>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Time In</Th>
                  <Th>Time Out</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedCar &&
                  selectedCar.timeIn.map((log, index) => (
                    <Tr key={log._id}>
                      <Td>{new Date(log.date).toLocaleDateString()}</Td>

                      <Td>{log.time}</Td>
                      <Td>
                        {selectedCar.timeOut[index]
                          ? selectedCar.timeOut[index].time
                          : 'N/A'}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CarList;
