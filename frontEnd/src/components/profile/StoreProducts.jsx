import { Home, LucideLoader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Course from '../posts/Course'
import { useGetStoreQuery } from '../../services/postApi'
import { useGetProfileQuery } from '../../services/profileApi'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const StoreProducts = () => {
    let ID = 1
    const { username } = useParams()
    const navigate = useNavigate()
    let { data: posts, isLoading, isError, error, refetch } = useGetStoreQuery(username)
    let { data: profile } = useGetProfileQuery()
    const [MyProfile, setMyProfile] = useState(null)


    useEffect(() => {
        if (profile && profile !== "logout") {
            setMyProfile(profile.profile.username)
            console.log("profile logout : ", profile)
        } else {
            console.log("profile: ", profile)
            setMyProfile(null)
        }
        console.log("store refetch : ", profile);
        refetch()
    }, [profile])

    useEffect(() => {
        console.log("posts refetch : ", profile);
        refetch()
    }, [profile])

    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
            <LucideLoader2 className=" animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
        </div>
    }


    // if (isError) {
    //     return <div className='border-4 border-red-700 bg-white text-red-800'>
    //         <strong>{error}</strong>
    //     </div>
    // }

    console.log("posts:", posts);

    return (
        <div className='w-[90vw] h-[100vh] m-auto'>

            <div className=' m-auto w-[100%] max-[500px]:w-[100%] '>
                <div className='text-center mt-9 px-5 w-full h-[70px] bg-gradient-to-r from-[#007EF3] 
                to-[#72A9DC] mb-[45px] my-3 min-[1024px]:ml-7 rounded-lg'>
                    {/* <img src={`http://localhost:3000/uploads/images/${posts.avatar}`} className="w-[110px] border-4 border-white h-[100px] m-auto rounded-full object-cover"/> */}
                    <div className='relative top-5'>
                        <Avatar className="m-auto h-[80px] w-[80px] border-4 border-white">
                            {profile?.profile?.profilePicture != "img" && profile?.profile?.profilePicture != "undefined" ?
                                <AvatarImage src={`http://localhost:4000/uploads/images/${posts.avatar}`} className="object-cover" /> :
                                <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>}
                        </Avatar>
                        <h1 className='font-bold '>{username.toUpperCase()}</h1>
                    </div>
                </div>
                <div className='flex gap-2'>
                    {/* <h1 className='font-bold text-[18px] bg-gray-300 w-[70px] px-2 rounded'>Sales </h1> */}
                    <h1 className='font-bold text-[18px] bg-gray-300 w-[100px] px-2 rounded'>My store </h1>
                </div>
                <hr className='my-2' />
                <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                    {
                        posts != "logout" ? posts.AllPosts.map(p => (
                            <Course id={p._id} thumbnail={p.thumbnail} price={p.price} sellerAvatar={p.profilePicture}
                                instructor={p.instructor} profileUsername={profile?.profile?.username}
                                title={p.title} createdAt={p.createdAt} ratings={p.ratings} refetchPost={refetch} key={ID++} />

                        ))
                            :
                            <div>
                                <span className='font-bold'>Login first : </span><Button onClick={() => navigate('/login')} variant="outline" className='text-[15px] font-bold h-8 mr-2'>Login</Button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default StoreProducts