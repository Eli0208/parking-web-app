import { useState, useEffect } from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import Hearder from './components/Hearder';
import RegisterCarPage from './pages/RegisterCarPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogPage from './pages/LogPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');

  // Function to set token and login status
  const handleLogin = (token, isAdmin) => {
    localStorage.setItem('token', token); // Store token in local storage
    setIsLoggedIn(true); // Update login status
    setIsAdmin(isAdmin); // Update isAdmin status
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsLoggedIn(false); // Update login status
    setIsAdmin(false); // Reset isAdmin status
  };

  useEffect(() => {
    // Check if user is logged in and retrieve isAdmin status from token
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Decode the token to extract the isAdmin status
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        setIsAdmin(decodedToken.isAdmin);
        setEmail(decodedToken.ownersEmail);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [isLoggedIn]);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Hearder
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            onLogout={handleLogout}
          />
          <Routes>
            {/* Redirect to LoginPage if not logged in */}
            {!isLoggedIn && (
              <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            )}
            {/* Redirect to HomePage if logged in */}
            {console.log(isAdmin)}
            {isLoggedIn ? (
              isAdmin ? (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register-car" element={<RegisterCarPage />} />
                  <Route path="/log" element={<LogPage />} />
                </>
              ) : (
                <>
                  <Route
                    path="/"
                    element={<ProfilePage isAdmin={isAdmin} email={email} />}
                  />
                </>
              )
            ) : null}
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
