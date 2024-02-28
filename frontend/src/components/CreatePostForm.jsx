import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { createPost } from "../adapters/post-adapter";
import { MdOutlinePostAdd } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import { geoCode, googleApi } from "../googleApi";
import { fromAddress } from "react-geocode";
import UploadcareComponent from "./UploadCareClient";
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
        <ModalHeader style={{ color: '#45885f', fontWeight: 'bold', fontSize: '2rem', marginTop: '1rem' }}>Create an Event!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel style={{ color: '#45885f', fontWeight: '600', fontSize: '1.5rem', marginBottom: '-0.25rem', marginTop: '-1rem' }}>Title</FormLabel>
            <Input onChange={handleChange} value={title} type="text" id="title" name="title" placeholder="Title" focusBorderColor="#45885f"  />

            <FormLabel style={{ color: '#45885f', fontWeight: '600', fontSize: '1.5rem', marginBottom: '-0.25rem', marginTop: '0.5rem' }}>Picture</FormLabel>
            <UploadcareComponent onUploadFinish={handleUploadFinish} />

            <FormLabel style={{ color: '#45885f', fontWeight: '600', fontSize: '1.5rem', marginBottom: '-0.25rem', marginTop: '0.5rem' }}>Date of Event</FormLabel>
            <Input onChange={handleChange} value={dateOfEvent} type="date" name="dateOfEvent" focusBorderColor="#45885f"/>

            <FormLabel style={{ color: '#45885f', fontWeight: '600', fontSize: '1.5rem', marginBottom: '-0.25rem', marginTop: '0.5rem' }}>Description</FormLabel>
            <Input onChange={handleChange} value={description} type='text' id='description' name='description' placeholder="Description" focusBorderColor="#45885f"/>
            <FormLabel style={{ color: '#45885f', fontWeight: '600', fontSize: '1.5rem', marginBottom: '-0.25rem', marginTop: '0.5rem' }}>Location</FormLabel>
          {isLoaded && (
            <Autocomplete>
              <Input name='location' id='location' type="text" onChange={handleChange} placeholder="Location" focusBorderColor="#45885f"/>
            </Autocomplete>
          )}
            <Box>
            <Flex>
              <FormLabel style={{ color: '#45885f', fontWeight: '600', fontSize: '1.5rem', marginBottom: '-0.25rem', marginTop: '1rem' }}>Start</FormLabel>
              <Input onChange={handleChange} value={startTime} type='time' id='startTime' name='startTime' style={{marginTop: '1rem', marginLeft: '-0.5rem'}} focusBorderColor="#45885f"/>
              <FormLabel style={{ color: '#45885f', fontWeight: '600', fontSize: '1.5rem', marginBottom: '-0.25rem', marginTop: '1rem', marginLeft: '0.5rem' }}>End</FormLabel>
              <Input onChange={handleChange} value={endTime} type='time' id='endTime' name='endTime' style={{marginTop: '1rem', marginLeft: '-0.5rem'}} focusBorderColor="#45885f"/>
            </Flex>
          </Box>
          </FormControl>

        </ModalBody>

        <ModalFooter>
          <Button backgroundColor={'#45885f'} mr={3} onClick={onClose} colorScheme="green">
            Close
          </Button>
          <Button onClick={handleSubmit} variant='ghost'>Upload</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}