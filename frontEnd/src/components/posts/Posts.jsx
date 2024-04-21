import React, { useEffect, useState } from 'react'
// import { useGetAllPostsQuery } from '../services/postApi'
import { useGetAllPostsQuery } from '../../services/postApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Skeleton } from "../ui/skeleton"
import { Home, LucideLoader2, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Course from './Course'
import { useGetProfileQuery } from '../../services/profileApi'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../ui/pagination"


const Posts = () => {
    let ID = 1
    const {pageNumber} = useParams()
    console.log("page number params : ",pageNumber);
    const [Page, setPage] = useState(pageNumber || 1)
    const navigate = useNavigate()
    let {data:posts,isLoading,isError,error,refetch} = useGetAllPostsQuery(Page)

    const [MyProfile,setMyProfile] = useState(null)
    let {data:profile} = useGetProfileQuery()

    useEffect(() => {
        if (profile && profile !== "logout" ) {
            if (profile?.profile.role == 'instructor') setMyProfile(profile.profile.username)
            // setMyProfile(profile)    
            console.log("profile role : ",profile?.profile.role)
        } else {
            setMyProfile(null)    
            console.log('there is no profile ')
        }
  
    }, [profile])

    useEffect(()=> {
        console.log("posts refetch : ",profile);   
        refetch()
    },[profile])

    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
            <LucideLoader2 className=" animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
    </div>}

    if (isError) {
        return <div className='border-4 border-red-700 bg-white text-red-800'>
            <strong>{error}</strong>
        </div>
    }

    console.log("posts",posts);

    return (
        <div>
        <div className='w-[90%] m-auto '>
            
            <div className='flex justify-between mt-9 px-5 w-full h-[100px] bg-gradient-to-r from-[#0853CC] to-[#72A9DC] 
                my-3 min-[1024px]:ml-7 rounded-lg '>
                <h1 className='font-bold text-left text-white text-[25px] w-[50px] flex items-center 
                    gap-2 min-[1024px]:ml-8' >
                    {MyProfile?"Hey, "+MyProfile[0].toUpperCase()+MyProfile.slice(1):<span className='gap-2 flex items-center '> Latest Products</span>}
                </h1>

                <h1 className='font-bold text-center text-white text-[25px] max-sm:hidden mt-3 italic'>Enjoy Top Products<br /> 
                    <span className='text-[23px] '>on Streamara</span>
                </h1>
                <img src="../../../public/digitalPng.png" className='object-contain  w-[130px] h-[130px] relative bottom-7' alt="" />
            </div>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 min-[1024px]:ml-7'>
                {   
                    posts.map(p => (
                        <Course id={p._id} inCart={profile?.profile?.addToCart} thumbnail={p.thumbnail} price={p.price}
                            instructor={p.instructor} sellerAvatar={p.profilePicture} profileUsername={profile?.profile?.username} title={p.title}
                            createdAt={p.createdAt} ratings={p.ratings} refetchPost={refetch} key={ID++} />
                        
                    ))
                }
            </div>
            <Pagination className={"my-5"}>
                <PaginationContent>
                
                    <PaginationPrevious onClick={() => {
                        if (Page>1) {
                            setPage(Page-1)
                            refetch()
                            navigate(`/page/${Page-1}`)
                    }
                    } } />

                    <PaginationLink onClick={() => {
                        setPage(1)
                        refetch()
                        navigate(`/page/${1}`)
                    }} isActive={Page == 1 ? true : null}>1</PaginationLink>
                
                    <PaginationLink onClick={() => {
                        setPage(2)
                        refetch()
                        navigate(`/page/${2}`)
                    }} isActive={Page == 2 ? true : null}>
                        2
                    </PaginationLink>
                
                    <PaginationLink onClick={() => {
                        setPage(3)
                        refetch()
                        navigate(`/page/${3}`)
                    }} isActive={Page == 3 ? true : null}>3</PaginationLink>
                
                    <PaginationEllipsis />
                
                    <PaginationNext onClick={() => {
                        setPage(+Page+1)
                        refetch()
                        navigate(`/page/${+Page+1}`)
                    }}/>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
  )
}

export default Posts




