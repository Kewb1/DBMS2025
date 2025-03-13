import { Container, SimpleGrid, textDecoration, VStack,  Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useRecipeStore } from "../store/recipe"
import RecipeCard from "../components/RecipeCard"

const  HomePage = () => {
const {fetchRecipes, recipes} = useRecipeStore();
    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);
    //console.log("Recipes",recipes);

    return (
        <Container maxW={"container.xl"} py={12}> 
            <VStack spacing = {8} >
                <Text
                fontSize={30}
                fontWeight={"bold"}
                textAlign={"center"}
                bgGradient='linear(to-l, cyan.400, blue.500)'
                bgClip='text'>
                    Recipe
                </Text>

                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} rows={{base: 10, md: 25, lg: 50}} spacing={10} w={"full"}>
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </SimpleGrid>

                {recipes.length === 0 && (
                    <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"} color={"gray.500"}>
                        No Recipe found 😞 {" "}
                        <Text as="span" color={"blue.500"} _hover={{textDecoration: "underline"}}>
                            <Link to={"/create"}>
                                    Create a Recipe
                            </Link>
                        </Text>
                    </Text>
                )}
            </VStack>
        </Container>
    )
} 

export default HomePage