import { Checkbox, CheckboxGroup, SimpleGrid, Box, Flex, FormLabel, FormControl, Input, Center, Stack, Button, Select, Card } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import PostCard from "./PostCard";
import Map from "../components/Map";

export default function CommunityPostsCard({ filterClick, filteredPosts, setStartTime, setEndTime, setDate, setPosts }) {
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const place = document.getElementById('location').value
    //     console.log(place)
    //     setLocation(place);
    // }

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }

    const handleStartChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndChange = (e) => {
        setEndTime(e.target.value);
    };

    return (
        <>
            <Box position="relative" zIndex="1" className='h-[100%] w-[100%] flex flex-col justify-center items-center mt-[1rem]'>
                {/* className='h-full w-full bg-[#D9D9D9] flex flex-col justify-center items-center p-[4rem]' */}

                    {
                        filterClick === "time" && (
                            <Center>
                                <FormControl>
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
                                <FormControl>
                                    <FormLabel htmlFor='date'>Date:</FormLabel>
                                    <Input onChange={handleDateChange} type='date' id='date' name='date' />
                                </FormControl>
                            </Center>
                        )
                    }
                    <Map posts={filteredPosts} setPosts={setPosts} />
            </Box>
        </>
    );
}
