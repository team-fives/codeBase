import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { createPost } from "../adapters/post-adapter";
import { MdOutlinePostAdd } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
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
  Input,
  FormLabel,
  Box,
  Flex,
} from '@chakra-ui/react'
import { Autocomplete } from "@react-google-maps/api";
import { geoCode, googleApi } from "../googleApi";
import { fromAddress } from "react-geocode";
import UploadcareComponent from "./UploadCareClient";

export default function CreatePostForm({ posts, setPosts }) {
  const { isLoaded } = googleApi()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState(null);
  const [title, setTitle] = useState('') //form inputs 
  const [image, setPicture] = useState('');
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [dateOfEvent, setDateOfEvent] = useState('');
  //const [location, setLocation] = useState('')
  const [description, setdescription] = useState('') //form inputs ^
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext); //current user 
  geoCode()

  const handleUploadFinish = (cdnUrl) => {
    setPicture(cdnUrl); // Update the image state with the URL from Uploadcare
  };

  // if(!currentUser) return <Navigate to='/login'/>
  const handleSubmit = async (event) => {
    try{
    event.preventDefault();
    const user_id = currentUser.id
    const location = document.getElementById('location').value
    const { results } = await fromAddress(location)
    const cords = results[0].geometry.location
    document.getElementById('location').value = ''
    setTitle('')
    setPicture('') //resets/clears input
    setdescription('')
    setEndTime('')
      setDateOfEvent('');
    setStartTime('')



    const [post, error] = await createPost({ user_id, title, image, location, cords, description, start_time: startTime, end_time: endTime,  date_of_event: dateOfEvent }); //post data into db
    if (error) return setErrorText(error.message);
    console.log(cords)
    setPosts([post, ...posts]); //spreads all current post in db and adds the recently made one first
    onClose()
    }
    catch (error) {
      setTimeout(() => {
        document.getElementById('location').value = ''
      }, 1000)
      document.getElementById('location').value = 'Not a valid location'
      console.error(error)
    }
  };

  const handleChange = (event) => { //changes input on every change 
    const { name, value } = event.target;
    if (name === 'title') setTitle(value);
    if (name === 'image') setPicture(value);
    if (name === 'startTime') setStartTime(value);
    if (name === 'endTime') setEndTime(value)
    if (name === 'description') setdescription(value);
    if (name === 'dateOfEvent') setDateOfEvent(value); 
  };

  const checkUserLogin = () => { //checks if theres a user logged in when create post button is clicked
    if (!currentUser) return navigate('/login') //sends user to login if not logged in
    onOpen() //opens model if theres a user logged in
  }

  return <>
    <MdOutlinePostAdd size={50} onClick={checkUserLogin} />

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input onChange={handleChange} value={title} type="text" id="title" name="title" />

            <FormLabel>Picture</FormLabel>
            <UploadcareComponent onUploadFinish={handleUploadFinish} />

            <FormLabel>Date of Event</FormLabel>
            <Input onChange={handleChange} value={dateOfEvent} type="date" name="dateOfEvent" />

            <FormLabel>Description</FormLabel>
            <Input onChange={handleChange} value={description} type='text' id='description' name='description' placeholder="Description" />
          </FormControl>
          <FormLabel>Location</FormLabel>
          {isLoaded && (
            <Autocomplete>
              <Input name='location' id='location' type="text" onChange={handleChange} placeholder="Location" />
            </Autocomplete>
          )}
          <Box>
            <Flex>
              <FormLabel>Start</FormLabel>
              <Input onChange={handleChange} value={startTime} type='time' id='startTime' name='startTime' />
              <FormLabel>End</FormLabel>
              <Input onChange={handleChange} value={endTime} type='time' id='endTime' name='endTime' />
            </Flex>
          </Box>


        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSubmit} variant='ghost'>Upload</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}