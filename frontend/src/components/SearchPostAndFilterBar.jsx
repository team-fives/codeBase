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
        <div className="w-full flex flex-col justify-center items-center relative">
            <Center className="w-full mt-[1em] m-[1em]">
                {isLoaded && (
                    <Center className="w-[95%] flex justify-center items-center">
                        <FormControl className="w-full">
                            <Autocomplete className="w-full">
                                <Input name='location' id='location' type="text" placeholder="Location" className='w-full' />
                            </Autocomplete>
                        </FormControl>
                        <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    </Center>
                )}
            </Center>
            <Center className="w-full">
                <Card className="mt-[1em] bg-white hover:bg-gray-300">
                    <Select placeholder="Sort By:" defaultValue={"latest"} onChange={handleSortClick} className='cursor-pointer'>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </Select>
                </Card>
                <Card className="mt-[1em] bg-white hover:bg-gray-300" >
                    <Select placeholder="Filter By:" onChange={handleFilterClick} className='cursor-pointer'>
                        <option value="date">Date</option>
                        <option value="time">Start/End Time</option>
                    </Select>
                </Card>
                <CreatePostForm posts={posts} setPosts={setPosts} hovered={hovered} className="w-[25%]" />
            </Center>
        </div>
    </>
}