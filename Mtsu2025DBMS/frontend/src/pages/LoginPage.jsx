import { Box, Link, useToast, Button, useColorModeValue, Container, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';

const LoginPage = () => {

  const {loginUser, fetchUsers} = useUserStore();
  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      console.log("Fetching Users");
      console.log(useUserStore.getState().users);
    };
    fetchData();
  }, []);

  const [newLogin, setLogin] = useState(
    {
      email: "",
      password: "",
    }
  )

  const navigate = useNavigate(); // Initialize navigate function


  const toast = useToast();

  const handleLogin = async () => {
    console.log("Logging in:");
    console.log(newLogin);
    const {success, message} = await loginUser(newLogin);
    console.log("Login response: ", message);

    if (success) {
      navigate('/'); // Redirect to the homepage
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
      console.log("Login failed:", message);
    }
  };

  const [show, setShow] = useState(false);
  const handleSetShow = () => setShow(!show);

  return (
    <Container maxW={"container.sm"}>
      <VStack
      spacing = {8} marginTop={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          RecipeFinder Login 
        </Heading>

        <Box
        w={"full"} bg={useColorModeValue("white", "gray.800")}
        p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>

            <Input placeholder='Email'
            name='email'
            value={newLogin.email}
            onChange={(e) => setLogin({...newLogin, email:e.target.value})} />

            {/* <Input placeholder='Enter password'
            name='password'
            value={newLogin.password}
            type={show ? 'text' : 'password'}
            onChange={(e) => setLogin({...newLogin, password:e.target.value})} /> */}

            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    name='password'
                    placeholder='Enter password'
                    onChange={(e) => setLogin({...newLogin, password:e.target.value})}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleSetShow}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <Button
            colorScheme='blue' 
            onClick={handleLogin} 
            w='full'>
              Sign in
            </Button>

            <Link to={"/"}>
              <Button onClick={() => {
                navigate('/register');
              }}>
                Create an account
              </Button>
            </Link>
          </VStack>
        </Box>

      </VStack>
    </Container>
  )
}

export default LoginPage