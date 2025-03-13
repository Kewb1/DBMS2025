import { Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast } from '@chakra-ui/react';
import{useState } from 'react';
import { useRecipeStore } from '../store/recipe';


const CreatePage = () => {
    const [newRecipe, setNewRecipe] = useState({
        recipe_name: '',
            prep_time: '',
            cook_time: '',
            total_time: '',
            servings: 0,
            yield: '',
            ingredients :'',
            directions:'' ,
            rating: 0,
            url: '',  
            cuisine_path: '',
            nutrition: '',
            timing: '' ,
            img_src: ''
    });

    const toast = useToast();

    const {createRecipe} = useRecipeStore();

    const handleAddRecipe = async() => {

        const {success, message} = await createRecipe(newRecipe)

        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            })
        }else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            })
        }

        setNewRecipe({
            recipe_name: '',
            prep_time: '',
            cook_time: '',
            total_time: '',
            servings: 0,
            yield: '',
            ingredients :'',
            directions:'' ,
            rating: 0,
            url: '',  
            cuisine_path: '',
            nutrition: '',
            timing: '' ,
            img_src: ''
        });
    };

    return (
        <Container maxW="container.sm">
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create new Recipe</Heading>

                <Box w= {"full"} bg={useColorModeValue("white", "gray.800")} rounded={"lg"} p={6} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input 
                        placeholder="Recipe Name" 
                        name='recipe_name' 
                        value={newRecipe.recipe_name} 
                        onChange = {(e) => setNewRecipe({...newRecipe, recipe_name: e.target.value})}/>

                        <Input
                        placeholder="prep_time"
                        name='prep_time'
                        value={newv.prep_time}
                        onChange = {(e) => setNewRecipe({...newv, prep_time: e.target.value})}/>
                        
                        <Input
                        placeholder="Recipe cook_time"
                        name='cook_time'
                        value={newv.cook_time}
                        onChange = {(e) => setNewRecipe({...newv, cook_time: e.target.value})}/>
                        
                        <Input
                        placeholder="Recipe total_time"
                        name='total_time'
                        value={newv.total_time}
                        onChange = {(e) => setNewRecipe({...newv, total_time: e.target.value})}/>

                        <Input
                        placeholder="Recipe servings"
                        name='servings'
                        type = 'number' 
                        value={newv.servings}
                        onChange = {(e) => setNewRecipe({...newv, servings: e.target.value})}/>

                        <Input
                        placeholder="Recipe yield"
                        name='yield'
                        value={newv.yield}
                        onChange = {(e) => setNewRecipe({...newv, yield: e.target.value})}/>

                        <Input
                        placeholder="Recipe ingredients"
                        name='ingredients'
                        value={newv.ingredients}
                        onChange = {(e) => setNewRecipe({...newv, ingredients: e.target.value})}/>

                        <Input 
                        placeholder="Recipe directions"
                        name='directions'
                        value={newv.directions}
                        onChange = {(e) => setNewRecipe({...newv, directions: e.target.value})}/> 

                        <Input 
                        placeholder="Recipe rating"
                        name='rating'
                        type = 'number' 
                        value={newv.rating}
                        onChange = {(e) => setNewRecipe({...newv, rating: e.target.value})}/> 

                        <Input 
                        placeholder="Recipe url"
                        name='url'
                        value={newv.url}
                        onChange = {(e) => setNewRecipe({...newv, url: e.target.value})}/> 

                        <Input 
                        placeholder="Recipe cuisine_path"
                        name='cuisine_path'
                        value={newv.cuisine_path}
                        onChange = {(e) => setNewRecipe({...newv, cuisine_path: e.target.value})}/> 

                        <Input 
                        placeholder="Recipe nutrition"
                        name='nutrition'
                        value={newv.nutrition}
                        onChange = {(e) => setNewRecipe({...newv, nutrition: e.target.value})}/> 

                        <Input 
                        placeholder="Recipe timing, includes prep, cook, total, and servings"
                        name='timing'
                        value={newv.timing}
                        onChange = {(e) => setNewRecipe({...newv, timing: e.target.value})}/> 

                        <Input
                        placeholder="Image URL"
                        name='img_src'
                        value={newRecipe.img_src}
                        onChange = {(e) => setNewRecipe({...newRecipe, img_src: e.target.value})}/>
                        
                        <Button colorScheme='blue' onClick={handleAddRecipe} w='full'>
                            Add Recipe
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default CreatePage