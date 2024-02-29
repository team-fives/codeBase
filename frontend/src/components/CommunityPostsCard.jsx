import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdEvent, MdLocationPin } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { TbArrowBack, TbArrowForwardUpDouble } from "react-icons/tb";
import { Autocomplete } from "@react-google-maps/api";
import { Box, Card, ButtonGroup, Button, CardBody, CardHeader, CardFooter, Flex, FormControl, Heading, Image, Text, IconButton, Input, SkeletonText, InputGroup, InputRightElement, SimpleGrid } from "@chakra-ui/react";
import PostCard from "./PostCard";
import Map from "../components/Map";

export default function CommunityPostsCard({ post, index, isCurrentUserProfile }) {

    return (
        <>
            <Card key={index} direction={'row'} className="w-full justify-center" >
                <Box className="m-[1em]">
                    <Image src={post.image} alt="post image" className="w-[10em] h-[6em]" />
                    <Flex diretion={'row'} className="justify-center items-center mt-[1em] text-gray-500">
                        <MdEvent />
                        <Text className="w-[10em] ml-[0.3em]">{post.date_of_event}</Text>
                    </Flex>
                </Box>
                <Box className="flex flex-col w-[100%] mr-[1em] mt-[1em] mb-[1em]">
                    <Heading size='md' className="hover:text-[#448960] w-full mb-[0.17em]"><NavLink to={`/posts/${post.id}`}>{post.title}</NavLink></Heading>
                    <Flex diretion={'row'} className="justify-start items-center text-gray-500">
                        <MdLocationPin />
                        <Text className="w-[12em] text-gray-500 ml-[0.3em] truncate">{post.location}</Text>
                    </Flex>
                    <Text className="h-[3.3em] w-full line-clamp-2 text-black-600 mt-[0.25em] mb-[0.16em]">{post.description}</Text>
                    <Flex diretion={'row'} className="justify-start items-center text-gray-500">
                        <IoIosTime />
                        <Text className="w-[6em] ml-[0.3em]">Starts: {post.start_time}</Text>
                        <Text className="w-[6em] ml-[0.5em]">Ends: {post.end_time}</Text>
                    </Flex>
                </Box>
                {!!isCurrentUserProfile &&
                    (
                        <ButtonGroup spacing='2' colorScheme='green' className="bottom-0">
                            <Button onClick={() => handleDelete(post.id)} variant='ghost' colorScheme='green'>
                                Delete
                            </Button>
                        </ButtonGroup>
                    )
                }
            </Card>
        </>
    );
}
