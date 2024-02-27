import { useState, useEffect } from "react"
import CreatePostForm from "./CreatePostForm";
import { Select, Card } from "@chakra-ui/react";

export default function CreatePostAndFilterBar({ posts, setPosts, setSortClick, setFilterClick }) {
    const [hovered, setHovered] = useState(false);
    const handleSortClick = (event) => {
        setSortClick(event.target.value);
    }

    const handleFilterClick = (event) => {
        setFilterClick(event.target.value);
    }


    return <>
        <div className={`h-[15rem] w-full bg-community z-0 bg-cover bg-start flex align-middle content-center justify-center items-end overflow-visible`}>
            <div className="w-[75%] flex flex-row justify-center items-center mt-2 pt-4 space-x-[2rem] absolute translate-y-[45%]">
                <Card className="basis-1/4 h-[5rem] bg-white hover:bg-gray-300 p-4">
                    <Select placeholder="Sort By:" onChange={handleSortClick} className='cursor-pointer'>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </Select>
                </Card>
                <Card onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="basis-1/4 h-[5rem] bg-white flex flex-col justify-center items-center hover:bg-gray-300">
                    <CreatePostForm posts={posts} setPosts={setPosts} hovered={hovered}/>
                </Card>
                <Card className="basis-1/4 h-[5rem] bg-white hover:bg-gray-300 p-4">
                    <Select placeholder="Filter By:" onChange={handleFilterClick} className='cursor-pointer'>
                        <option value="location">Location</option>
                        <option value="date">Date</option>
                        <option value="time">Start/End Time</option>
                    </Select>
                </Card>
            </div>

        </div>
    </>
}