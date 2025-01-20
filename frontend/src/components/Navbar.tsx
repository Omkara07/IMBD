import { Film, Search } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Navbar = () => {
    const [showBox, setShowBox] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const [showSearchBox, setShowSearchBox] = useState(false)
    const [query, setQuery] = useState('');
    const navigate = useNavigate()

    const handleInputChange = (e: any) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            navigate(`/search/${query}`);
        }
    };
    useEffect(() => {

    }, [user])
    return (
        <>
            <div className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to={'/'} className="flex items-center space-x-2">
                            <Film className="text-yellow-400 h-8 w-8" />
                            <span className="text-yellow-400 font-bold text-2xl">IMBd</span>
                        </Link>
                        <div className="flex-1 max-w-xl mx-8 max-md:hidden">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search movies, TV shows, and more..."
                                    className="w-full bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    value={query}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link to={'/movies'} className="text-gray-300 hover:text-yellow-400">Movies</Link>
                            <Link to={'/tv-shows'} className="text-gray-300 hover:text-yellow-400">TV Shows</Link>
                            <Link to={'/people'} className="text-gray-300 hover:text-yellow-400">Actors</Link>
                            {
                                user ?
                                    <div className='flex items-center space-x-5'>
                                        <Link to={'/add-movie'} className='bg-transparent border-black border-[3px] text-yellow-500 hover:text-yellow-400 hover:bg-gray-800 font-bold transition-all duration-300 px-4 py-2 rounded-xl'>Add Movie</Link>
                                        <button onClick={() => { setShowBox((prev) => !prev) }} className='bg-black text-yellow-500 hover:text-yellow-400 hover:bg-gray-800 font-bold w-10 aspect-square flex items-center justify-center transition-all duration-300 rounded-full'>{user?.name[0].toUpperCase()}</button>
                                    </div>
                                    :
                                    <Link to={'/signin'}> <button className='bg-yellow-400 text-black hover:text-yellow-400 hover:bg-gray-700 font-semibold transition-all duration-300 px-4 py-2 rounded-xl'>Signin</button></Link>
                            }
                        </nav>
                        <div className='flex items-center max-md:justify-between gap-8 md:hidden'>
                            <button onClick={() => { setShowSearchBox((prev) => !prev) }} className='md:hidden'>
                                <Search size={20} strokeWidth={3} className='md:hidden' />
                            </button>
                            {
                                user ?
                                    <button onClick={() => { setShowBox((prev) => !prev) }} className='bg-black text-yellow-500 hover:text-yellow-400 hover:bg-gray-800 font-bold w-10 aspect-square flex items-center justify-center transition-all duration-300 rounded-full'>{user?.name[0].toUpperCase()}</button>
                                    :
                                    <Link to={'/signin'}> <button className='bg-yellow-400 text-black hover:text-yellow-400 hover:bg-gray-700 font-semibold transition-all duration-300 px-4 py-2 rounded-xl'>Signin</button></Link>
                            }
                        </div>
                    </div>
                </div>
                {
                    showSearchBox &&
                    <div className="flex-1 max-w-full mx-8 transition-all duration-300 md:hidden my-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search movies, TV shows, and more..."
                                className="w-full bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={query}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                        </div>
                    </div>
                }
                {
                    showBox &&
                    <>
                        <div
                            onClick={() => { setShowBox(false) }}
                            className="bg-black bg-opacity-80 backdrop-blur-lg h-screen w-screen md:hidden fixed inset-0 flex justify-center items-center z-40"
                        >
                            {/* Close button */}
                            <div className="relative w-full h-full px-6 rounded-xl shadow-lg">
                                <button
                                    onClick={() => setShowBox(false)}
                                    className="absolute top-5 right-5 text-5xl text-gray-400 hover:text-white"
                                >
                                    &times;
                                </button>

                                {/* Centered content */}
                                <div className="flex flex-col items-center gap-5 justify-center mt-44 w-full text-2xl font-bold ">
                                    <button
                                        onClick={() => { navigate('/add-movie') }}
                                        className="hover:bg-gray-800 text-gray-200 hover:text-white px-10 py-2 md:hidden"
                                    >
                                        Add Movie
                                    </button>
                                    <button
                                        onClick={() => { navigate('/movies') }}
                                        className="hover:bg-gray-800 text-gray-200 hover:text-white px-10 py-2 md:hidden"
                                    >
                                        Movies
                                    </button>
                                    <button
                                        onClick={() => { navigate('/tv-shows') }}
                                        className="hover:bg-gray-800 text-gray-200 hover:text-white px-10 py-2 md:hidden"
                                    >
                                        TV Shows
                                    </button>
                                    <button
                                        onClick={() => { navigate('/og-movies') }}
                                        className="hover:bg-gray-800 text-gray-200 hover:text-white px-10 py-2 md:hidden"
                                    >
                                        OG Movies
                                    </button>
                                    <button
                                        onClick={() => { navigate('/people') }}
                                        className="hover:bg-gray-800 text-gray-200 hover:text-white px-10 py-2 md:hidden"
                                    >
                                        Actors
                                    </button>
                                    <button
                                        onClick={() => {
                                            setUser(null);
                                            localStorage.removeItem('user');
                                            setShowBox(false);
                                        }}
                                        className="hover:bg-gray-800 px-10 py-2 md:hidden"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='absolute rounded-xl right-2 bg-gray-800 text-gray-200 px-5 py-2'>
                                <button onClick={() => {
                                    setUser(null)
                                    localStorage.removeItem('user');
                                    setShowBox(false)
                                }} className='hover:bg-gray-800 max-md:hidden font-bold px-10 py-2 hover:text-orange-400'>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>

                }
            </div>
        </>
    )
}

export default Navbar
