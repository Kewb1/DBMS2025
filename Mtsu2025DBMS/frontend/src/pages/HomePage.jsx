import { Container, SimpleGrid, textDecoration, VStack,  Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useRecipeStore } from "../store/recipe"
import RecipeCard from "../components/RecipeCard"

const  HomePage = () => {
    const { fetchRecipes, recipes } = useRecipeStore();
        useEffect(() => {
            fetchRecipes();
        }, []);

    return (
        <Container maxW={"container.xl"} py={4}> 
            <VStack spacing = {8} >
                               
                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} rows={{base: 10, md: 25, lg: 50}} spacing={10} w={"full"}>
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </SimpleGrid>

                {recipes.length === 0 && (
                    <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"} color={"gray.500"}>
                        No Results Found 😞  {" "}

                        {/*} ONLY FOR SPECIFIC USERS, IF YOU CREATED THE RECIPE YOU CAN DELETE IT, OR IF AN ADMIN
                        <Text as="span"  bgGradient='linear(to-l, green.400, teal.600)' bgClip='text' _hover={{textDecoration: "underline"}}>
                            <Link to={"/create"}>
                                    Create a Recipe
                            </Link>
                        </Text>

                        */}
                    </Text>
                )}
            </VStack>
        </Container>
    )
} 

export default HomePage