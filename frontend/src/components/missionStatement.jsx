import React from 'react';
import { Box, Text, Heading, Container, VStack, Icon } from '@chakra-ui/react';
import { GiEarthAmerica } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

export default function MissionStatement() {
  return (
    <Container centerContent maxW="60rem" mt="12rem" mb="12rem" p="5">
      <VStack
        spacing={10}
        align="stretch"
      >
        <Box textAlign="center">
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
            color="gray.600"
            lineHeight="1.6"
          >
            Our platform addresses the health concerns in urban areas caused by litter. We aim to empower users to connect and collaborate in cleaning up their community through our app. We strive to build a strong and supportive digital community for enhanced well-being by fostering meaningful relationships and promoting cleanliness.
          </Text>
        </Box>
        <Box
          p="5"
          borderRadius="lg"
          bg="#e4e4e4" 
          border="1px"
          borderColor="gray.200"
        >
            <Text color="gray.800" fontSize="lg" textAlign={'center'}>
            Join us in making a difference. Together, we can create a cleaner, healthier environment for all!
            </Text>
        </Box>
      </VStack>
    </Container>
  );
}
