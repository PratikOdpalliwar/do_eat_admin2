 
import {
  chakra,
  Box,
  Stack,
  HStack,
  Container,
  Avatar,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Grid,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  Textarea,
  Text,
  useColorMode,
  Spinner,
  Select,
} from "@chakra-ui/react";
// import data from "../Data";
import { UploadButton } from "@bytescale/upload-widget-react";
import { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import BeatLoader from 'react-spinners/BeatLoader';
import axios from "axios";

import { useToast } from '@chakra-ui/react'
const Yantra = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false)
  const [inLoading, setInLoading] = useState(false)
  const toast = useToast()
  const [render, setRender] = useState(false)
  const [product, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(product);
  const [image, setImage] = useState("")

const textColor = localStorage.getItem("chakra-ui-color-mode")
  const options = {
    apiKey: "public_kW15bwHB6bQ5Wv42R9fgNg5vPtjH",
    maxFileCount: 1,
    showFinishButton: true,
   
  };


  const renderComp = () => {
    setRender((prev)=> !prev)
  }

  const fetchData = async () => {
    setInLoading(true)
    try {
      const response = await axios.get(
        "http://localhost:4000/yantra"
      );
      setInLoading(false)
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setInLoading(false)
    }
  };
 
  const handleAddGemstoneClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData({
      title: '',
      description: '',
      image: '',
      quantity: 0,
      price:"",
      veg:""
    });
  };
 
  // const handleEditClick = (product) => {
  //   setEditingProduct(product);
  //   setIsModalOpen(true);
  // };
  const handleSaveEdit = async () => {
    console.log(editingProduct) 
    try {
      if (editingProduct && editingProduct._id) {
        const res = await axios.put(
          `http://localhost:4000/yantr/${editingProduct._id}`,
          editingProduct
          );
        fetchData();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    const filteredGemstones = product.filter((gemstone) =>
      gemstone.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredGemstones);
  }, [searchQuery, product]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/yantra/delete/${id}`);

      if (res.data.state) {
        renderComp();
        toast({
          title: 'Product deleted successfully!!',
          status: 'success',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error deleting product!!',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
      console.error("Error deleting product:", error);
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    quantity: "",
    price:"",
    veg:""
  });
 



  const handleChange = (event) => {
    const { name, value } = event.target;

  const parsedValue = name === "quantity" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
  };
  const handleChangeveg = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, veg: value });
  };

  const handleChangePrice = (event) => {
    const { name, value } = event.target;

    const parsedValue1 = name === "price" ? parseInt(value, 10) : value;
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue1 }));
  };
 
const handleSubmit = async () => {
  try {
  
     const res = await axios.post("http://localhost:4000/yantra/create", formData);

     if (res.data.state) {
      toast({
        title: 'Product Added successfully!!',
        status: 'success',
        duration: 4000,
        position: 'top-right',  
        isClosable: true,
      });

      setFormData({
        title: '',
        price:"",
        description: '',
        image: '',
        quantity: 0,
        veg:""
      });

       renderComp();
       setAddLoading(false);
       setIsAddModalOpen(false);
     }
  } catch (error) {
    toast({
      title: 'Error during adding product',
      status: 'error',
      duration: 4000,
      position: 'top-right',
      isClosable: true,
    });

    console.log(error);
    setAddLoading(false);
  }
};



console.log("forrmm",formData)

useEffect(() => {
  fetchData();
}, [render]);


  return (
    <Box>
      <chakra.h1 textAlign="center" fontSize="2xl" fontWeight="bold" mb={4}>
        Dishes Products
      </chakra.h1>
    
      <Box>
        <InputGroup mb={4} mx="auto" maxW="md">
          <Input
            type="text"
            placeholder="Search for a product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
        <Center>
          {" "}
          <Button
            variant={"outline"}
            colorScheme={"green"}
            onClick={handleAddGemstoneClick}
          >
            Add Dishes
          </Button>
        </Center>
      </Box>

      {/* isOpen={isAddModalOpen} onClose={handleCloseAddModal} */}
      <Modal size={"xl"} isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
         <ModalBody>
         <Box>
        
        <Box display={"flex"} gap={2}>
        <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" onChange={handleChange} value={formData.title} placeholder="product name"/>
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input type="text" name="image" onChange={handleChange} value={formData.image} placeholder="image address"/>
          </FormControl>
         {/* image uplaod code goes here   */}
          <Box className="container">
       <UploadButton options={options}
                onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}>
    {({onClick}) =>
      <Button mt={7} colorScheme="green" onClick={onClick}>
       Image Upload..
      </Button>
    }
  </UploadButton>
    </Box>
    
        </Box>
        <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input type="number" name="price" onChange={handleChangePrice} value={formData.price} placeholder="Enter price"/>
          </FormControl>

        
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" onChange={handleChange} value={formData.description} />
          </FormControl>

<FormControl mt={4}>
            <FormLabel>Quantity</FormLabel>
            <Input type="number" name="quantity" onChange={handleChange} value={formData.quantity} placeholder="product quantity"/>
         
          </FormControl>
<FormControl mt={4}>
            <FormLabel>Sort filter</FormLabel>
            <Input type="text" name="quantity" onChange={handleChange} value={formData.quantity} placeholder="product quantity"/>
         
          </FormControl>
          {/* Submit Button */}
        {addLoading ? <Button isLoading mt={4} ml={2}  spinner={<BeatLoader size={8} color='white' />} colorScheme="yellow"  onClick={handleSubmit}>
           ADD Dishes
           </Button> :   <Button mt={4} ml={2} colorScheme="yellow"  onClick={handleSubmit}>
           ADD Dishes
           </Button>}
        </Box>
         </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Add Gemstone
            </Button> */}
            <Button colorScheme="red" onClick={handleCloseAddModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    {inLoading ? <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.200"
            size="xl"
            position={"relative"}
            top={"10rem"}
          />
        </Center> :   <Grid  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        {filteredData.map((gemstone, index) => (
          <Container   key={index} maxW="5xl" p={{ base: 5, md: 6 }}>
            <Stack  boxShadow={"lg"} bgColor="#f8f9fa" maxW="100%" spacing={2} p={4} rounded="md">
              <HStack justifyContent="space-between" alignItems="baseline">
                <Box pos="relative">
                  <Avatar
                    boxShadow="2px 0px 6px 2px #d2d2d2"
                    src={gemstone.image}
                    size="xl"
                    borderRadius="md"
                  />
                </Box>
                <HStack justifyContent="flex-end">
                  {/* <Button
                    colorScheme="green"
                    onClick={() => handleEditClick(gemstone)}
                  >
                    Edit
                  </Button> */}
                  <Button
                   colorScheme={textColor === 'dark' ? 'red' : 'red'}
                    onClick={() => handleDelete(gemstone._id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </HStack>

              <chakra.h1 fontSize="xl"  fontWeight="bold" color={"black"}>
                Name : {gemstone.title}
              </chakra.h1>
              <chakra.h1 fontSize="xl"  fontWeight="bold" color={"black"}>
                Price : {gemstone.price}
              </chakra.h1>
              <Text  color={"black"}>
                Description : {gemstone.description}
              </Text>

              

              <Divider />
            </Stack>
          </Container>
        ))}
      </Grid>}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Gemstone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box>
        
        <Box display={"flex"} gap={2}>
        <FormControl>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" onChange={handleChange} value={formData.title} placeholder="product name"/>
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input type="text" name="image" onChange={handleChange} value={formData.image} placeholder="image address"/>
          </FormControl>
         {/* image uplaod code goes here   */}
          <Box className="container">
       <UploadButton options={options}
                onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}>
    {({onClick}) =>
      <Button mt={7} colorScheme="green" onClick={onClick}>
       Image Upload..
      </Button>
    }
  </UploadButton>
    </Box>
    
        </Box>
        <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input type="number" name="price" onChange={handleChangePrice} value={formData.price} placeholder="Enter price"/>
          </FormControl>

        
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" onChange={handleChange} value={formData.description} />
          </FormControl>

         

<FormControl mt={4}>
            <FormLabel>Quantity</FormLabel>
            <Input type="number" name="quantity" onChange={handleChange} value={formData.quantity} placeholder="product quantity"/>
          </FormControl>
         
       
        </Box>

         

          
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSaveEdit}>
              Update
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Yantra;
