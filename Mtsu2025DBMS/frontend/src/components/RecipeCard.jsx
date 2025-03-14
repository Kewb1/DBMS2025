import { Box, Image, Heading, useDisclosure, Button, Text, useColorModeValue, IconButton, HStack, ModalContent, useToast, ModalBody, Modal, ModalHeader, ModalCloseButton, VStack, Input, ModalOverlay, ModalFooter } from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import { useRecipeStore } from "../store/recipe"
import { useState } from "react"

const RecipeCard = ({recipe}) => {

    const[updatedRecipe, setUpdatedRecipe] = useState(recipe);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const toast =useToast();

    const {deleteRecipe, updateRecipe} = useRecipeStore();


    const handleDeleteRecipe = async(pid) => {
        const { success, message} = await deleteRecipe(pid);
        if(success) {
            toast({
                title: "Recipe Deleted",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true
            })
        } else {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
        
    }

    const handleUpdateRecipe = async(pid, updatedRecipe) => {
        const {success, message} = await updateRecipe(pid, updatedRecipe); 
        onClose();
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
        else {
            toast({
                title: "Success",
                description: "Recipe updated successfully",
                status: "success",
                duration: 5000,
                isClosable: true
            })

        }   
    }

  return (
    <Box
    shadow="lg"
    rounded='lg'
    overflow="hidden"
    transition='all 0.3s'
    _hover={{transform: "translateY(-5px)", shadow: "xl"}}
    bg={bg}> 

        <Image src={recipe.img_src} alt={recipe.recipe_name} w={"full"} objectFit={"cover"}/>

        <Box p = {4} >
            <Heading as="h3" size='md' mb={2}>
                {recipe.recipe_name}
            </Heading>

            <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                {recipe.total_time}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue' />
                <IconButton icon={<DeleteIcon/>} onClick = {() => handleDeleteRecipe(recipe._id)} colorScheme='red' />
            </HStack>

        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>

            <ModalContent>

                <ModalHeader>Update Recipe</ModalHeader>

                <ModalCloseButton/>

                <ModalBody>
                    <VStack spacing={4}>
                    <Input 
                    placeholder="Recipe Name" 
                    name="recipe_name" 
                    value={updatedRecipe.recipe_name} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, recipe_name: e.target.value })}
                    />
                    <Input 
                    placeholder="Servings" 
                    name="servings" 
                    type="number" 
                    value={updatedRecipe.servings} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, servings: parseInt(e.target.value) })}
                    />
                    <Input 
                    placeholder="Yield" 
                    name="yield" 
                    value={updatedRecipe.yield} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, yield: e.target.value })}
                    />
                    <Input 
                    placeholder="Ingredients" 
                    name="ingredients" 
                    value={updatedRecipe.ingredients} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, ingredients: e.target.value })}
                    />
                    <Input 
                    placeholder="Directions" 
                    name="directions" 
                    value={updatedRecipe.directions} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, directions: e.target.value })}
                    />
                    <Input 
                    placeholder="Rating" 
                    name="rating" 
                    type="number" 
                    step="0.1"
                    value={updatedRecipe.rating} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, rating: parseFloat(e.target.value) })}
                    />
                    <Input 
                    placeholder="URL" 
                    name="url" 
                    value={updatedRecipe.url} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, url: e.target.value })}
                    />
                    <Input 
                    placeholder="Cuisine Path" 
                    name="cuisine_path" 
                    value={updatedRecipe.cuisine_path} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, cuisine_path: e.target.value })}
                    />
                    <Input 
                    placeholder="Nutrition" 
                    name="nutrition" 
                    value={updatedRecipe.nutrition} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, nutrition: e.target.value })}
                    />
                    <Input 
                    placeholder="Timing" 
                    name="timing" 
                    value={updatedRecipe.timing} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, timing: e.target.value })}
                    />
                    <Input 
                    placeholder="Image URL" 
                    name="img_src" 
                    value={updatedRecipe.img_src} 
                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, img_src: e.target.value })}
                    />
                     </VStack>                   
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleUpdateRecipe(recipe._id, updatedRecipe)}>Update</Button>
                    <Button variant = {"ghost"} onClick={onClose}>Cancel</Button> 
                </ModalFooter>

            </ModalContent>
        </Modal>
    </Box>
  )
}

export default RecipeCard