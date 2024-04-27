import React, { useState } from 'react';
import axios from 'axios';
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
  const [password, setPassword] = useState('');
  const [ownersEmail, setOwnersEmail] = useState('');

  // Function to generate a random password
  const generatePassword = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 8;
    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters.charAt(randomIndex);
    }
    return newPassword;
  };

  // Function to handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    const newPassword = generatePassword();
    setPassword(newPassword);

    try {
      const response = await axios.post(
        'https://parking-web-app-backend.onrender.com/cars/register-car',
        {
          rfid,
          ownerName,
          ownersEmail, // Include the owner's email in the request
          plateNo,
          brand,
          model,
          color,
          password: newPassword, // Send the auto-generated password to the backend
        }
      );

      console.log('Car registered successfully:', response.data);
    } catch (error) {
      console.error('Error registering car:', error);
    }
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
          <FormControl id="ownersEmail">
            {' '}
            <FormLabel>Owner's email</FormLabel>
            <Input
              type="email"
              value={ownersEmail}
              onChange={e => setOwnersEmail(e.target.value)}
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
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
              readOnly
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
