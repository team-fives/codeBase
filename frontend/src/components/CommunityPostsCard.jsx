import { Checkbox, CheckboxGroup, SimpleGrid, Box, Flex, FormLabel, FormControl, Input, Center, Stack, Button, Card } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import PostCard from "./PostCard";
import Map from "../components/Map";

export default function CommunityPostsCard({ filterClick, filteredPosts, setLocation, setStartTime, setEndTime, setDate }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        const place = document.getElementById('location').value
        console.log(place)
        setLocation(place);
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

    return (
        <>
            <div className='h-screen w-full bg-[#D9D9D9] flex flex-col justify-center items-center p-[4rem]'>
                <Card className='h-full w-[85%] bg-[#D9D9D9] flex flex-col justify-center items-center p-[4rem]'>
                    <Box className="w-[55%] m-[1em]">
                        {
                            filterClick === "location" &&
                            (
                                <Center>
                                    <FormControl>
                                        <Autocomplete>
                                            <Input name='location' id='location' type="text" placeholder="Location" className='w-full' />
                                        </Autocomplete>
                                    </FormControl>
                                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                                </Center>
                            )
                        }
                        {
                            filterClick === "time" && (
                                <Center>
                                    <Box>
                                        <FormControl>
                                            <Flex direction="row" gap="4">
                                                <FormLabel htmlFor='startTime'>Start:</FormLabel>
                                                <Input onChange={handleStartChange} type='time' id='startTime' name='startTime' />
                                                <FormLabel htmlFor='endTime'>End:</FormLabel>
                                                <Input onChange={handleEndChange} type='time' id='endTime' name='endTime' />
                                            </Flex>
                                        </FormControl>
                                    </Box>
                                </Center>
                            )
                        }
                        {
                            filterClick === "date" && (
                                <Center>
                                    <Box>
                                        <FormControl>
                                            <FormLabel htmlFor='date'>Date:</FormLabel>
                                            <Input onChange={handleDateChange} type='date' id='date' name='date' />
                                        </FormControl>
                                    </Box>
                                </Center>
                            )
                        }
                    </Box>
                    <Map posts={filteredPosts} />
                </Card>
            </div>
        </>
    );
}
