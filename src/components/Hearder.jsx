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
import logo from '../assets/dhvsu_logo_new.png';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg="maroon" w="100%" p={4} color="white">
      <Flex align="center">
        <Heading size="md">
          <Image src={logo} alt="school-logo" boxSize="15%" mr={4} />
        </Heading>
        <Spacer />
        <Link mr={4} color="white" href="register-car">
          Register Car
        </Link>
        <Link mr={4} color="white" href="log">
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
