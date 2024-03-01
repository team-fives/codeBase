import { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { Wrap, WrapItem, Avatar, Button, ButtonGroup, VStack } from "@chakra-ui/react";
import { Image, Card, CardHeader, Heading, CardBody, CardFooter } from '@chakra-ui/react'
import { getAllUserPosts } from "../adapters/post-adapter";
import { getAllUserLikes } from "../adapters/like-adapter";
import { getPost } from "../adapters/post-adapter";
import { deletePost } from "../adapters/post-adapter";
import CommunityPostsCard from "./CommunityPostsCard";

const UserProfileTabs = ({ username, id, bio, isCurrentUserProfile }) => {
    const [userPosts, setUserPosts] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    const navigate = useNavigate();
    const loadLikes = async (id) => {
        try {
            const likes = await getAllUserLikes(id);
            const posts = await Promise.all(likes.map(async (like) => {
                const [post, error] = await getPost(like.post_id);
                return post;
            }));
            setUserLikes(posts);
        } catch (error) {
            console.error(error);
        }
    };

    const loadPosts = async () => {
        const [result, error] = await getAllUserPosts(id);
        if (error) return setErrorText(error.text);
        setUserPosts(result);
    }

    const handleDelete = async (post_id) => {
        await deletePost(id, post_id);
        setUserPosts(userPosts.filter(post => post.id !== post_id));
    }

    useEffect(() => {
        loadPosts();
        loadLikes(id);
    }, []);

    return <div className="h-full w-[40rem] flex flex-col space-y-0 left-0 pt-[5rem]" style={{ marginRight: "10rem" }}>
        <div className="flex flex-col h-[13rem] w-full">
            <h1 className="text-3xl">{username}</h1>
            <h2 className="text-xl mt-[2rem]">{bio}</h2>
        </div>
        <Tabs variant='enclosed' colorScheme='green'>
            <TabList>
                <Tab>Posts</Tab>
                <Tab>Likes</Tab>
            </TabList>
            <TabPanels>
                <TabPanel overflow={"auto"} className="h-[20rem] ">
                    <VStack spacing={2} >
                        {
                            userPosts.length > 0 ?
                                userPosts.map((post, index) => {
                                    return (
                                        <CommunityPostsCard key={index} post={post} isCurrentUserProfile={isCurrentUserProfile} handleDelete={handleDelete} />
                                    )
                                })
                                : <p>No posts yet</p>
                        }
                    </VStack>

                </TabPanel>
                <TabPanel overflow={"auto"} className="h-[20rem] ">
                    <VStack spacing={2} >
                        {
                            userLikes.length > 0 ?
                                userLikes.map((post, index) => {
                                    return (
                                        <CommunityPostsCard key={index} post={post} isCurrentUserProfile={isCurrentUserProfile} handleDelete={handleDelete} />
                                    )
                                })
                                : <p>No likes yet</p>
                        }
                    </VStack>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
}

export default UserProfileTabs;