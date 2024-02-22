import { Checkbox, CheckboxGroup, SimpleGrid, Box, Flex, FormLabel, FormControl, Input, Center, Stack } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import PostCard from "./PostCard";

export default function CommunityPostsCard({ posts, filterClick, setLocation, setStartTime, setEndTime }) {
    const handleLocationChange = (e) => {
        console.log(e.target.value)
        setLocation(e.target.value);
    };

    const handleStartChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndChange = (e) => {
        setEndTime(e.target.value);
    };

    return (
        <>
            <div className='h-screen w-full bg-[#D9D9D9] flex flex-col justify-center items-center p-[4rem]'>
                <Box className="w-full m-[1em]">
                    {
                        filterClick === "location" &&
                        (
                            <Center>
                                <Autocomplete>
                                    <Input name='location' id='location' type="text" placeholder="Location" className='w-full' onChange={handleLocationChange}/>
                                </Autocomplete>
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
                </Box>
                <Box w='80%' h={'full'} p={4} overflowY={"scroll"}>
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' className="p-[1rem]">
                        {posts.map((post) => (
                            <ul overflow="scroll" key={post.id}>
                                <PostCard post={post} />
                            </ul>
                        ))}
                    </SimpleGrid>
                </Box>
            </div>
        </>
    );
}
