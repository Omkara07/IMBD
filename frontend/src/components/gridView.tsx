import React, { useContext, useEffect, useState } from 'react'
import MediaCard from './MediaCard'
import axios from 'axios';
import ActorCard from './ActorCard';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_API_KEY;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const GridView = ({ type }: any) => {
    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageNo, setPageNo] = useState<number>(1);

    const { user } = useContext(UserContext);
    const navigate = useNavigate()


    const fetchMovies = async (page: number) => {
        const data = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        setData((prev: any[] | null) => prev !== null ? [...prev, ...data.data.results] : data.data.results);
    }
    const fetchShows = async (page: number) => {
        const data = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        setData((prev: any[] | null) => prev !== null ? [...prev, ...data.data.results] : data.data.results);
    }
    const fetchPeople = async (page: number) => {
        const data = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        setData((prev: any[] | null) => prev !== null ? [...prev, ...data.data.results] : data.data.results);
    }

    const fetchOriginalData = async () => {
        const data = await axios.get(`${SERVER_URL}/movies/get-all-movies`);
        console.log(data.data)
        setData(data.data.movies);
    }
    const fetchInitialData = async ({ page = 1, reset = false }: { page?: number, reset?: boolean }) => {
        console.log(page)
        if (reset) {
            setPageNo(1);
            setData(null)
        }
        if (type === "movie") {
            await fetchMovies(page);
        }
        else if (type === "ogMovie") {
            await fetchOriginalData();
        }
        else if (type === "tv") {
            await fetchShows(page);
        }
        else if (type === "people") {
            await fetchPeople(page);
        }
    }
    useEffect(() => {
        const f = async () => {
            setLoading(true)
            await fetchInitialData({ reset: true });
            setLoading(false)
        }
        if (!user || !user?.token) {
            navigate('/signin')
        }
        f()
    }, [type])
    return (
        <>
            {
                loading ?
                    <div className='w-full min-h-screen pt-20 p-10 mx-auto flex justify-center items-center'>
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray400 text-xl"></div>
                    </div>
                    :
                    <div className='w-full min-h-screen pt-20 p-10 mx-auto'>
                        <div className="flex flex-wrap gap-6 w-full">
                            {data && data.map((item, index) => (
                                <div key={index} className="max-md:mx-auto">
                                    {
                                        type === "movie" && <MediaCard {...item} isMovie={true} />
                                    }
                                    {
                                        type === "ogMovie" && <MediaCard {...item} isMovie={false} isOgMovie={true} />
                                    }
                                    {
                                        type === "tv" && <MediaCard {...item} isMovie={false} />
                                    }
                                    {
                                        type === "people" && <ActorCard {...item} />
                                    }

                                </div>
                            ))}
                        </div>
                        <div className={`flex justify-center my-10`} >
                            <button onClick={async () => {
                                console.log(pageNo)
                                const nextpage = await (pageNo + 1)
                                console.log(nextpage)
                                await setPageNo(nextpage)
                                await fetchInitialData({ page: nextpage })
                            }} className='flex px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition-all duration-300'>
                                Load More
                            </button>
                        </div>
                    </div>
            }
        </>
    )
}

export default GridView
