import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import avatarSrc from '../assets/my.jpg';

const Footer = () => {
  return <Box bgColor={'blackAlpha.900'} color={"whiteAlpha.800"} minH={"48"} px={"16"} py={["16","8"]}>
      <Stack direction={["column","row"]} h={"full"} alignItems={"center"} >

            <VStack w={"full"} alignItems={["center","flex-start"]}>
                  <Text fontWeight={"bold"}>About Me</Text>
                  <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center","left"]}>I'm self learner on crypto  trading app with reactJS ...</Text>

            </VStack>
            <VStack>
                  <Avatar boxSize={"28"} mt={["4","0"]} src={avatarSrc}>

                  </Avatar>
                  <Text>Nahid Hasan</Text>
            </VStack>

      </Stack>

  </Box>
};

export default Footer;
