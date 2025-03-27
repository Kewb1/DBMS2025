import { Box, Button, useColorModeValue, Container, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import {React, useState} from 'react'

const LoginPage = () => {
  const [newLogin, setLogin] = useState(
    {
      username: "",
      password: "",
    }
  )

  const handleLogin = () => {
    console.log(newLogin);
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

            <Input placeholder='Username or email'
            name='username'
            value={newLogin.username}
            onChange={(e) => setLogin({...newLogin, username:e.target.value})} />

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
          </VStack>
        </Box>

      </VStack>
    </Container>
  )
}

export default LoginPage