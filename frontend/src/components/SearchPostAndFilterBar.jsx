import { useState, useEffect } from "react"
import { Checkbox, CheckboxGroup, SimpleGrid, Box, Flex, FormLabel, FormControl, Input, Center, Stack, Button, Select, Card } from '@chakra-ui/react'
import { Autocomplete } from "@react-google-maps/api";
import { geoCode, googleApi } from "../googleApi";
import CreatePostForm from "./CreatePostForm";

export default function CreatePostAndFilterBar({ posts, hovered, setHovered, setPosts, setLocation, setSortClick, setFilterClick }) {
    const { isLoaded } = googleApi()
    const handleSortClick = (event) => {
        setSortClick(event.target.value);
    }

    const handleFilterClick = (event) => {
        setFilterClick(event.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const place = document.getElementById('location').value
        console.log(place)
        setLocation(place);
    }

    return <>
        <div className="h-[8em] w-full flex flex-row justify-around items-center">
            <Box className="flex flex-col">
                {isLoaded && (
                    <Center className="w-full flex justify-center items-center">
                        <FormControl className="w-full">
                            <Autocomplete className="w-full mb-[1em]">
                                <Input name='location' id='location' type="text" placeholder="Location" className='w-full'/>
                            </Autocomplete>
                        </FormControl>
                        <Button type="submit" onClick={handleSubmit} className="mb-[1em]">Submit</Button>
                    </Center>
                )}
                <Box className="flex flex-row">
                    <Select placeholder="Sort By:" defaultValue={"latest"} onChange={handleSortClick} className='cursor-pointer'>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </Select>
                    <Select placeholder="Filter By:" onChange={handleFilterClick} className='cursor-pointer'>
                        <option value="date">Date</option>
                        <option value="time">Start/End Time</option>
                    </Select>
                </Box>
            </Box>
            <CreatePostForm posts={posts} setPosts={setPosts} hovered={hovered} />
        </div>
    </>
}