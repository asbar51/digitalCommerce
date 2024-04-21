import { Home, LogIn, LogOut, LucideLoader2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Course from '../posts/Course'
import { useGetFromCartQuery } from '../../services/postApi'
import { useGetProfileQuery } from '../../services/profileApi'
import { Button } from '../ui/button'

const MyCart = () => {
    let ID = 1
    const navigate = useNavigate()
    let {data:posts,isLoading,isError,error} = useGetFromCartQuery()
    let {data:profile} = useGetProfileQuery()

    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
            <LucideLoader2 className=" animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
    </div>}

    // if (isError) {
    //     return <div className='border-4 border-red-700 bg-white text-red-800'>
    //         <strong>{error}</strong>
    //     </div>
    // }

    console.log("cart posts:",posts);

  return (
    <div className='w-[90vw] h-[100vh] m-auto'>
        <div className='flex justify-center items-center mt-9 px-5 w-full h-[70px] bg-gradient-to-r from-[#007EF3] to-[#72A9DC] 
        my-3 min-[1024px]:ml-7 text-center rounded-lg '>
            <img src="../../../public/cartPng.png" className='w-[50px] h-[50px] mr-7 ' alt="" />

            <h1 className='font-bold text-white text-[35px]
            gap-2 ' >
                MY CART
            </h1>
        </div>
        <div className='px-5 m-auto w-[100%] max-[500px]:w-[100%] '>
            {/* <h1 className='font-bold text-[18px]'>Products in Carts :</h1> */}
            <hr className='my-2'/>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
            {   
                    posts!="logout" ? posts.map(p => (
                        
                        <Course id={p?._id} inCart={profile?.profile?.addToCart} thumbnail={p?.thumbnail} price={p?.price} instructor={p?.instructor}
                        sellerAvatar={p?.profilePicture} ratings={p?.ratings} profileUsername={profile?.profile?.username} title={p?.title} createdAt={p?.createdAt} key={ID++} />
                        
                    ))
                    :
                    <div className='m-auto col-span-5'>
                        <span className='font-bold mx-10 text-[25px]'>Login first : </span><Button onClick={() => navigate('/login')} variant="outline" className='text-[25px] p-5 font-bold h-8 mr-2'>
                            <LogIn className='mx-2'/>
                            Login</Button>
                    </div>
            }
            </div>
        </div>
    </div>
  )
}

export default MyCart