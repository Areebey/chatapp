import React from 'react';
import {HStack, Avatar, Text} from "@chakra-ui/react"

const Messages = ({text,uri,user="other"}) => {
  return (
    <HStack alignSelf={user==="me"?"flex-end":"flex-start"} borderRadius={"base"} bg="telegram.200" paddingY={2} paddingX={4}>
        <Text>{text}</Text>
        <Avatar src={uri} />
    </HStack>
   
  )
}

export default Messages