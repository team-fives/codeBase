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
import AddComment from "./AddComment";

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
            if (!currentUser) return
            let [likeCheck, error] = await findUserLike(id, currentUser.id);
            if (likeCheck) setUserLiked(true)
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
        <Flex w={'80%'} h={'80%'} flexDirection={'row'}>
            <Box w={'100%'} >
                <Heading size={'lg'} textAlign={'center'} p={10}><i>{userPost.title}</i></Heading>
                <Flex>
                    {/* box for img */}
                    <Flex w={'60%'} justifyContent={'center'}>
                        <Image borderRadius={10} objectFit='cover' src={userPost.image} alt='No Pic' w={'90%'} h={'60%'} />
                    </Flex>
                    {/* box for description/ABout the event */}
                    <Box w={'40%'}>
                        <Flex justifyContent={'center'}>
                            <Box background={'grey'} borderRadius={30} padding={'1rem'}>
                                <NavLink to={`/users/${userProfile.id}`}>
                                    <Flex flex='1' gap='4' alignItems='center'>
                                        <Avatar name={userProfile.username} src={userProfile.profile_image} />
                                        <Heading size='sm'>{userProfile.username}</Heading>
                                    </Flex>
                                </NavLink>
                                <Flex flexDirection={'row'} fontSize={19}>
                                <Flex pt={2} justifyContent={'center'}>
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
                                </Flex>
                                <Flex justifyContent={!!isCurrentUserProfile ? 'space-between' : 'end'} m={'10% -12% 0 -12%'}>
                                    {
                                        !!isCurrentUserProfile && (
                                            <Button _hover={'none'} onClick={() => handleDelete(id)} variant='ghost' colorScheme='green'> Delete </Button>
                                        )
                                    }
                                    <Button _hover={'none'} onClick={handleLike} variant='ghost' fontSize={40}>
                                        <Text position={'absolute'} fontSize={20} color={userLiked && 'white'}>{likes.total_likes}</Text>{!userLiked ? <FaRegHeart /> : <FaHeart />}
                                    </Button>
                                </Flex>
                            </Box>
                        </Flex>
                        <Text fontSize={50}>Details</Text>
                        <Text py={'5%'}>{userPost.description}</Text>
                        <AddComment post_id={id} comments={comments} setComments={setComments} />
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
                <Box className="flex flex-row justify-between flex-direction-row mr-[1em]">
                    <Heading size='lg'>{userPost.title}</Heading>
                    <Box className="flex flex-row w-[5em] space-x-[1em] mr-[1.5em]">
                        <Text style={{ fontWeight: 'bold'}}>Start: {userPost.start_time}</Text>
                        <Text style={{ fontWeight: 'bold' }}>End: {userPost.end_time}</Text>
                    </Box>
                </Box>
                <Text className="text-gray-600" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{userPost.location}</Text>
                <Image objectFit='fill' src={userPost.image} alt='No Pic' className="h-[10em] w-[20em] sm:h-[10em] sm:w-[20em] md:h-[20em] md:w-[35em] shrink-0" />
                <Box className="flex flex-row">
                    <Text fontSize='md' className="h-[6em] w-[75%] md:h-[5em] md:w-[75%]m-[1em] overflow-y-scroll" style={{ fontWeight: 'bold', marginTop: '1rem' }}>{userPost.description}</Text>
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
                    <Button onClick={handleLike} flex='1' variant='ghost' style={{ marginTop: '-2rem', marginBottom: '1rem' }}> Like: {likes.total_likes}</Button>
                    {
                        !!isCurrentUserProfile && (
                            <Button onClick={() => handleDelete(id)} variant='ghost' colorScheme='green' style={{ marginTop: '-2rem', marginBottom: '1rem' }}> Delete </Button>
                        )
                    }
                </ButtonGroup>
            </CardFooter>
        </Card> */}
    </>)
}