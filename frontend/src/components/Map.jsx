
import { useEffect, useState } from "react";
import { SearchIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { GoogleMap, Marker, Autocomplete, InfoWindow } from '@react-google-maps/api';
import { Box, Card, CardBody, CardHeader, CardFooter, Flex, FormControl, Heading, Image, Text, IconButton, Input, SkeletonText, InputGroup, InputRightElement, SimpleGrid } from "@chakra-ui/react";
import { fromAddress } from "react-geocode";
import { googleApi, geoCode } from "../googleApi";
import { getAllPosts } from "../adapters/post-adapter";
import CreatePostForm from "./CreatePostForm";
import { NavLink, useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};




export default function Map({ posts, setPosts }) {
  const [hovered, setHovered] = useState(false);
  const [map, setMap] = useState(/** @type google.maps.Map */)
  const [marker, setMarker] = useState(/** @type google.maps.Marker */)
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

  const reset = () => {
    map.panTo(center)
    setZoom(10)
  }

  return <>
    <Flex h='100vh' w='100%' alignItems='center' justifyContent='center'>
      <Box w='35%' h='85%' background='grey' className="rounded-lg">
        <Card className="h-[5rem] w-full bg-white hover:bg-gray-300 items-end" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <Flex className="w-full flex justify-between flex-row">
            <CardHeader className="w-[65%]">
              <h1 className="w-[75%]">Community Posts: </h1>
            </CardHeader>
            <CardBody>
              <CreatePostForm posts={posts} setPosts={setPosts} hovered={hovered} className="w-[25%]"/>
            </CardBody>
          </Flex>
        </Card>
        <Box w='100%' h={'87%'} overflowY={"scroll"}>
          <Flex flexDir={'column'} className="p-[1rem]">
            {posts.map((post, index) => (
              <ul overflow="scroll" key={post.id}>
                <Card key={index} direction={'row'} className="w-full" >
                  <CardHeader>
                    <Image src={post.image} alt="post image" className="w-[10em] h-[6em]" />
                    <Text className="mt-[1em] text-gray-500">Location: {post.location}</Text>
                  </CardHeader>
                  <CardBody className="text-gray-500 flex flex-col w-[100%]">
                    <Heading size='md'><NavLink to={`/posts/${post.id}`}>{post.title}</NavLink></Heading>
                    {/* <Text className="h-[60%]">{post.description}</Text> */}
                    <Text className="w-[6em]">Date: {post.date_of_event}</Text>
                    <Text className="w-[6em]">Start: {post.start_time}</Text>
                    <Text className="w-[6em]">End: {post.end_time}</Text>
                  </CardBody>
                  <CardFooter className="text-gray-500 flex flex-row">
                    {/* {!!isCurrentUserProfile &&
                      (
                        <ButtonGroup spacing='2' colorScheme='green' className="bottom-0">
                          <Button onClick={() => handleDelete(post.id)} variant='ghost' colorScheme='green'>
                            Delete
                          </Button>
                        </ButtonGroup>
                      )
                    } */}
                  </CardFooter>
                </Card>
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