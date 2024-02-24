import { useNavigate } from "react-router-dom";
import { updateUsername } from "../adapters/user-adapter";
import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  useDisclosure,
} from '@chakra-ui/react';

export default function UpdateUsernameForm({ currentUser, setCurrentUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: currentUser.id,
    username: currentUser.username,
    bio: currentUser.bio
    //update to include id too??
  });

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const [user, error] = await updateUsername(formData);
    if (error?.cause >= 400 && error?.cause < 500) {
      setCurrentUser(null);
      navigate('/');
      return;
    }

    setCurrentUser(user);

    setFormData({
      id: user.id, 
      username: user.username,
      bio: user.bio
    });

    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} className="w-[7rem] h-[2rem] bg-[#989A99] rounded-lg z-0">Update User</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Username</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl className="flex flex-col">
                <label htmlFor="username">New Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="bio">New Bio</label>
                <input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </FormControl>
              <Button colorScheme='green' mr={3} type="submit" style={{ marginTop: '10px' }}>Update</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
