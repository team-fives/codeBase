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
import UploadcareComponent from "./UploadCareClient";

export default function UpdateUsernameForm({ currentUser, setCurrentUser }) {
  // State and hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: currentUser.id,
    username: currentUser.username,
    bio: currentUser.bio,
    profile_image: currentUser.profile_image
  });

  // Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle the image upload callback
  const handleImageUpload = (cdnUrl) => {
    setFormData(prevState => ({
      ...prevState,
      profile_image: cdnUrl
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const [user, error] = await updateUsername(formData);
    if (error && error.cause >= 400 && error.cause < 500) {
      handleUserError();
      return;
    }
    handleSuccessfulUpdate(user);
  };

  const handleUserError = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleSuccessfulUpdate = (user) => {
    setCurrentUser(user);
    resetFormData(user);
    onClose();
  };

  const resetFormData = (user) => {
    setFormData({
      id: user.id, 
      username: user.username,
      bio: user.bio,
      profile_image: user.profile_image
    });
  };

  // JSX
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
                <label htmlFor="profile_image">Profile Image</label>
                {/* Insert UploadcareComponent here and pass handleImageUpload as the callback */}
                <UploadcareComponent onUploadFinish={handleImageUpload} />
              </FormControl>
              <Button colorScheme='green' mr={3} type="submit" style={{ marginTop: '10px' }}>Update</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
