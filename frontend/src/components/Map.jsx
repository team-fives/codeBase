import { useContext, useEffect, useState } from "react";

import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { Button, FormControl, Input, SimpleGrid } from "@chakra-ui/react";
import { googleApi, geoCode } from "../googleApi";
import PostCard from "./PostCard";

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};




export default function Map({ posts }) {

  const [map, setMap] = useState(/** @type google.maps.Map */)
  const [marker, setMarker] = useState(/** @type google.maps.Marker */)
  const [zoom, setZoom] = useState(10)
  const { isLoaded } = googleApi()
  geoCode()

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
      <Box w='30%' h='80%' background='grey' overflow='scroll'>
        <Box w='100%' h={'full'} overflowY={"scroll"}>
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' className="p-[1rem]">
            {posts.map((post) => (
              <ul overflow="scroll" key={post.id}>
                <PostCard post={post} />
              </ul>
            ))}
          </SimpleGrid>
        </Box>
      </Box>


      <Box h='80%' w='60%' position='relative'>
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