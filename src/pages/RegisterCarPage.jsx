import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from '@chakra-ui/react';

const RegisterCarPage = () => {
  const [rfid, setRfid] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [plateNo, setPlateNo] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ rfid, ownerName, plateNo, brand, model, color });
  };

  return (
    <Center mt={10}>
      <Box p={4} width="50%">
        <Heading size="md" textAlign="center">
          Register Car
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="rfid">
            <FormLabel>RFID no.</FormLabel>
            <Input
              type="text"
              value={rfid}
              onChange={e => setRfid(e.target.value)}
            />
          </FormControl>
          <FormControl id="ownerName">
            <FormLabel>Owner's name</FormLabel>
            <Input
              type="text"
              value={ownerName}
              onChange={e => setOwnerName(e.target.value)}
            />
          </FormControl>
          <FormControl id="plateNo">
            <FormLabel>Plate no.</FormLabel>
            <Input
              type="text"
              value={plateNo}
              onChange={e => setPlateNo(e.target.value)}
            />
          </FormControl>
          <FormControl id="brand">
            <FormLabel>Brand</FormLabel>
            <Input
              type="text"
              value={brand}
              onChange={e => setBrand(e.target.value)}
            />
          </FormControl>
          <FormControl id="model">
            <FormLabel>Model</FormLabel>
            <Input
              type="text"
              value={model}
              onChange={e => setModel(e.target.value)}
            />
          </FormControl>
          <FormControl id="color">
            <FormLabel>Color</FormLabel>
            <Input
              type="text"
              value={color}
              onChange={e => setColor(e.target.value)}
            />
          </FormControl>
          <Button mt={4} bg="maroon" type="submit" color="white" width="100%">
            Submit
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default RegisterCarPage;
