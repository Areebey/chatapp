import { useEffect, useRef, useState } from 'react';
import './App.css';
import {Box, Container, VStack,Button,Input, HStack} from "@chakra-ui/react"
import Messages from './Components/Messages';
import {app} from "./Components/firebase"
import {signOut, onAuthStateChanged, getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import {query, orderBy, onSnapshot, getFirestore,addDoc, collection, serverTimestamp} from "firebase/firestore"

const auth=getAuth(app);
const db=getFirestore(app);

const loginHandler=()=>{
  const provider=new GoogleAuthProvider();
  signInWithPopup(auth,provider)
}

const logoutHandler=()=>{
 signOut(auth) 
}
function App() {

  const [user,setuser]=useState(false);
  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState([]);
  const divForScroll=useRef(null)

  useEffect(()=>{
    const q=query(collection(db,"Messages"),orderBy("createdAt","asc"))
   const unsubscribe= onAuthStateChanged(auth,(data)=>{
      setuser(data)
    });

   const unsubscribeForMessages= onSnapshot(q,(snap)=>{
      setMessages(
        snap.docs.map((item)=>{
          const id = item.id;
          return {id , ...item.data()}

        })
        );
    })

    return ()=>{
      unsubscribe();
      unsubscribeForMessages();
    };
  },[]);

  const submitHandler= async(e)=>{
    e.preventDefault();

    try {
     setMessage("");
      await addDoc(collection(db,"Messages"),{
        text:message,
        uid:user.uid,
        uri:user.photoURL,
        createdAt:serverTimestamp(),
      });
  
  divForScroll.current.scrollIntoView({behaviour:"smooth"})

    } catch (error) {
      alert(error)
    }
  }

  return (
    <Box bg={"red.50"}>
      {
        user ?(
        <Container h={"100vh"} bg={'white'}>
        <VStack h={'full'} bg={"telegram.100"} padding={'4 '} overflowY={'auto'} >
          <Button onClick={logoutHandler} colorScheme='red' w={"full"} >LOgOut</Button>
          <VStack h={'full'} w={'full'} overflowY={"auto"} css={{"&::-webkit-scrollbar":{
            display:"none"
          }}} >
            {
              messages.map(item =>(
              <Messages
              key={item.id} 
              user={item.udi === user.uid ? "me" : "other"} 
              text={item.text} 
              uri={item.uri}
               />
              ))
            }
         <div ref={divForScroll}></div>
         </VStack>
         <form onSubmit={submitHandler} style={{width:"100%"}}>
          <HStack>
          <Input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter a Message' />
          <Button colorScheme='purple' type='Submit' >Send</Button>
          </HStack>
         </form>
        </VStack>
      </Container>
      ):<VStack justifyContent={"center"} h={"100vh"}>
        <Button onClick={loginHandler} colorScheme='purple' >Sign in with Google</Button>
      </VStack>
      }
    </Box>
  );
}

export default App;

