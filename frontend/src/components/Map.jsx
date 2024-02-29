
import { useEffect, useState } from "react";
import { SearchIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { GoogleMap, Marker, Autocomplete, InfoWindow } from '@react-google-maps/api';
import { Box, Card, CardBody, Center, CardHeader, CardFooter, Flex, FormControl, Heading, Image, Text, IconButton, Input, SkeletonText, InputGroup, InputRightElement, SimpleGrid, FormLabel } from "@chakra-ui/react";
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




export default function Map({ posts, setPosts, sortClick, setSortClick, filterClick, setFilterClick, setDate, setStartTime, setEndTime, setLocation }) {
  const [map, setMap] = useState(/** @type google.maps.Map */)
  const [marker, setMarker] = useState(/** @type google.maps.Marker */)
  const [hovered, setHovered] = useState(false);
  const [hoverHeight, setHoverHeight] = useState(0);
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
      //setCords([...cords, cord])
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
                  <FormControl className="mt-[5rem]">
                    <Flex direction="row" gap="4">
                      <FormLabel htmlFor='startTime'>Start:</FormLabel>
                      <Input onChange={handleStartChange} type='time' id='startTime' name='startTime' />
                      <FormLabel htmlFor='endTime'>End:</FormLabel>
                      <Input onChange={handleEndChange} type='time' id='endTime' name='endTime' />
                    </Flex>
                  </FormControl>
                </Center>
              )
            }
            {
              filterClick === "date" && (
                <Center>
                  <FormControl className="mt-[5rem]">
                    <FormLabel htmlFor='date'>Date:</FormLabel>
                    <Input onChange={handleDateChange} type='date' id='date' name='date' />
                  </FormControl>
                </Center>
              )
            }
          </Box>
        </Card>
        <Box w='100%' h={'77%'} overflowY={"scroll"}>
          <Flex flexDir={'column'} className="p-[1rem]">
            {posts.map((post, index) => (
              <ul overflow="scroll" key={post.id}>
                <CommunityPostsCard post={post} index={index} />
              </ul>
            ))}
          </Flex>
        </Box>
      </Box>


      <Box h='85%' w='60%' position='relative'>
        <IconButton position='absolute' aria-label='Reset Map' icon={<RepeatClockIcon />} onClick={reset} zIndex='1' />
        <Flex position='absolute' zIndex='1' background='grey' right={0} top={0}>

          <InputGroup>
            <Autocomplete>
              <FormControl>
                <Input name='search' id='search' type="text" placeholder="Search Location" />
              </FormControl>
            </Autocomplete>
            <InputRightElement>
              <IconButton aria-label='Search Map' icon={<SearchIcon />} onClick={handleSubmit} />
            </InputRightElement>
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
          {posts.map(post => {
            return <Marker key={post.id} onLoad={marker => console.log(marker)} position={post.cords} onMouseOver={() => setMarker(post)} />
          })
          }
          {marker && (
            <NavLink to={`/posts/${marker.id}`}>
              <InfoWindow position={marker.cords} onCloseClick={() => setMarker('')}>

                <Flex flexDirection="column" alignItems='center'>
                  <Heading size='md'>{marker.title}</Heading>
                  <Image src={marker.image} boxSize='100' />
                  <Text>{marker.description}</Text>
                  <Flex>
                    <Text><b>Start:</b> {marker.start_time}</Text>
                    <Text><b>End:</b> {marker.end_time}</Text>
                  </Flex>
                </Flex>
              </InfoWindow>
            </NavLink>
          )}
        </GoogleMap>
      </Box>
    </Flex>
  </>
}

{/* <Box h='100%' w='50%'>
              <Autocomplete>
                <FormControl>
                  <Input name='search' id='search' type="text" placeholder="Search Location" />
                </FormControl>
              </Autocomplete>
              <Button type="submit" onClick={handleSubmit}>Submit</Button>
              <Button onClick={reset}>Reset Map</Button>
              <CreatePostForm posts={allPostInfo} setPosts={setAllPostInfo} />
</Box> */}