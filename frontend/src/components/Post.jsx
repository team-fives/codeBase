import { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, Text, Image, Button, ButtonGroup } from '@chakra-ui/react'
import EditPostForm from "./EditPostForm";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { getPost, deletePost } from "../adapters/post-adapter";
import { getAllPostLikes, getAllUserLikes, findUserLike, uploadLike, deleteLike } from "../adapters/like-adapter";
import { MdEvent, MdLocationPin } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Post({ id, comments, setComments }) {
    const { currentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});
    const [userPost, setUserPost] = useState({});
    const isCurrentUserProfile = currentUser && currentUser.id === userPost.user_id;
    const [errorText, setErrorText] = useState(null);
    const [likes, setLikes] = useState([]);
    const [userLiked, setUserLiked] = useState(false);
    const [likeCheckId, setlikeCheckId] = useState()

    const handleLike = async () => {
        // Ensure there's a logged-in user
        if (!currentUser) {
            alert("Please log in to like posts.");
            return;
        }
        try {
            if (!userLiked) {
                await uploadLike(userPost.id, currentUser.id);
                setLikes(prev => ({ ...prev, total_likes: Number(prev.total_likes) + 1 }))
                setUserLiked(true)
                console.log('Like uploaded successfully!');
            } else {
                await deleteLike(userPost.id, currentUser.id, likeCheckId);
                setLikes(prev => ({ ...prev, total_likes: Number(prev.total_likes) - 1 }));
                setUserLiked(false)
                console.log('Like removed successfully!');
            }

        } catch (error) {
            console.error('Error handling like:', error);
        }
    }

    const handleDelete = async () => {
        try {
            await deletePost(currentUser.id, id);
            return navigate(-1);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }


    useEffect(() => {
        const loadPost = async () => {
            const [post, error] = await getPost(id);
            if (error) return setErrorText(error.message);
            setUserPost(post);
        };

        const loadLikes = async () => {
            const [response, error] = await getAllPostLikes(id);
            if (error) {
                setErrorText(error);
            } else {
                setLikes(response);
            }
        };

        const onLoadLikeCheck = async () => {
            if(!currentUser) return 
            let [likeCheck, error] = await findUserLike(id, currentUser.id);
            if(likeCheck) setUserLiked(true)
            setlikeCheckId(likeCheck.id)
        }

        onLoadLikeCheck()
        loadPost();
        loadLikes();
    }, []);


    useEffect(() => {
        const loadUser = async () => {
            const [user, error] = await getUser(userPost.user_id);
            if (error) return setErrorText(error.message);
            setUserProfile(user);
        };
        if (userPost.user_id) loadUser();
    }, [userPost.user_id]);

    return (<>
        <Flex w={'90%'} h={'100vh'} flexDirection={'row'}>
            {/* box with user, important info, maybe copy location button */}
            <Box w={'20%'} justifyContent={'center'}>
                <NavLink to={`/users/${userProfile.id}`}>
                    <Flex flex='1' gap='4' alignItems='center'>
                        <Avatar name={userProfile.username} src={userProfile.profile_image} />
                        <Heading size='sm'>{userProfile.username}</Heading>
                    </Flex>
                </NavLink>
                <Flex pt={2}>
                    <MdEvent />
                    <Text fontWeight={500} pl={1} width={'95%'}>{userPost.date_of_event}</Text>
                </Flex>
                <Flex pt={2}>
                    <IoIosTime />
                    <Text fontWeight={500} pl={1} width={'95%'}>{userPost.start_time}am-{userPost.end_time}pm</Text>
                </Flex>
                <Flex pt={2}>
                    <MdLocationPin />
                    <Text fontWeight={500} pl={1} width={'95%'}>{userPost.location}</Text>
                </Flex>
                <ButtonGroup>
                    <Button _hover={'none'} onClick={handleLike} flex='1' variant='ghost' fontSize={40}>
                    <Text position={'absolute'} fontSize={20} color={userLiked && 'white'}>{likes.total_likes}</Text>{!userLiked ? <FaRegHeart/> : <FaHeart/>}
                    </Button>
                    {
                        !!isCurrentUserProfile && (
                            <Button onClick={() => handleDelete(id)} variant='ghost' colorScheme='green'> Delete </Button>
                        )
                    }
                </ButtonGroup>
            </Box>

            <Box w={'80%'} >
                <Heading size={'lg'} textAlign={'center'} p={10}>{userPost.title}</Heading>
                <Flex>
                    {/* box for img */}
                    <Box w={'50%'}>
                        <Image objectFit='cover' src={userPost.image} alt='No Pic' className="h-[10em] w-[20em] md:h-[20em] md:w-[35em] shrink-0" />
                    </Box>
                    {/* box for description/ABout the event */}
                    <Box w={'50%'}>
                        <Text fontSize={50}>Learn More</Text>
                        <Text>{userPost.description}</Text>
                    </Box>
                </Flex>
            </Box>

        </Flex>
        {/* <Card className='w-full h-[75%] sm:w-[50%] md:w-[40%] lg:w-[40%] mt-[2em] mb-[2em]' >
            <CardHeader>
                <Flex spacing='4'>
                    <NavLink to={`/users/${userProfile.id}`}>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={userProfile.username} src={userProfile.profile_image} />
                            <Heading size='sm'>{userProfile.username}</Heading>
                        </Flex>
                    </NavLink>

                </Flex>
            </CardHeader>
            <CardBody>
                <Box className="flex flex-row justify-between">
                    <Heading size='lg'>{userPost.title}</Heading>
                    <Box className="flex flex-row w-[5em] space-x-[1em] mr-[1.5em]">
                        <Text>Start: {userPost.start_time}</Text>
                        <Text>End: {userPost.end_time}</Text>
                    </Box>
                </Box>
                <Text className="text-gray-600">{userPost.location}</Text>
                <Image objectFit='fill' src={userPost.image} alt='No Pic' className="h-[10em] w-[20em] sm:h-[10em] sm:w-[20em] md:h-[20em] md:w-[35em] shrink-0" />
                <Box className="flex flex-row">
                    <Text fontSize='md' className="h-[6em] w-[75%] md:h-[5em] md:w-[75%]m-[1em] overflow-y-scroll">{userPost.description}</Text>
                </Box>
            </CardBody>

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}
            >
                <ButtonGroup>
                    <Button onClick={handleLike} flex='1' variant='ghost'> Like: {likes.total_likes}</Button>
                    {
                        !!isCurrentUserProfile && (
                            <Button onClick={() => handleDelete(id)} variant='ghost' colorScheme='green'> Delete </Button>
                        )
                    }
                </ButtonGroup>
            </CardFooter>
        </Card> */}
    </>)
}