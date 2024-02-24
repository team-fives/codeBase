import { useContext, useEffect, useState } from "react";

import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { Box, Button, Flex, FormControl, Input, SkeletonText } from "@chakra-ui/react";
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
    return <SkeletonText/>
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
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100%'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
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
          <Marker onLoad={ marker => console.log(marker)} position={center} onClick={markerClick} onVisibleChanged={marker => console.log(marker)} />
          {allPostInfo.map(post => post.cords).map((cord, i) => {
              return <Marker key={i} position={cord} onClick={markerClick} onVisibleChanged={marker => console.log(marker)} />
            })
          }


        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
      <Autocomplete>
        <FormControl>
          <Input name='search' id='search' type="text" placeholder="Search Location" />
        </FormControl>
      </Autocomplete>
      <Button type="submit" onClick={handleSubmit}>Submit</Button>
      <Button onClick={reset}>Reset Map</Button>
      <CreatePostForm posts={allPostInfo} setPosts={setAllPostInfo}/>
      </Box>
      </Flex>
    </>
  }