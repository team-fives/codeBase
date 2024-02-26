import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, Text, Image, Button, ButtonGroup } from '@chakra-ui/react'
import { NavLink } from "react-router-dom";

export default function PostCard({ post }) {
    // console.log(post)
    return (
        <>
            <Card key={post.id} className="h-[20em] w-[15em]">
                <CardHeader>
                    <Image src={post.image} height="7em" width="15em"/>
                </CardHeader>
                <CardBody>
                    <Heading size='md'><NavLink to={`/posts/${post.id}`}>{post.title}</NavLink></Heading>
                    <Text>{post.location}</Text>
                    {/* <Text>{post.description}</Text> */}
                    <Box className="flex flex-row w-[5em] space-x-[1em] mr-[1.5em]">
                        <Text>Start: {post.start_time}</Text>
                        <Text>End: {post.end_time}</Text>
                        <Text>Date: {post.date_of_event}</Text>
                    </Box>
                </CardBody>
            </Card>
        </>
    )
}