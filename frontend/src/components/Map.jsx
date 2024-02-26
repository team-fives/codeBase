import { useContext, useEffect, useState } from "react";
import { SearchIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, FormControl, Heading, Image, Text, IconButton, Input, SkeletonText } from "@chakra-ui/react";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
import { googleApi, geoCode } from "../googleApi";
import { getAllPosts } from "../adapters/post-adapter";
import CreatePostForm from "./CreatePostForm";
import { NavLink } from "react-router-dom";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};


export default function Map() {

  const [map, setMap] = useState(/** @type google.maps.Map */)
  const [marker, setMarker] = useState(/** @type google.maps.Marker */)
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

  const visibleHandler = e => {
    console.log('marker', e)
  }

  const markerClick = e => {
    console.log(e.domEvent.target)
    marker.visible = false
  }

  const reset = () => {
    map.panTo(center)
    setZoom(10)
  }

  return <>
    <Flex h='100vh' w='100%' alignItems='center' justifyContent='center'>


    <Box w='30%' h='80%' background='grey' overflow='scroll'>
    {
      allPostInfo.map((post, index) => {
        return <Card key={index} direction={'row'}>
          <Image src={post.image} alt="post image" />
          <CardHeader>
            <Heading size='md'><NavLink to={`/posts/${post.id}`}>{post.title}</NavLink></Heading>
          </CardHeader>
          <CardBody >
            
            <Text className="h-[60%]">{post.description}</Text>
          </CardBody>
          <CardFooter className="text-gray-500 flex flex-col">
            <Text className="w-[6em]">Start: {post.start_time}</Text>
            <Text className="w-[6em]">End: {post.end_time}</Text>
          </CardFooter>
        </Card>
      })
        }
      </Box>


      <Box h='80%' w='60%' position='relative'>
        <Flex position='absolute' zIndex='1' background='grey' w='60%' justifyContent='center'>
          <Autocomplete>
            <FormControl>
              <Input name='search' id='search' type="text" placeholder="Search Location" />
            </FormControl>
          </Autocomplete>
          <IconButton aria-label='Search Map' icon={<SearchIcon />} onClick={handleSubmit} />
          <IconButton aria-label='Reset Map' icon={<RepeatClockIcon />} onClick={reset} />
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
        >
          <Marker onLoad={marker => console.log(marker)} position={center} onClick={markerClick} onVisibleChanged={marker => console.log(marker)} />
          {allPostInfo.map(post => post.cords).map((cord, i) => {
            return <Marker key={i} position={cord} onClick={markerClick} onVisibleChanged={marker => console.log(marker)} />
          })
          }


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