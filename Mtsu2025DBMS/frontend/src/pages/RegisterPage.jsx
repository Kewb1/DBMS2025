import { Box, Button, useColorModeValue, Container, Heading, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import {React, useState, useEffect} from 'react'
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const {createUser, fetchUsers} = useUserStore();
  const [newRegister, setRegister] = useState(
    {
      password: "",
      email: "",
      first_name: "",
      last_name: "",
    }
  );

  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const {success, message} = await createUser(newRegister);

    if(!success) {
      toast({
          title: "Error",
          description: message,
          status: "error",
          isClosable: true,
      })
    } else {
        toast({
            title: "Success",
            description: message,
            status: "success",
            isClosable: true,
        });
        navigate('/login'); // Redirect to the login page after successful registration
    }

    console.log(newRegister);
  };

  const [show, setShow] = useState(false);
  const handleSetShow = () => setShow(!show);

  return (
    <Container maxW={"container.sm"}>
      <VStack
      spacing = {8} marginTop={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
        Register for RecipeFinder 
        </Heading>

        <Box
        w={"full"} bg={useColorModeValue("white", "gray.800")}
        p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>

            <Input placeholder='First Name'
            name='first_name'
            value={newRegister.first_name}
            onChange={(e) => setRegister({...newRegister, first_name:e.target.value})} />

            <Input placeholder='Last Name'
            name='last_name'
            value={newRegister.last_name}
            onChange={(e) => setRegister({...newRegister, last_name:e.target.value})} />

            <Input placeholder='Email'
            name='email'
            value={newRegister.email}
            onChange={(e) => setRegister({...newRegister, email:e.target.value})} />

            {/* <Input placeholder='Enter password'
            name='password'
            value={newRegister.password}
            type={show ? 'text' : 'password'}
            onChange={(e) => setRegister({...newRegister, password:e.target.value})} /> */}

            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    name='password'
                    placeholder='Enter password'
                    onChange={(e) => setRegister({...newRegister, password:e.target.value})}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleSetShow}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <Button
            colorScheme='blue' 
            onClick={handleRegister} 
            w='full'>
              Register
            </Button>
          </VStack>
        </Box>

      </VStack>
    </Container>
  )
}

export default RegisterPage