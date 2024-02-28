import { NavLink } from "react-router-dom";
import { Card, CardBody, Heading, Text, Stack, Box, Flex } from "@chakra-ui/react";
import { FaMapLocationDot, FaPeopleGroup } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { BsChatSquareTextFill } from "react-icons/bs";
import { motion, useScroll } from 'framer-motion';
import landingImg from '../imgs/LandingImg.jpg';


export default function Hero() {

    const MotionBox = motion(Box);
    const MotionFlex = motion(Flex);

    const navLinks = [
        { to: "/map", icon: FaMapLocationDot, title: "Maps", description: "Explore a map of your destinations of interest!" },
        { to: "/posts", icon: BsChatSquareTextFill, title: "Community Posts", description: "Explore our community uploads & find an event that speaks to you!" },
        { to: "/About-us", icon: FaPeopleGroup, title: "About Us", description: "Learn about the team who brought this all together!" },
        { to: "/Articles", icon: IoNewspaper, title: "Articles", description: "Discover articles on waste's impact and steps towards sustainability!" },
      ];
    
    return <>
        <section id="hero" className="flex flex-col justify-center items-center space-x-0 bg-[#E4E4E4] h-screen">
            <MotionBox
            height="30rem"
            width="45rem"
            marginRight="30rem"
            marginTop="4rem"
            borderRadius="10px"
            marginLeft="4rem"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundImage={`url(${landingImg})`}
            backgroundSize="cover"
            initial={{ x: -500, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            >
            </MotionBox>
            <MotionFlex
                height="25rem"
                width="40rem"
                marginLeft="30rem"
                marginTop="-27.25rem"
                backgroundColor="rgba(255, 255, 255, 0.5)"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                borderRadius="10px"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 215, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                >
                <Heading as="h1" size="4xl" fontWeight="bold" textAlign="center">
                PureLink
                </Heading>
                <Text fontSize="xl" fontWeight="bold" textAlign="center" padding="2rem">
                Transforming Urban Spaces: Together for Health, Cleanliness, and Community.
                </Text>
            </MotionFlex>

            <Card className="w-[85%] mt-[2rem]" background={'transparent'} border="0px" boxShadow="0">
                <CardBody className="flex flex-row justify-around">
                    {navLinks.map((link, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.5 }}
                        >
                        <NavLink to={link.to}>
                        <Stack>
                            <link.icon size={50} />
                            <Heading fontSize={'xl'} fontWeight={'bold'}>{link.title}</Heading>
                            <Text fontSize={'sm'} noOfLines={2} fontWeight={'bold'} className="w-[16rem]">{link.description}</Text>
                        </Stack>
                        </NavLink>
                    </motion.div>
                    ))}
                </CardBody>
            </Card>
        </section>
    </>
}