import React from 'react';
import { Box, Flex, Button, useColorMode, Link, Image } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom'; // Import the Link component from React Router
import logo from '../assets/dhvsu_logo_new.png';

const NavBar = ({ isLoggedIn, onLogout, isAdmin }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    // Call the logout function passed as a prop
    onLogout();
  };

  return (
    <Box bg="maroon" w="100%" p={4} color="white">
      <Flex align="center">
        {/* Wrap the Image component with a Link */}
        <Link as={RouterLink} to="/" mr={4}>
          <Image src={logo} alt="school-logo" boxSize="15%" />
        </Link>
        <Flex align="center" ml="auto">
          {isAdmin && (
            <>
              <Link as={RouterLink} to="/register-car" mr={4} color="white">
                Register Car
              </Link>
              <Link as={RouterLink} to="/log" mr={4} color="white">
                Log
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Button
              colorScheme="white"
              variant="outline"
              mx={2}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
          <Button
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            colorScheme="white"
            variant="outline"
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
