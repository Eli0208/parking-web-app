import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  IconButton,
  useColorMode,
  Link,
  Image,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom'; // Import the Link component from React Router
import logo from '../assets/dhvsu_logo_new.png';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg="maroon" w="100%" p={4} color="white">
      <Flex align="center">
        {/* Wrap the Image component with a Link */}
        <Link as={RouterLink} to="/" mr={4}>
          <Image src={logo} alt="school-logo" boxSize="15%" />
        </Link>
        <Spacer />
        <Link as={RouterLink} to="/register-car" mr={4} color="white">
          Register Car
        </Link>
        <Link as={RouterLink} to="/log" mr={4} color="white">
          Log
        </Link>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  );
};

export default NavBar;
