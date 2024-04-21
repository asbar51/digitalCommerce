import React, { useEffect, useState } from 'react'
// import { useGetAllPostsQuery } from '../services/postApi'

import { useGetPostsByCategorieQuery } from '../../services/postApi'
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
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../ui/pagination"


const PostsCategorie = () => {
    let ID = 1
    const {categorie,page} = useParams()
    console.log("categorie: ", categorie);
    console.log("page number params : ",page);
    const [Page, setPage] = useState(page || 1)
    const navigate = useNavigate()
    let {data:posts,isLoading,isError,error,refetch} = useGetPostsByCategorieQuery({page,categorie})

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
        console.log("new categorie: ",categorie);   
        refetch()
    },[categorie])

    useEffect(()=> {
        console.log("categorie refetch : ",profile);   
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
        <div className='w-[90%] m-auto'>
            <div className='flex justify-between items-center my-5'>
                <h1 className='font-bold text-center text-[25px] flex items-center 
                    gap-2 min-[1024px]:ml-7' >
                    <span className='gap-2 flex items-center'> Categorie : {categorie}</span>
                </h1>
                <Button onClick={() => navigate(`/create`)} className='justify-self-end w-[70px] h-9 text-white p-2 font-bold'><Plus className='text-white m-1' /> Add</Button>
            </div>
            <div className='min-[1024px]:ml-7 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                {   
                    posts.map(p => (
                        <Course id={p._id} inCart={profile?.profile?.addToCart} thumbnail={p.thumbnail} price={p.price}
                            instructor={p.instructor} sellerAvatar={p.profilePicture} profileUsername={profile?.profile?.username} title={p.title}
                            createdAt={p.createdAt} ratings={p.ratings} key={ID++} />
                        
                    ))
                }
            </div>
            <Pagination className={"my-5"}>
                <PaginationContent>
                
                    <PaginationPrevious onClick={() => {
                        if (+Page>1) {
                            setPage(Page-1)
                            refetch()
                            navigate(`/categorie/${categorie}/page/${+Page-1}`)
                    }
                    } } />
                
                    <PaginationLink className={`${Page == 1 ? "bg-gray-100" : "bg-none"}`} onClick={() => {
                        setPage(1)
                        refetch()
                        navigate(`/categorie/${categorie}/page/${1}`)
                    }} isActive={Page == 1 ? true : null}>1</PaginationLink>
                
                    <PaginationLink className={`${Page == 2 ? "bg-gray-100" : "bg-none"}`} onClick={() => {
                        setPage(2)
                        refetch()
                        navigate(`/categorie/${categorie}/page/${2}`)
                    }} isActive={Page == 2 ? true : null}>
                        2
                    </PaginationLink>
                
                    <PaginationLink className={`${Page == 3 ? "bg-gray-100" : "bg-none"}`} onClick={() => {
                        setPage(3)
                        refetch()
                        navigate(`/categorie/${categorie}/page/${3}`)
                    }} isActive={Page == 3 ? true : null} >3</PaginationLink>
                
                    <PaginationEllipsis />
                
                    <PaginationNext onClick={() => {
                        setPage(+Page+1)
                        refetch()
                        navigate(`/categorie/${categorie}/page/${+Page+1}`)
                    }}/>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
  )
}

export default PostsCategorie