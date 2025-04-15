import  {Route, Routes} from 'react-router-dom'
import {Box, useColorModeValue} from '@chakra-ui/react'
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import { useUserStore } from './store/user';
import { useEffect } from 'react';

function App() {

  const loadUserFromStorage = useUserStore((state) => state.loadUserFromStorage);

  useEffect(() => {
      loadUserFromStorage();
  }, []);

  return (
    <>
      <Box minH={"100vh"}  bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar  />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
