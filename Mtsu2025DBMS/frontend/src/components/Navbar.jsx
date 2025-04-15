
import { Link } from 'react-router-dom';
import{ Button, Container, Flex, Text, HStack, useColorMode, Input} from '@chakra-ui/react'
import { PlusSquareIcon} from '@chakra-ui/icons'
import {IoMoon} from 'react-icons/io5'
import {LuSun} from 'react-icons/lu'
import { useState } from 'react'
import { useRecipeStore } from '../store/recipe' // Adjust path as needed
import { useUserStore } from '../store/user';
import { Avatar } from '@chakra-ui/react';
import { IoLogIn} from 'react-icons/io5';
import { useColorModeValue } from '@chakra-ui/react';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [searchTerm, setSearchTerm] = useState("");

  const {searchRecipes} = useRecipeStore();
  const {currentUser, logoutUser} = useUserStore();

  const handleSearchRecipe = async(searchTerm) => {
        console.log("Search Term", searchTerm);
        await searchRecipes(searchTerm);   
    };

  return (
    <Container maxW={"2000px"} px={4} paddingTop={4}> 

        <Flex h={10} w={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={2}
        flexDir={{ base: "column", sm: "row" }}>

            <Text
            fontSize={{ base:"22", sm: "28"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient='linear(to-l, green.400, teal.600)'
            bgClip='text'
            whiteSpace="nowrap">
                <Link to={"/"}>Recipe Finder</Link>
            </Text>

            <Input  placeholder="Search by ingredients..."
                value={searchTerm}
                autoCorrect={"on"}
                spellCheck={"true"}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') {  handleSearchRecipe(searchTerm); }}}
                />

           <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <PlusSquareIcon fontSize={20}/>
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}> {colorMode === "light" ? <IoMoon/> : <LuSun size="20"/>}
                </Button>
                {currentUser == null && (
                    <Link to={"/login"}>
                    <Button>
                        <IoLogIn/> {/* Add login icon <Avitar/> for when logged in */}
                    </Button>
                    </Link>
                )}
                {currentUser != null && (
                    <Button
                    onClick ={() => {
                        logoutUser();
                        window.location.reload(); // Refresh the page to reflect the logout
                    }}
                    colorScheme={"red"}>
                        <PlusSquareIcon fontSize={20}/>
                    </Button>
                )}
                
           </HStack>

        </Flex>
    </Container>

  )
}

export default Navbar