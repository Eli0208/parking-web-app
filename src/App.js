import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import Hearder from './components/Hearder';
import RegisterCarPage from './pages/RegisterCarPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogPage from './pages/LogPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Hearder />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register-car" element={<RegisterCarPage />} />
            <Route path="/log" element={<LogPage />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
