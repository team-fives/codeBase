import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { logUserOut } from "../adapters/auth-adapter";
import { getAllUserComments } from "../adapters/comment-adapter";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Avatar, Button, ButtonGroup, Box, Card, CardHeader, CardBody } from '@chakra-ui/react';
import UpdateUsernameForm from "./UpdateUsernameForm";

const UserProfileCard = ({ username, bio, profileimage, isCurrentUserProfile, onUsernameUpdate }) => {
  // Hooks and context
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const [userComments, setUserComments] = useState([]);
  const [errorText, setErrorText] = useState(null);

  // Event handlers
  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  const loadComments = async () => {
    const [result, error] = await getAllUserComments(id);
    if (error) setErrorText(error.text);
    else setUserComments(result);
  };

  // Effects
  useEffect(() => {
    loadComments();
  }, [id]);

  // JSX
  return (
    <Card background={'transparent'} border="0px" boxShadow="0">
      <CardHeader className="flex flex-col items-center space-y-[1rem] mb-[22.5rem]">
        <Avatar size="2xl" width="10rem" height="10rem" fontSize="5.5rem" name={username} src={profileimage} />
        {isCurrentUserProfile && (
          <ButtonGroup>
            <UpdateUsernameForm {...{ currentUser, setCurrentUser, onUsernameUpdate }} />
            <Button onClick={handleLogout} className="w-[5rem] h-[2rem] bg-[#989A99] rounded-lg z-0">Log Out</Button>
          </ButtonGroup>
        )}
      </CardHeader>
      <CardBody>
        {errorText && <p>Error: {errorText}</p>}
        <Accordion defaultIndex={[0]}>
          <AccordionItem style={{marginTop: '-24rem'}}>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  Comments Made
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <ul>
                {userComments.length > 0 ? userComments.map((comment, index) => <li key={index}>{comment.content}</li>) : <p>No comments yet</p>}
              </ul>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
};

export default UserProfileCard;
