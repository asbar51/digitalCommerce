import React, { useEffect, useState } from 'react'
import { useAddReviewMutation, useAddToCartMutation, useDeleteReviewMutation, useGetFromCartQuery, useGetOrdersQuery, useGetPostQuery, useOrderMutation, useRemoveFromCartMutation, useUpdateReviewMutation } from '../../services/postApi'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowBigLeft, ArrowLeft, ArrowRight, ArrowUpRight, DollarSign, FastForward, FileVideo, ForwardIcon, Home, LucideLoader2, LucideShoppingCart, LucideStepForward, MoreVertical, ShoppingCart, SkipForward, Star, StarIcon, StepBackIcon, StepForward, TimerIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { formatDistanceToNow } from "date-fns"
import { useGetProfileQuery } from '../../services/profileApi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const PostDetails = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {data:post,isLoading,isError,error,refetch:refetchPost} = useGetPostQuery(id)
  let {data:profile,isLoading:ProfileLoading,refetch:refetchProfile} = useGetProfileQuery()
  let {data:cart,isLoading:isLoadingCart,refetch:refetchCart} = useGetFromCartQuery()
  const [removeFromCart,{data:cartRemoved}] = useRemoveFromCartMutation()
  const [addToCart,{data:cartAdded}] = useAddToCartMutation()
  const [order,{data:theOrdes}] = useOrderMutation()
  // let {data:orders,refetch:refetchOrders} = useGetOrdersQuery()
  let [addReview,{data: reviewAdded}] = useAddReviewMutation()
  let [updateReview,{data: reviewUpdated}] = useUpdateReviewMutation()
  let [deleteReview,{data: reviewDeleted}] = useDeleteReviewMutation()
  
  const [MyProfile,setMyProfile] = useState(null)
  const [rating, setRating] = useState(0);
  const [ratingMessage,setRatingMessage] = useState(null)

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()

  let personalRating = post?.Post.ratings.find(rating => rating.reviewerUsername === profile?.profile?.username);
  useEffect(()=> {
      if (profile  && profile !== "logout" ) {
          setMyProfile(profile.profile.username)
          setEmail(profile?.profile?.email)
          console.log("profile logout : ",profile)
      } else {
          console.log("profile: ",profile)
          setMyProfile(null)
      }
      console.log("store refetch : ",profile);   

      if (personalRating) {
          setRating(personalRating.rating);
          setRatingMessage(personalRating.ratingMessage)
          console.log("personalRating: ", personalRating);
      }

  },[post, profile])



  const [QuantityNumber,setQuantityNumber] = useState(1)
  // const inCart = profile?.profile?.addToCart

  if (isLoading) {
    return <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
        <LucideLoader2 className=" animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
      </div>}

  if (isError) {
      return <div className='border-4 border-red-700 bg-white text-red-800'>
          <strong>{error}</strong>
      </div>
  }

  const addReviewHandler = async (PostId) => {
    if (post?.Post?.instructor == profile?.profile?.username) {
      alert("you are the intructor")
      
    } else {
    console.log("review added to:",PostId);
    await addReview({PostId,body: {rating,ratingMessage}}).then(async (resp) => {
      console.log("is review added :",resp)
      refetchPost()
    })}
  }

  const deleteReviewHandler = async (PostId) => {
    if (post?.Post?.instructor == profile?.profile?.username) {
      alert("you are the intructor")
      
    } else {
    console.log("review deleted to:",PostId);
    await deleteReview(PostId).then(async (resp) => {
      console.log("is review deleted :",resp)
      refetchPost()
    })}
  }

  const updateReviewHandler = async (PostId) => {
    if (post?.Post?.instructor == profile?.profile?.username) {
      alert("you are the intructor")
      
    } else {
    console.log("review updated to:",PostId);
    await updateReview({PostId,body: {rating,ratingMessage}}).then(async (resp) => {
      console.log("is review updated :",resp)
      refetchPost()
    })}
  }

  const addToCartHandler = async (id) => {
    if (post?.Post?.instructor == profile?.profile?.username) {
      alert("you are the intructor")
      
    } else {
    console.log("add:",id);
    await addToCart(id).then(async (resp) => {
      console.log("cart",resp)
      await refetchCart()
      await refetchProfile()
    })}
  }

  const removeFromCartHandler = async (id) => {
    if (post.Post.instructor == profile?.profile?.username) {
      alert("you are the intructor")
      return;
    }else {
    console.log("remove:",id);
    await removeFromCart(id).then(async (resp) => {
      console.log(resp)
      await refetchCart()
      await refetchProfile()
    })}
  }

  const customerHandler = async (e) => {
    e.preventDefault();
    console.log("firstName : ", firstName);
    

    navigate(
      `/checkout/${post?.Post?._id}/quantity/${QuantityNumber}/price/${post?.Post?.price}/${profile?.profile?.firstName}/${profile?.profile?.lastName}/${phoneNumber}/${email}`
      )
  }
  

  console.log('the ratings :',post?.Post.ratings);
  console.log('the page:',post?.Post);
  // console.log("email : ", profile.profile.email);
  // console.log("cart : ",profile?.profile?.addToCart);
  // console.log('post.Post id : ', post?.Post?._id);
  return (
    <div className='w-[90%]  m-auto'>
      <div className='Path flex items-center gap-3 my-5'>
        {/* <h1 className='font-bold text-center text-[25px] underline flex items-center 
          gap-2 cursor-pointer' onClick={() => navigate(`/`)}>
            <Home />
        </h1>
        <div className='font-bold text-gray-500 text-center text-[25px]'>/</div>
        <h1 className='font-bold text-center text-[25px] underline flex items-center 
          gap-2 ' >
            Course
        </h1> */}
      </div>
      {/*  */}
      <div className='grid grid-cols-12  gap-4'>
        <div className='xl:col-span-8 lg:col-span-8 max-md:col-span-12  md:col-span-12'>
          <img src={`https://digitalcommerce-backend.onrender.com/uploads/images/${post?.Post?.thumbnail}`} className="w-full max-h-[450px] object-fill"/>
        </div>
        <div className='grid xl:col-span-4 lg:col-span-4 max-md:col-span-12  md:col-span-12 h-auto border-[1px] border-gray-300 flex  flex-col p-5'>
          <div className='gap-5 h-auto py-3'>
            <h1 className='font-bold text-[25px] my-1'>{post?.Post?.title}</h1>
            <div className='flex gap-1 items-center'>
            <p className='font-bold '>Reviews({post.Post.ratings.length}) : 5.0 </p> <StarIcon fill="yellow" strokeWidth={"1px"} size={"17px"} />
            </div>
          </div>
          <hr />
          <div className='grid grid-cols-4 items-center gap-1 h-[55px] w-full'>
            <p className='font-bold col-start-2 max-sm:col-start-1'>Price : </p> 
            <div className='flex items-center'>
              <p className='font-bold text-[20px]'>{post?.Post?.price || 0}</p>
              <DollarSign className='font-bold h-[20px]' strokeWidth={3}  />
            </div>
          </div>
          <hr />
          <div>
            <div className='grid grid-cols-4 items-center gap-15 h-[55px] w-full'>
              <p className='font-bold col-start-2 max-sm:col-start-1  min-[1024px]:text-[14px] '>Quantity:  </p> 
              <div className='flex items-center '>
                {/* {<Button className="bg-null hover:bg-null font-bold text-[25px] text-black max-sm:text-[13px]" onClick={() => setQuantityNumber(QuantityNumber+1)}>+</Button>} */}
                {QuantityNumber}
                {/* {<Button className="bg-null hover:bg-null font-bold text-[25px] text-black max-sm:text-[12px]" onClick={() => { if (QuantityNumber>1) setQuantityNumber(QuantityNumber-1)}}>-</Button>} */}
              </div>
            </div>
            <hr />
            <div className='grid grid-cols-4 items-center justify-around   h-[55px] w-full'>
              <p className='font-bold  col-start-2 max-sm:col-start-1'>Stock : </p> 
              <div className='flex  '>
                ({post?.Post?.stock})
              </div>
            </div>
            
            {/* <Button onClick={() => navigate(`/checkout/${post?.Post?._id}/quantity/${QuantityNumber}/price/${post?.Post?.price}`)} className="bg-blue-400 font-bold text-[20px] w-full my-2">
              Buy now
            </Button> */}
            <Drawer>
              <DrawerTrigger className='bg-gradient-to-r from-[#007EF3] 
                to-[#72A9DC] hover:from-[#3FA2FF] hover:to-[#72A9DC] justify-self-end w-full my-1 h-9 
                text-white p-2 font-bold rounded-lg'>
                  Buy now
                </DrawerTrigger>
              <DrawerContent >
                <div className="min-[1024px]:w-[40%] m-auto">
                  <form onSubmit={customerHandler}>
                    <DrawerHeader>
                      <DrawerTitle>We will deliver the product according this informations !</DrawerTitle>
                      <DrawerDescription>Fill the next form.</DrawerDescription>
                      <div className='grid grid-cols-2 gap-3 p-2'>
                          <div>
                              <Label className='mb-1 font-bold text-left' >Firts Name :</Label>
                              <Input required disabled type="text" value={profile?.profile?.firstName || ""} onChange={(e) => setFirstName(e.target.value)}
                                placeholder='Firts name:'/>
                          </div>
                          <div>
                              <Label className='mb-1 font-bold text-left' >Last Name :</Label>
                              <Input required disabled type="text" value={profile?.profile?.lastName || ""} onChange={(e) => setLastName(e.target.value)} 
                                placeholder='Last name:' />
                          </div>
                      </div>
                      <div className='p-2'>
                          <Label className='mb-1 font-bold text-left' >Phone Number :</Label>
                          <Input required type="number" onChange={(e) => setPhoneNumber(e.target.value)} 
                            placeholder='+1 21...' />
                      </div>
                      <div className='p-2'>
                          <Label className='mb-1 font-bold text-left' >Email :</Label>
                          <Input required type="email" value={profile?.profile?.email || ""} onChange={(e) => setEmail(e.target.value)} 
                            placeholder='example@gmail.com' />
                      </div>
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button type="submit">
                        Submit
                      </Button>
                      <DrawerClose className="w-full bg-gray-300 p-2 rounded font-bold cursor-pointer hover:bg-gray-200">
                        Cancel
                      </DrawerClose>
                    </DrawerFooter>
                  </form>
                </div>
              </DrawerContent>
            </Drawer>
            { 
              profile?.profile?.addToCart && profile?.profile?.addToCart.includes(post?.Post?._id) ? (
                <span>
                  <AlertDialog>
                  {/* <DropdownMenuItem className={`cursor-pointer font-bold w-100`}> */}
                <AlertDialogTrigger className='bg-gradient-to-r from-[#FA1D1D] 
                to-[#FF6464] hover:from-[#FF6464] hover:to-[#72A9DC] justify-self-end w-full my-1 h-9 
                text-white p-2 font-bold rounded-lg flex justify-center gap-2'>
                  <LucideShoppingCart  />
                  Delete from card
                </AlertDialogTrigger>
                  {/* </DropdownMenuItem> */}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-[15px]">
                      This action will permanently delete your
                      product from cart.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600" onClick={() => {
                        try {
                          removeFromCartHandler(id)
                          .then(() => {
                            console.log('product is deleted from cart successfully');
                            // location.assign('/')
                          })
                        } catch (error) {
                          console.error('Error deleting product from cart:', error);
                        }
                      }}>Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
                  {/* <Button onClick={() => removeFromCartHandler(id)} className="bg-red-200 font-bold text-red-800 text-[20px] w-full gap-3 hover:text-white">
                      <LucideShoppingCart  />
                      Delete from card
                    </Button> */}
                </span>
              ) : (
                <span>
                  <AlertDialog>
                  {/* <DropdownMenuItem className={`cursor-pointer font-bold w-100`}> */}
                <AlertDialogTrigger className='bg-gradient-to-r from-[#007EF3] 
                to-[#72A9DC] hover:from-[#3FA2FF] hover:to-[#72A9DC] justify-self-end w-full my-1 h-9 
                text-white p-2 font-bold rounded-lg flex justify-center gap-2'>
                  <LucideShoppingCart  />
                  Add to card
                </AlertDialogTrigger>
                  {/* </DropdownMenuItem> */}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Add to cart</AlertDialogTitle>
                    <AlertDialogDescription className="text-[15px]">
                      Add this product to cart so you can buy it later.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-green-600" onClick={() => {
                        try {
                          addToCartHandler(id)
                          .then(() => {
                            console.log('product is add to cart successfully');
                            // location.assign('/')
                          })
                        } catch (error) {
                          console.error('Error deleting product from cart:', error);
                        }
                      }}>Add
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
                  {/* <Button onClick={() => addToCartHandler(id)} className="bg-blue-200 font-bold text-blue-800 text-[20px] w-full gap-3 hover:text-white">
                    <LucideShoppingCart  />
                    Add to card
                  </Button> */}
                </span>
              )
            }
          </div>
        </div>
      </div>
      <div className='xl:col-span-8 lg:col-span-9 max-md:col-span-12  md:col-span-12h-auto bg-gray-200 p-3 my-3 rounded-lg'>
        <small className='flex font-bold items-end'>date : {formatDistanceToNow(new Date(post?.Post?.createdAt), { addSuffix:true })} </small>
        <h1 className='font-bold text-[20px] mt-3'>Product details</h1>
        <p>
          {post?.Post?.description}
        </p> <br />
      </div>
      <div className='xl:col-span-8 lg:col-span-9 max-md:col-span-12  md:col-span-12 h-auto p-3 my-3 rounded-lg'>
        <h1 className='font-bold text-[20px] mt-3'>{post.Post.ratings[0] ? `Reviews(${post.Post.ratings.length}) :`:"No Reviews yet :"}</h1>
        <div className='flex my-4 items-center gap-3 '>
          { profile.profile ? <Avatar className="m-auto h-[50px] w-[50px] border-4 border-white">
            {profile?.profile?.profilePicture !="img" && profile?.profile?.profilePicture !="undefined"?
            <AvatarImage src={`https://digitalcommerce-backend.onrender.com/uploads/images/${profile?.profile?.profilePicture}`} 
            className="object-cover"/> :
            <AvatarFallback>{MyProfile[0].toUpperCase()}</AvatarFallback>}
          </Avatar> : null
          }
          <div className='w-[95%] relative'>
            
            <AlertDialog>
                  {/* <DropdownMenuItem className={`cursor-pointer font-bold w-100`}> */}
                {!post?.Post.ratings.some(rating => rating.reviewerUsername === profile?.profile?.username) ? (
                  <AlertDialogTrigger className={`rounded flex justify-center py-2 bg-black font-bold 
                    text-[15px] w-[150px] gap-3 text-white`}>
                    Add a Review
                  </AlertDialogTrigger>) : (

                  <AlertDialogTrigger className={`rounded flex justify-center py-2 bg-black font-bold 
                    text-[15px] w-[150px] gap-3 text-white`}>
                    Update the review
                  </AlertDialogTrigger>
                )}
                  {/* </DropdownMenuItem> */}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-1">Your rating matter: {rating} <StarIcon fill="yellow" strokeWidth={"1px"} size={"20px"} /> </AlertDialogTitle>
                    <AlertDialogDescription className="text-[15px]">
                      <span className='flex justify-center gap-3 my-3'>
                        <StarIcon onClick={() => setRating(1)}
                          fill={ rating >= 1 ? 'yellow' : 'white'} stroke='gray' size={"60px"} strokeWidth={"0.2px"}/>
                          
                        <StarIcon onClick={() => setRating(2)}
                          fill={ rating >= 2 ? 'yellow' : 'white'} stroke='gray' size={"60px"} strokeWidth={"0.2px"}/>
                          
                        <StarIcon onClick={() => setRating(3)}
                          fill={ rating >= 3  ? 'yellow' : 'white'} stroke='gray' size={"60px"} strokeWidth={"0.2px"}/>
                          
                        <StarIcon onClick={() => setRating(4)}
                          fill={ rating >= 4 ? 'yellow' : 'white'} stroke='gray' size={"60px"} strokeWidth={"0.2px"}/>
                          
                        <StarIcon onClick={() => setRating(5)}
                          fill={rating >= 5 ? 'yellow' : 'white'} stroke='gray' size={"60px"} strokeWidth={"0.2px"}/>
                      </span>
                      <Textarea rows="1" value={ratingMessage||null} onChange={(e) => setRatingMessage(e.target.value)} placeholder="Your review about the product..." />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="font-bold">Cancel</AlertDialogCancel>
                    {personalRating ? (
                      <div className='flex gap-2'>
                        <AlertDialogAction className="bg-blue-600" onClick={() => updateReviewHandler(post?.Post?._id) }>
                          Update 
                        </AlertDialogAction>
                        <AlertDialogAction className="bg-red-600" onClick={() => deleteReviewHandler(post?.Post?._id) }>
                          Delete 
                        </AlertDialogAction>
                      </div>
                      ): (
                        <AlertDialogAction className="bg-blue-600" onClick={() => addReviewHandler(post?.Post?._id) }>
                        Add 
                      </AlertDialogAction>
                      )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>
        </div>
        <div>
          {
            post?.Post.ratings.map((e) => (
              <div key={e._id} className='flex my-4 items-center gap-3 border-2 border-gray-200 p-3'>
                <Avatar className="m-auto h-[50px] w-[50px] border-4 border-white">
                  {e.reviewerPicture !="img" && e.reviewerPicture !="undefined"?
                  <AvatarImage src={`https://digitalcommerce-backend.onrender.com/uploads/images/${e.reviewerPicture}`} 
                  className="object-cover"/> :
                  <AvatarFallback>{e.reviewerUsername[0].toUpperCase()}</AvatarFallback>}
                </Avatar>
                <div className='w-[95%] '>
                  <span className='font-bold flex gap-2'>
                    @{e.reviewerUsername} 
                    
                  </span>
                  <p className='font-bold'>{e.ratingMessage}</p>
                </div>
                <p className='flex text-[25px] font-bold items-center gap-1 mr-9'> {e.rating} <StarIcon fill="yellow" strokeWidth={"1px"} size={"25px"} /></p>
              </div>

            ))
          }
        </div> <br />
      </div>
    </div>
  )
}

export default PostDetails