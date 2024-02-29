
import { useContext, useEffect, useState } from "react";
import { SearchIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { GoogleMap, Marker, Autocomplete, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Box, Card, CardBody, Center, VStack, CardHeader, CardFooter, Flex, FormControl, Heading, Image, Text, IconButton, Input, SkeletonText, InputGroup, InputRightElement, SimpleGrid, FormLabel, Button } from "@chakra-ui/react";
import { fromAddress } from "react-geocode";
import { googleApi, geoCode } from "../googleApi";
import { getAllPosts } from "../adapters/post-adapter";
import CreatePostForm from "./CreatePostForm";
import { NavLink, useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import SearchPostAndFilterBar from "./SearchPostAndFilterBar";
import CommunityPostsCard from "./CommunityPostsCard";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};



export default function Map({ posts, setPosts, setLocation, sortClick, setSortClick, filterClick, setFilterClick, setFilteredPosts, setDate, setStartTime, setEndTime }) {
  const navigate = useNavigate()
  const [map, setMap] = useState(/** @type google.maps.Map */)
  const [marker, setMarker] = useState(/** @type google.maps.Marker */)
  const [hovered, setHovered] = useState(false);
  // const [hoverHeight, setHoverHeight] = useState(0);
  const [zoom, setZoom] = useState(10)
  const { isLoaded } = googleApi()
  geoCode()

  if (!isLoaded) {
    return <SkeletonText />
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const location = document.getElementById('search').value
      const { results } = await fromAddress(location)
      const cord = results[0].geometry.location
      map.panTo(cord)
      setZoom(12)
      document.getElementById('search').value = ''//last think done
    }
    catch (error) {
      setTimeout(() => {
        document.getElementById('search').value = ''
      }, 1000)
      document.getElementById('search').value = 'Not a valid location'
      console.error(error)
    }
  }

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const handleStartChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndChange = (e) => {
    setEndTime(e.target.value);
  };

  const reset = () => {
    map.panTo(center)
    setZoom(10)
  }

  return <>
    <Flex flexDir={'row'} h='100vh' w='100%' alignItems='center' justifyContent='center' className="z-8">
      <Box w='35%' h='85%' background='grey' className="rounded-lg">
        <Card className=" w-full bg-white hover:bg-gray-300" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <SearchPostAndFilterBar posts={posts} setPosts={setPosts} setLocation={setLocation} setSortClick={setSortClick} setFilterClick={setFilterClick} setDate={setDate} hovered={hovered} setStartTime={setStartTime} setEndTime={setEndTime} />
          <Box>
            {
              filterClick === "time" && (
                <Center>
                  <FormControl className="mb-[1em]">
                    <Flex direction="row" gap="4">
                      <FormLabel htmlFor='startTime'>From:</FormLabel>
                      <Input onChange={handleStartChange} type='time' id='startTime' name='startTime' />
                      <FormLabel htmlFor='endTime'>Until:</FormLabel>
                      <Input onChange={handleEndChange} type='time' id='endTime' name='endTime' />
                    </Flex>
                  </FormControl>
                </Center>
              )
            }
            {
              filterClick === "date" && (
                <Center>
                  <FormControl className="mb-[1em]">
                    <FormLabel htmlFor='date'>Date:</FormLabel>
                    <Input onChange={handleDateChange} type='date' id='date' name='date' />
                  </FormControl>
                </Center>
              )
            }
          </Box>
        </Card>
        <Box w='100%' h={'76%'} overflowY="scroll" className="mt-[1rem] pl-[1rem] pr-[1rem]">
          <VStack spacing={3}> {/* This applies the spacing between each child component */}
            {posts.map((post, index) => <CommunityPostsCard key={index} post={post} index={index} />)}
          </VStack>
        </Box>
      </Box>


      <Box h='85%' w='60%' position='relative'>
        <Flex position='absolute' zIndex='1' background='white' right={5} top={5} borderRadius={5}>
          <InputGroup>
            <Autocomplete>
              <FormControl>
                <Input name='search' id='search' type="text" placeholder="Search Location" pr='4rem' focusBorderColor="#45885F" />
              </FormControl>
            </Autocomplete>
            <IconButton aria-label='Search Map' icon={<SearchIcon />} onClick={handleSubmit} background='white' />
            <IconButton aria-label='Reset Map' icon={<RepeatClockIcon />} onClick={reset} background='white' />
          </InputGroup>
        </Flex>

        <GoogleMap
          onClick={ev => {
            console.log(ev)
            console.log("latitide = ", ev.latLng.lat());
            console.log("longitude = ", ev.latLng.lng());
          }}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
          onMouseOut={() => setMarker('')}
        >
          {
            posts.map(post => {
              return <Marker key={post.id} onLoad={marker => console.log(marker)} position={post.cords} onMouseOver={() => setMarker(post)} />
            })
          }
          {
            marker && (
              <InfoWindow position={marker.cords} onCloseClick={() => setMarker('')}>
                <PostCard post={marker} setMarker={setMarker} />
              </InfoWindow>
            )
          }
        </GoogleMap>
      </Box >
    </Flex >
  </>
}