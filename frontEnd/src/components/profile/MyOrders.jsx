import { Home, LogIn, LogOut, LucideLoader2, Star } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from "date-fns"
import Course from '../posts/Course'
import { useGetFromCartQuery, useGetOrdersQuery } from '../../services/postApi'
import { useGetProfileQuery } from '../../services/profileApi'
import { Button } from '../ui/button'
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

const MyOrders = () => {
    let ID = 1
    
    const navigate = useNavigate()
    let {data:posts,isLoading,isError,error} = useGetOrdersQuery()
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
    
    const dateHandler = (createdAt) => {
    const date = new Date(createdAt)
    const formattedDate = formatDistanceToNow(date, { addSuffix:true })
    return formattedDate
    }

    // console.log("orders :",posts);

  return (
    <div className='w-[95vw] h-[100vh] m-auto'>
        <div className='flex justify-center mt-9 px-5 w-full h-[70px] bg-gradient-to-r from-[#007EF3] to-[#72A9DC] 
                my-3 min-[1024px]:ml-7 rounded-lg '>
            
            <img src="../../../public/paymentsPng.png" className='mr-5' alt="" />
            <h1 className='font-bold text-white text-center text-[35px]  flex items-center 
            gap-2 ' >
                Payments
            </h1>
        </div>
        <div className='p-5 m-auto w-[100%] max-[500px]:w-[100%] '>
            {/* <h1 className='font-bold text-[18px]'>Products in orders :</h1> */}
            <hr className='my-1'/>
    <Table className="w-full">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >Product</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Price</TableHead>
          {/* <TableHead>Status</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts!="logout" ? posts?.Posts?.map(p => (
          <TableRow key={ID++}>
            <TableCell className='flex gap-5'>
                <img src={`https://digitalcommerce-backend.onrender.com/uploads/images/${p?.thumbnail}`} 
                onClick={()=> navigate(`/posts/${p?.id}`)} className="w-[50px] h-[50px] cursor-pointer object-fill"/>
                <div>
                    <h1 className='font-bold max-lg:text-[12px] '>{p?.title}</h1>
                    <span className='flex items-center text-black mt-2'> 5.0 <Star className="h-5" fill='yellow' strokeWidth={0} /> ({p?.ratings.length})</span>
                </div>
            </TableCell>
            <TableCell className="max-lg:text-[12px]">{dateHandler(p?.createdAt)}</TableCell>
            <TableCell className="font-bold text-right">{p?.price}$</TableCell>
            {/* <TableCell className='font-bold text-green-500 italic'>ORDERED</TableCell> */}
          </TableRow>
        ))
        : 
        (
        <div className='m-auto col-span-5'>
            <span className='font-bold mx-10 text-[25px]'>Login first : </span><Button onClick={() => navigate('/login')} variant="outline" className='text-[25px] p-5 font-bold h-8 mr-2'>
                <LogIn className='mx-2'/>
                Login</Button>
        </div>
        )
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">${posts.totalPrice || 0}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
            
        </div>
    </div>
  )
}

export default MyOrders