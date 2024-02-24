import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, Text, Image, Button, ButtonGroup } from '@chakra-ui/react'
import EditPostForm from "./EditPostForm";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { getPost } from "../adapters/post-adapter";
import { getAllPostLikes, getAllUserLikes, findUserLike, uploadLike, deleteLike } from "../adapters/like-adapter";
export default function Post({ id, comments, setComments }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [userProfile, setUserProfile] = useState({});
    const [userPost, setUserPost] = useState({});
    const [errorText, setErrorText] = useState(null);
    const [likes, setLikes] = useState([]);
    const [userLiked, setUserLiked] = useState({});

    const handleLike = async () => {
        // Ensure there's a logged-in user
        if (!currentUser) {
            alert("Please log in to like posts.");
            return;
        }

        try {
            let [ likeCheck, error ] = await findUserLike(userPost.id, currentUser.id);
            console.log(likes);

            if (likeCheck === undefined || likeCheck === null) {
                // No like exists, create it
                await uploadLike(userPost.id, currentUser.id);
                setLikes(prev => ({ ...prev, total_likes: Number(prev.total_likes) + 1 }))
                console.log('Like uploaded successfully!');
            } else {
                // Like exists, delete it
                await deleteLike(userPost.id, currentUser.id, likeCheck.id); // Assuming deleteLike is a function you have
                setLikes(prev => ({ ...prev, total_likes: Number(prev.total_likes) - 1 }));
                console.log('Like removed successfully!');
            }
            // Optionally, update UI or state to reflect the new like status

        } catch (error) {
            console.error('Error handling like:', error);
            // setErrorText(error.message); // Assuming setErrorText is a function you have for displaying errors
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
        const loadUserLiked = async () => {
            try {
                const userLikes = await getAllUserLikes(currentUser.id);
                setUserLiked(userLikes); // Assuming userLikes is an array of liked items
            } catch (error) {
                setErrorText(error.message);
            }
        }
        loadPost();
        loadLikes();
        loadUserLiked();
    }, [id]);


    useEffect(() => {
        const loadUser = async () => {
            const [user, error] = await getUser(userPost.user_id); //gets the user info of who made the post 
            if (error) return setErrorText(error.message);
            setUserProfile(user);
        };
        if (userPost.user_id) loadUser(); //waits until post data is fetched to fetch user info
    }, [userPost.user_id]);

    return (<>
        <Card className='w-full h-[75%] sm:w-[50%] md:w-[40%] lg:w-[40%] mt-[2em] mb-[2em]' >
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
                    {/* <ul className="mt-[1.2em]">
                            {
                                userPost.tags && userPost.tags.split(",").map((tag, index) => <Text key={index}>{tag}</Text>)
                            }
                        </ul> */}
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
                    <EditPostForm /*post={userPost} setPost={setUserPost}*/ />
                </ButtonGroup>
            </CardFooter>
        </Card>
    </>)
}