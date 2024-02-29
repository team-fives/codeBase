import { Flex, Box, Heading, Text, Image, Button} from '@chakra-ui/react'
import { NavLink } from "react-router-dom";
import { MdEvent, MdLocationPin } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { TbArrowBack, TbArrowForwardUpDouble } from "react-icons/tb";

export default function PostCard({ post, setMarker }) {
    return (
        <>
            <NavLink to={`/posts/${post.id}`}>
                <Flex w={215} flexDirection='column'>
                    <Box>
                        <Image src={post.image} h='100%' w='100%' objectFit={'cover'} maxH={200} />
                    </Box>
                    <Box p={'4% 0 7% 4%'}>
                        <Heading size='md' textAlign={'left'} textColor={'black'}><i>{post.title}</i></Heading>
                        <Flex pt={2}>
                            <MdEvent />
                            <Text fontWeight={500} pl={1} width={'95%'}>{post.date_of_event}</Text>
                        </Flex>
                        <Flex pt={2}>
                            <IoIosTime />
                            <Text fontWeight={500} pl={1} width={'95%'}>{post.start_time}am-{post.end_time}pm</Text>
                        </Flex>
                        <Flex pt={2}>
                            <MdLocationPin />
                            <Text fontWeight={500} pl={1} width={'80%'}>{post.location}</Text>
                        </Flex>
                    </Box>
                </Flex>
                </NavLink>
                <Flex m={'0 -6% -3% -6%'}justifyContent={'space-between'}>
                    
                    <Button background={'none'} onClick={() => {setMarker('')}} fontSize={'20'}><TbArrowBack color="black"/></Button>
                    <NavLink to={`/posts/${post.id}`}><Button background={'none'} fontSize={'20'}><TbArrowForwardUpDouble color={'#448960'}/></Button></NavLink>
                </Flex>
            
        </>
    )
}