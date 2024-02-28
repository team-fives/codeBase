import { useEffect, useState } from "react";
import { getAllPosts } from "../adapters/post-adapter";
import CreatePostAndFilterBar from "../components/SearchPostAndFilterBar";
import CommunityPostsCard from "../components/CommunityPostsCard";
import Map from "../components/Map";

export default function CommunityPosts() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [sortClick, setSortClick] = useState("latest");
    const [filterClick, setFilterClick] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }

    const handleStartChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndChange = (e) => {
        setEndTime(e.target.value);
    };

    useEffect(() => {
        const getPosts = async () => {
            const allPosts = await getAllPosts();
            let sortedPosts;
            if (sortClick === "latest") {
                sortedPosts = allPosts.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
            } else if (sortClick === "oldest") {
                sortedPosts = allPosts.sort((a, b) => new Date(a.date_created) - new Date(b.date_created));
            }
            setPosts(sortedPosts);
            setFilteredPosts(sortedPosts);
        };

        getPosts();
    }, [sortClick]);

    useEffect(() => {
        let updatedPosts = [...posts];
        console.log(date)
        if (location) {
            updatedPosts = updatedPosts.filter(post => {
                return post.location === location;
            });
        } else if (filterClick && startTime && endTime) {
            updatedPosts = updatedPosts.filter(post => {
                return post.start_time >= startTime && post.end_time <= endTime;
            });
        } else if (filterClick && date) {
            updatedPosts = updatedPosts.filter(post => {
                return post.date_of_event === date;
            });
        }

        console.log('filtered', updatedPosts)
        setFilteredPosts(updatedPosts);
    }, [posts, filterClick, startTime, endTime, date, location]);


    return (
        <>
            <div className="w-full h-full">
                {/* <CreatePostAndFilterBar
                    setSortClick={setSortClick}
                    setFilterClick={setFilterClick}
                    posts={posts}
                    setPosts={setPosts}
                    setLocation={setLocation}
                /> */}
                {/* <CommunityPostsCard
                    setPosts={setPosts}
                    filteredPosts={filteredPosts}
                    filterClick={filterClick}
                    setFilteredPosts={setFilteredPosts}
                    setDate={setDate}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                /> */}
                {
                        filterClick === "time" && (
                            <Center>
                                <FormControl className="mt-[5rem]">
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
                                <FormControl className="mt-[5rem]">
                                    <FormLabel htmlFor='date'>Date:</FormLabel>
                                    <Input onChange={handleDateChange} type='date' id='date' name='date' />
                                </FormControl>
                            </Center>
                        )
                    }
                    <Map 
                    posts={filteredPosts} 
                    setPosts={setPosts}
                    filteredPosts={filteredPosts}
                    filterClick={filterClick}
                    setFilteredPosts={setFilteredPosts}
                    setDate={setDate}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                     />
            </div>
        </>
    );
}
