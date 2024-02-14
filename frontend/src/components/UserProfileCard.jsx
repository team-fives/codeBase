import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { logUserOut } from "../adapters/auth-adapter";
import { getAllUserLikes } from "../adapters/like-adapter";
import { getAllUserComments } from "../adapters/comment-adapter";
import { getAllUserPosts, getPost } from "../adapters/post-adapter";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { Avatar, Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, StackDivider } from '@chakra-ui/react';
import { Box, Card, CardHeader, Heading, CardBody, CardFooter } from '@chakra-ui/react'
import UserProfileTabs from "./UserProfileTabs";

const UserProfileCard = ({ username, bio, profile_image }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  const [userLikes, setUserLikes] = useState([]);
  // const [userLikedPosts, setUserLikedPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const handleLogout = async () => {
    logUserOut(); // Call the 'logUserOut' function from the auth adapter
    setCurrentUser(null); // Set the current user to null
    navigate('/'); // Navigate to the home page
  };

  console.log(userLikes)

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

  const loadComments = async () => {
    const [result, error] = await getAllUserComments(id);
    if (error) return setErrorText(error.text);
    setUserComments(result);
  }

  const loadPosts = async () => {
    const [result, error] = await getAllUserPosts(id);
    if (error) return setErrorText(error.text);
    setUserPosts(result);
  }

  useEffect(() => {
    loadLikes(id);
    loadComments();
    loadPosts();
  }, []);

  return (
    <div className="flex flex-row justify-center space-x-[3rem] pl-[10rem] pt-[5rem] items-center w-full h-full">
      <Card background={'transparent'} border="0px" boxShadow="0">
        <CardHeader className="flex flex-col items-center space-y-[1rem]">
          <Avatar size="2xl" width="10rem" height="10rem" fontSize="5.5rem" name={username} src={profile_image} />
          {!!isCurrentUserProfile && <Button onClick={handleLogout} className="w-[5rem] h-[2rem] bg-[#989A99] rounded-lg z-0">Log Out</Button>}
        </CardHeader>
        <CardBody>
          <Accordion defaultIndex={[0]}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Comments Made
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <ul className="flex flex-col">
                  {
                    userComments.length > 0 ?
                      userComments.map((comment, index) => <li key={index} className="text-l">{comment.content}</li>)
                      : <p>No comments yet</p>
                  }

                </ul>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
      <UserProfileTabs {...{ username, bio, userLikes, userPosts }} />
    </div>
  );
};

export default UserProfileCard;
