import React from 'react'
import { Button } from '../ui/button'
import { useGetOrdersQuery, useGetPostQuery, useOrderMutation } from '../../services/postApi'
import { useGetProfileQuery } from '../../services/profileApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import PaypalPayment from '../Payments/PaypalPayment'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CheckSquare, ChevronRight, DollarSign } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'

const CheckoutPage = () => {
    const navigate = useNavigate()
    const {id,quantity, price,firstName,lastName,phoneNumber,email} = useParams()
    const {data:post,isLoading,isError,error} = useGetPostQuery(id)
    const [order,{data:theOrdes}] = useOrderMutation()
    let {data:profile,isLoading:ProfileLoading,refetch:refetchProfile} = useGetProfileQuery()
    let {data:orders,refetch:refetchOrders} = useGetOrdersQuery()


    // const sendOrder = async (id) => {
    //     if (post.instructor == profile?.profile?.username) {
    //         alert("you are the intructor")
    //     } else {
    //     console.log("order:",id);
    //     await order(id).then(async (resp) => {
    //       console.log("the order: ",resp)
    //       await refetchOrders()
    //       await refetchProfile()
    //     })}
    //   }
      console.log(post)
      console.log("firstName",firstName)

    //   _______________paypal conf :
    const initialOptions = {
        clientId: "AYqvllf1UJZtyqpkzmzELXnVSpzJoCCveFBw6-yBMk9ahKvvC0ojiG7wuvBLT17TZAHufpfCM83-bHbq",
        currency: "USD",
        intent: "capture",
    };
    
  return (
    <PayPalScriptProvider options={initialOptions}>
        <div className='flex items-center mt-2'>
            <h1 className='text-blue-700 font-bold text-[30px] ml-2 mr-5 cursor-pointer' onClick={() => navigate('/')}>
                Streamara
            </h1>
            <ChevronRight />
            <h1 className='text-blue-700 font-bold text-[20px] ml-2 mr-5 cursor-pointer flex items-center gap-2 
                max-sm:text-[15px] hover:underline' onClick={() => navigate(`/posts/${id}`)}>
                <CheckSquare />
                Details
            </h1>
            <ChevronRight />
            <h1 className='text-blue-700 font-bold text-[20px] ml-2 mr-5 cursor-pointer max-sm:text-[15px] '>
                Pay
            </h1>
        </div>
        <div className='w-full p-2 grid min-[1024px]:grid-cols-12 max-lg:justify-center  gap-10 my-5 mx-5'>
            <div className=' min-[1024px]:col-span-6 min-[1024px]:col-start-2  max-md:w-[90%] max-lg:p-3 max-lg:w-[600px] '>
                <div className=' border-gray-300 border-2 rounded h-auto pb-2'>
                    <h1 className='bg-gray-300 p-5 font-bold text-[18px] '>Billing information</h1>
                    <p className='p-3 text-gary-700 text-[18px]'>Your invoice will be issued according to the details listed here. 
                        <a className='underline text-blue-500 ml-4' onClick={() => navigate(`/posts/${id}`)}>back to update the info</a>
                    </p>
                    <p className='p-3 py-0 text-gary-700 text-[15px] font-bold'>Full name : {firstName} {lastName} </p>
                    <p className='p-3 py-0 text-gary-700 text-[15px] font-bold'>Phone Number : {phoneNumber} </p>
                    <p className='p-3 py-0 text-gary-700 text-[15px] font-bold'>Email : {email} </p>
                    
                </div>
                <div className='border-gray-300 border-2 rounded h-auto mt-3'>
                    <h1 className='bg-gray-300 p-5 font-bold text-[18px] '>Payment options</h1>
                    <div className='h-auto w-full px-2 mt-3'>
                        {/* <Button onClick={() => sendOrder(id)} className="bg-blue-400 font-bold text-[20px] w-full my-2">
                            Buy now
                        </Button> */}
                        {/* <PayPalButtons /> */}
                        <PaypalPayment id={id} firstName={firstName} lastName={lastName}
                        phoneNumber={phoneNumber} email={email} quantity={quantity} price={price} />
                    </div>
                </div>
            </div>
            <div className='min-[1024px]:sticky min-[1024px]:top-5 min-[1024px]:right-0 
                min-[1024px]:max-h-[320px] rounded min-[1024px]:col-span-3 min-[1024px]:col-start-8
                border-gray-300 border-2 max-md:w-[90%] max-lg:p-3 max-lg:w-[600px]'>
                <div className=''>
                    <div className='flex bg-gray-300 p-3 rounded'>
                        <img src={`https://digitalcommerce-backend.onrender.com/uploads/images/${post?.Post?.thumbnail}`} className='w-[40%] max-h-[150px]' alt="" />
                        <h1 className='w-auto ml-5 font-bold'>{post?.Post?.title}</h1>
                    </div>
                    <div className='flex justify-center gap-5 items-center gap-1 h-[70px] w-full'>
                        <p className='font-bold col-end-1 max-sm:col-start-1 ml-3'>Product price: </p> 
                        <div className='flex items-center'>
                        <p className='font-bold text-[20px]'>{price || 0}</p>
                        <DollarSign className='font-bold h-[20px]' strokeWidth={3}  />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className='flex justify-center gap-5 items-center gap-15 h-[70px] w-full'>
                            <p className='font-bold col-end-1 mx-3'>Quantity: </p> 
                            <p className='font-bold'>{quantity}</p>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-center gap-5 items-center gap-1 h-[70px] w-full'>
                        <p className='font-bold max-sm:col-start-1 ml-3'>Total: </p> 
                        <div className='flex items-center'>
                        <p className='font-bold text-[20px]'>{price*quantity || 0}</p>
                        <DollarSign className='font-bold h-[20px]' strokeWidth={3}  />
                        </div>
                    </div>
                </div>
            
            </div>
            
        </div>
     </PayPalScriptProvider>
  )
}

export default CheckoutPage