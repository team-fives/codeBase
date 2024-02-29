import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import { Box, Card, CardBody, CardHeader, CardFooter, Flex, FormControl, Heading, Image, Text, IconButton, Input, SkeletonText, InputGroup, InputRightElement, SimpleGrid } from "@chakra-ui/react";
import PostCard from "./PostCard";
import Map from "../components/Map";

export default function CommunityPostsCard({ post, index }) {

    return (
        <>
            <Card key={index} direction={'row'} className="w-full" >
                <CardHeader>
                    <Image src={post.image} alt="post image" className="w-[10em] h-[6em]" />
                    <Text className="mt-[1em] text-gray-500">Location: {post.location}</Text>
                </CardHeader>
                <CardBody className="text-gray-500 flex flex-col w-[100%]">
                    <Heading size='md'><NavLink to={`/posts/${post.id}`}>{post.title}</NavLink></Heading>
                    {/* <Text className="h-[60%]">{post.description}</Text> */}
                    <Text className="w-[6em]">Date: {post.date_of_event}</Text>
                    <Text className="w-[6em]">Start: {post.start_time}</Text>
                    <Text className="w-[6em]">End: {post.end_time}</Text>
                </CardBody>
            </Card>
        </>
    );
}
