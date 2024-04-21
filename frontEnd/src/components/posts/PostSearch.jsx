import React, { useEffect, useState } from 'react'
// import { useGetAllPostsQuery } from '../services/postApi'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"
import { useGetPostsBySearchQuery } from '../../services/postApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Skeleton } from "../ui/skeleton"
import { Filter, Home, LucideLoader2, Plus } from 'lucide-react'
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
import { Label } from "../ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import { Input } from '../ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"


const PostSearch = () => {
    let ID = 1
    const {search,categorie,page,minPrice,maxPrice} = useParams()
    console.log("search: ", search);
    console.log("page number params : ",page);
    const [Page, setPage] = useState(page || 1)
    const [categorieVar, setCategorieVar] = useState(categorie || "all")
    const [minPriceVar, setMinPriceVar] = useState(minPrice || 0)
    const [maxPriceVar, setMaxPriceVar] = useState(maxPrice || 399)
    const navigate = useNavigate()
    let {data:posts,isLoading,isError,error,refetch} = useGetPostsBySearchQuery({page,categorie,search,minPrice,maxPrice})

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

    
    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
            <LucideLoader2 className=" animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
    </div>}

    if (isError) {
        return <div className='border-4 border-red-700 bg-white text-red-800'>
            <strong>{error}</strong>
        </div>
    }

    const onValueChange = (e) => {
        // Safely extract the value property
        const selectedValue = e && e.target ? e.target.value : e;
      
        // Use the extracted value
        setCategorieVar(selectedValue);
        console.log("filter by categore: ",categorieVar);
    };

    const handleMinP = (e) => {
        // Safely extract the value property
        const selectedValue = e && e.target ? e.target.value : e;
      
        // Use the extracted value
        setMinPriceVar(selectedValue);
        console.log("minPrice : ",minPriceVar);
    };

    const handleMaxP = (e) => {
        // Safely extract the value property
        const selectedValue = e && e.target ? e.target.value : e;
      
        // Use the extracted value
        setMaxPriceVar(selectedValue);
        console.log("maxPrice : ",maxPriceVar);
    };

    console.log("posts",posts);

    return (
        <div>
        <div className='w-[90%] m-auto'>
            <div className='flex justify-between items-center my-5'>
                <h1 className='font-bold text-center text-[25px] flex items-center 
                    gap-2 ' >
                    <span className='gap-2 flex items-center'> Search : {search}</span>
                </h1>
                <Popover>
                    <PopoverTrigger asChild>
                        {/* <Button variant="outline">Open popover</Button> */}
                        <Button className='justify-self-end w-[70px] 
                            h-9 text-white p-2 font-bold'><Filter className='text-white m-1' /> Filter</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[260px]">
                        <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Set the filter conditions you want :</h4>
                            
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="categorie">Categorie</Label>
                            <Select id="categorie" onValueChange={onValueChange} defaultValue={categorie || 'all'} className="col-span-2 w-full h-8">
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="select a categorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>categories</SelectLabel>
                                    <SelectItem value="all">all</SelectItem>
                                    <SelectItem value="website">website</SelectItem>
                                    <SelectItem value="course">course</SelectItem>
                                    <SelectItem value="book">book</SelectItem>
                                    <SelectItem value="software">software</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {/* <Input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                            /> */}
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxPrice">Max. price</Label>
                            <Input
                                id="maxPrice"
                                type="number"
                                defaultValue={maxPrice || 399}
                                className="col-span-2 h-8"
                                onChange={handleMaxP}
                            />
                            </div>
                            
                            <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="minPrice">Min. price</Label>
                            <Input
                                id="minPrice"
                                type='number'
                                defaultValue={minPrice || 0}
                                className="col-span-2 h-8"
                                onChange={handleMinP}
                            />
                            </div>
                        </div>
                        </div>
                        <Button onClick={() => navigate(`/search/${search}/categorie/${categorieVar}/minPrice/${minPriceVar}/maxPrice/${maxPriceVar}`)} className='justify-self-end w-[70px] 
                            h-9 text-white p-2 font-bold'><Filter className='text-white m-1' /> submit</Button>
                    </PopoverContent>
                </Popover>
                
            </div>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
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
                        if (Page>1) {
                            setPage(Page-1)
                            refetch()
                            navigate(`/search/${search}/categorie/${categorie}/minPrice/${minPriceVar}/maxPrice/${maxPriceVar}/page/${+Page-1}`)
                    }
                    } } />

                    <PaginationLink className={`${Page == 1 ? "bg-gray-100" : "bg-none"}`} onClick={() => {
                        setPage(1)
                        refetch()
                        navigate(`/search/${search}/categorie/${categorie}/minPrice/${minPriceVar}/maxPrice/${maxPriceVar}/page/${1}`)
                    }} isActive={Page == 1 ? true : null}>1</PaginationLink>
                
                    <PaginationLink className={`${Page == 2 ? "bg-gray-100" : "bg-none"}`} onClick={() => {
                        setPage(2)
                        refetch()
                        navigate(`/search/${search}/categorie/${categorie}/minPrice/${minPriceVar}/maxPrice/${maxPriceVar}/page/${2}`)
                    }} isActive={Page == 2 ? true : null}>
                        2
                    </PaginationLink>
                
                    <PaginationLink className={`${Page == 3 ? "bg-gray-100" : "bg-none"}`} onClick={() => {
                        setPage(3)
                        refetch()
                        navigate(`/search/${search}/categorie/${categorie}/minPrice/${minPriceVar}/maxPrice/${maxPriceVar}/page/${3}`)
                    }} isActive={Page == 3 ? true : null}>3</PaginationLink>
                
                    <PaginationEllipsis />
                
                    <PaginationNext onClick={() => {
                        setPage(+Page+1)
                        refetch()
                        navigate(`/search/${search}/categorie/${categorie}/minPrice/${minPriceVar}/maxPrice/${maxPriceVar}/page/${+Page+1}`)
                    }}/>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
  )
}

export default PostSearch