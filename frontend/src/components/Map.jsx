import { useEffect, useState } from "react";
import { SearchIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { GoogleMap, Marker, Autocomplete, InfoWindow } from '@react-google-maps/api';
import { Box, Card, CardBody, CardHeader, Flex, FormControl, Heading, Image, Text, IconButton, Input, SkeletonText, InputGroup} from "@chakra-ui/react";
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


export default function Map() {
  const navigate = useNavigate()
  const [map, setMap] = useState(/** @type google.maps.Map */)
  const [marker, setMarker] = useState('')
  const [allPostInfo, setAllPostInfo] = useState([])
  const [zoom, setZoom] = useState(10)
  const { isLoaded } = googleApi()
  geoCode()

  useEffect(() => {
    const getPostsCords = async () => {
      const allPosts = await getAllPosts()
      setAllPostInfo(allPosts)
    }
    getPostsCords()
  }, [map])

  if (!isLoaded) {
    return <SkeletonText />
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const location = document.getElementById('search').value
      const { results } = await fromAddress(location)
      console.log('addy', results, 'event', e)
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
      <Box w='30%' h='80%' overflow='auto'>
        <Flex justifyContent='space-between'>
          <Heading size='lg'>Events</Heading>
          <CreatePostForm posts={allPostInfo} setPosts={setAllPostInfo} />
        </Flex>
        {
          allPostInfo.map((post, index) => {
            return <Box p='10px'>
              <NavLink to={`/posts/${post.id}`}>
                <Card key={index} direction={'row'} h='25%'>
                  <Image src={post.image} alt="post image" boxSize='40%' />
                  <Flex flexDirection='column'>
                    <CardHeader>
                      <Heading size='sm'>{post.title}</Heading>
                      <Text>{post.location}</Text>
                    </CardHeader>
                    <CardBody >
                      <Text className="">Start: {post.start_time}</Text>
                      <Text className="">End: {post.end_time}</Text>
                    </CardBody>
                  </Flex>
                </Card>
              </NavLink>
            </Box>
          })
        }
      </Box>


      <Box h='80%' w='60%' position='relative'>
        <Flex position='absolute' zIndex='1' background='white' right={5} top={5} borderRadius={5}>
          
          <InputGroup>
            <Autocomplete>
              <FormControl>
                <Input name='search' id='search' type="text" placeholder="Search Location"  pr='4rem' focusBorderColor="#45885f"/>
              </FormControl>
            </Autocomplete>
              <IconButton aria-label='Search Map' icon={<SearchIcon />} onClick={handleSubmit} background='white'/>
              <IconButton aria-label='Reset Map' icon={<RepeatClockIcon />} onClick={reset} background='white'/>

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
          {allPostInfo.map(post => {
            console.log(post.title, post.cords)
            return <Marker key={post.id} onLoad={marker => console.log(marker)} position={post.cords} onMouseOver={() => setMarker(post)} />
          })
          }
          {marker && (
              <InfoWindow position={marker.cords} onCloseClick={() => setMarker('')}> 
                <PostCard post={marker} setMarker={setMarker}/>
              </InfoWindow>
          )}

        </GoogleMap>
      </Box>
    </Flex>
  </>
}