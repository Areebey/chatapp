import './App.css';
import {Box, Container, VStack,Button,Input, HStack} from "@chakra-ui/react"
import Messages from './Components/Messages';

function App() {
  return (
    <Box bg={"red.50"}>
      <Container h={"100vh"} bg={'white'}>
        <VStack h={'full'} bg={"telegram.100"} padding={'4 '} >

          <Button colorScheme='red' w={"full"} >LOgOut</Button>
          <VStack h={'full'} w={'full'}>
            <Messages text="Sample text" />
            <Messages user="me" text="Sample text" />
            <Messages text="Sample text" />
         </VStack>
         <form style={{width:"100%"}}>
          <HStack>
          <Input placeholder='Enter a Message' />
          <Button colorScheme='purple' type='Submit' >Send</Button>
          </HStack>
         </form>
        </VStack>
      </Container>
    </Box>
    
  );
}

export default App;
