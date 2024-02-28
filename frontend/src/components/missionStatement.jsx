import React from 'react';
import { Box, Text, Heading, Container, VStack, Icon } from '@chakra-ui/react';
import { GiEarthAmerica } from 'react-icons/gi';
import { motion } from 'framer-motion';
import earthHand from '../imgs/earthHand1.png';

export default function MissionStatement() {

  const MotionBox = motion(Box);
  const MotionImg = motion.img;

  return (
    <Container centerContent maxW="60rem" mb="20rem" p="5" position="relative">
      <MotionBox 
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        initial={{ x: 400, y: 300, opacity: 0 }}
        whileInView={{ x: 150, y: -30, opacity: 1 }}
        transition={{ duration: 1 }}
        zIndex={-1}
      >
        <MotionImg 
          src={earthHand}
          alt="Earth in hand"
          maxH="40rem"
          maxW="40rem"
        />
      </MotionBox>

      <VStack spacing={10} align="stretch" zIndex={1}>
        <motion.div 
          style={{
            textAlign: "center",
          }}
          initial={{ x: -500, y: 300, opacity: 0 }}
          whileInView={{ x: -150, y: 100, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Icon as={GiEarthAmerica} w={10} h={10} color="green.500" mb={4} />
          <Heading
            fontSize="3rem"
            fontWeight="bold"
            mb="2rem"
            color="gray.800"
          >
            Our Mission
          </Heading>
          <Text
            fontSize="1.5rem"
            color="black"
            lineHeight="1.6"
          >
            Our platform addresses the health concerns in urban areas caused by litter. We aim to empower users to connect and collaborate in cleaning up their community through our app. We strive to build a strong and supportive digital community for enhanced well-being by fostering meaningful relationships and promoting cleanliness.
          </Text>
        </motion.div>
        <motion.div
          style={{
            padding: "5",
            borderRadius: "lg",
            bg: "#e4e4e4",
            textAlign: "center",
            color: "black",
          }}
          initial={{ x: -500, y: 200, opacity: 0 }}
          whileInView={{ x: -150, y: 100, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Text fontSize="lg" textAlign={'center'}>
            Join us in making a difference. Together, we can create a cleaner, healthier environment for all!
          </Text>
        </motion.div>
      </VStack>
    </Container>
  );
}
