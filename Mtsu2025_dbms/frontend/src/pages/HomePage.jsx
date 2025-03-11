import { Container, SimpleGrid, textDecoration, VStack,  Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product"
import ProductCard from "../components/ProductCard"

const  HomePage = () => {
const {fetchProducts, products} = useProductStore();
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    console.log("products",products);

    return (
        <Container maxW={"container.xl"} py={12}> 
            <VStack spacing = {8} >
                <Text
                fontSize={30}
                fontWeight={"bold"}
                textAlign={"center"}
                bgGradient='linear(to-l, cyan.400, blue.500)'
                bgClip='text'>
                    Current Products 🚀
                </Text>

                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={10} w={"full"}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                
                </SimpleGrid>

                {products.length === 0 && (
                    <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"} color={"gray.500"}>
                        No products found 😞 {" "}
                        <Text as="span" color={"blue.500"} _hover={{textDecoration: "underline"}}>
                            <Link to={"/create"}>
                                    Create a Product
                            </Link>
                        </Text>
                    </Text>
                )}
            </VStack>
        </Container>
    )
} 

export default HomePage