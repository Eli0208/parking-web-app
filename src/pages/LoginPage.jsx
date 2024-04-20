import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  // Receive onLogin function as props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://parking-web-app-backend.onrender.com/cars/login',
        {
          ownersEmail: username,
          password: password,
        }
      );
      const { accessToken } = response.data;
      onLogin(accessToken); // Call onLogin function with the received accessToken
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password'); // Set error message
    }
  };

  return (
    <Box p={8}>
      <Stack spacing={4}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        {error && <Box color="red">{error}</Box>} {/* Display error message */}
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
