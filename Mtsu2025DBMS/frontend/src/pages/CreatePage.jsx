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
            <VStack spacing={8} marginTop={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} >Create new Recipe</Heading>

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
                        value={newRecipe.prep_time}
                        onChange = {(e) => setNewRecipe({... newRecipe, prep_time: e.target.value})}/>
                        
                        <Input
                        placeholder="Recipe cook_time"
                        name='cook_time'
                        value={newRecipe.cook_time}
                        onChange = {(e) => setNewRecipe({...newRecipe, cook_time: e.target.value})}/>
                        
                        <Input
                        placeholder="Recipe total_time"
                        name='total_time'
                        value={newRecipe.total_time}
                        onChange = {(e) => setNewRecipe({...newRecipe, total_time: e.target.value})}/>

                        <Input
                        placeholder="Recipe servings"
                        name='servings'
                        type = 'number' 
                        value={newRecipe.servings}
                        onChange = {(e) => setNewRecipe({...newRecipe, servings: e.target.value})}/>

                        <Input
                        placeholder="Recipe yield"
                        name='yield'
                        value={newRecipe.yield}
                        onChange = {(e) => setNewRecipe({...newRecipe, yield: e.target.value})}/>

                        <Input
                        placeholder="Recipe ingredients"
                        name='ingredients'
                        value={newRecipe.ingredients}
                        onChange = {(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})}/>

                        <Input 
                        placeholder="Recipe directions"
                        name='directions'
                        value={newRecipe.directions}
                        onChange = {(e) => setNewRecipe({...newRecipe, directions: e.target.value})}/> 

                        <Input 
                        placeholder="Recipe rating"
                        name='rating'
                        type = 'number' 
                        value={newRecipe.rating}
                        onChange = {(e) => setNewRecipe({...newRecipe, rating: e.target.value})}/> 

                        <Input 
                        placeholder="Recipe url"
                        name='url'
                        value={newRecipe.url}
                        onChange = {(e) => setNewRecipe({...newRecipe, url: e.target.value})}/> 

                        <Input 
                        placeholder="Recipe cuisine_path"
                        name='cuisine_path'
                        value={newRecipe.cuisine_path}
                        onChange = {(e) => setNewRecipe({...newRecipe, cuisine_path: e.target.value})}/> 

                        <Input 
                        placeholder="Recipe nutrition"
                        name='nutrition'
                        value={newRecipe.nutrition}
                        onChange = {(e) => setNewRecipe({...newRecipe, nutrition: e.target.value})}/> 

                        <Input 
                        placeholder="Recipe timing, includes prep, cook, total, and servings"
                        name='timing'
                        value={newRecipe.timing}
                        onChange = {(e) => setNewRecipe({...newRecipe, timing: e.target.value})}/> 

                        <Input
                        placeholder="Image URL"
                        name='img_src'
                        value={newRecipe.img_src}
                        onChange = {(e) => setNewRecipe({...newRecipe, img_src: e.target.value})}/>
                        
                        <Button bgGradient='linear(to-l, green.400, teal.600)' onClick={handleAddRecipe} w='full'>
                            Add Recipe
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default CreatePage