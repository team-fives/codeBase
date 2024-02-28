import { useState, useEffect } from "react"
import { Checkbox, CheckboxGroup, SimpleGrid, Box, Flex, FormLabel, FormControl, Input, Center, Stack, Button, Select, Card } from '@chakra-ui/react'
import { Autocomplete } from "@react-google-maps/api";
import { geoCode, googleApi } from "../googleApi";

export default function CreatePostAndFilterBar({ posts, setPosts, setLocation, setSortClick, setFilterClick }) {
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
        <div className="w-[75%] flex flex-col justify-center items-center mt-2 pt-4 space-x-[2rem] absolute translate-y-[45%] z-9">
            <Center>
                <FormControl>
                    {isLoaded && (
                        <Center>
                            <FormControl>
                                <Autocomplete>
                                    <Input name='location' id='location' type="text" placeholder="Location" className='w-full' />
                                </Autocomplete>
                            </FormControl>
                            <Button type="submit" onClick={handleSubmit}>Submit</Button>
                        </Center>
                    )}
                </FormControl>
            </Center>
            <Center>
                <Card className="basis-1/4 h-[5rem] bg-white hover:bg-gray-300 p-4">
                    <Select placeholder="Sort By:" defaultValue={"latest"} onChange={handleSortClick} className='cursor-pointer'>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </Select>
                </Card>
                <Card className="basis-1/4 h-[5rem] bg-white hover:bg-gray-300 p-4">
                    <Select placeholder="Filter By:" onChange={handleFilterClick} className='cursor-pointer'>
                        <option value="date">Date</option>
                        <option value="time">Start/End Time</option>
                    </Select>
                </Card>
            </Center>
        </div>
    </>
}