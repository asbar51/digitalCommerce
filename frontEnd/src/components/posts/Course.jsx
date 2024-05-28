import { Link, useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
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
import { DollarSign, Heart, Settings, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useAddToCartMutation, useDeletePostMutation, useGetAllPostsQuery, useGetFromCartQuery, useRemoveFromCartMutation } from "../../services/postApi";
import { useGetProfileQuery } from "../../services/profileApi";


const Course = ({ inCart, thumbnail, title, createdAt, price, ratings, id, profileUsername, instructor,
  sellerAvatar, refetchPost }) => {
  const navigate = useNavigate()

  const [deletePost, { isLoading: isLoadingD, isError: isErrorD, error: errorD }] = useDeletePostMutation()
  let { data: profile, isLoading, isError, error, refetch: refetchProfile } = useGetProfileQuery()
  const [addToCart, { data: cartAdded }] = useAddToCartMutation()
  const [removeFromCart, { data: cartRemoved }] = useRemoveFromCartMutation()
  let { data: cart, isLoading: isLoadingCart, refetch: refetchCart } = useGetFromCartQuery()



  const date = new Date(createdAt)
  const formattedDate = formatDistanceToNow(date, { addSuffix: true })

  const addToCartHandler = async (id) => {
    console.log("add:", id);
    await addToCart(id).then(async (resp) => {
      console.log(resp)
      await refetchCart()
      await refetchProfile()
    })
  }
  const removeFromCartHandler = async (id) => {
    console.log("remove:", id);
    await removeFromCart(id).then(async (resp) => {
      console.log(resp)
      await refetchCart()
      await refetchProfile()
    })
  }

  const handleDelete = async (id) => {
    try {
      await deletePost(id).then(async (resp) => {
        await refetchPost()
        console.log('Post deleted successfully : ', resp);
      }).catch((err) => {
        console.log("Post is not deleted, error : ", err);
      })

    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  // console.log("_____________");
  // console.log("inCart: ", inCart)
  // console.log("id: ", id)
  // console.log("profileUsername: ", sellerAvatar)
  return (
    <div>
      <Card className="relative max-sm:w-full   m-auto border-solid border-1 border-gray-600 rounded 
      shadow-lg shadow-gray-500/50 sm:max-w-[500px] md:max-w-[400px] ">
        {instructor != profileUsername ? (
          inCart && inCart.includes(id) ? (
            <span>
              <ShoppingCart
                onClick={() => removeFromCartHandler(id)}
                className="absolute top-2 right-2 bg-red-600 p-[3px] w-9 rounded cursor-pointer"
                fill="white"
                stroke="white"
              />
            </span>
          ) : (
            <span>
              <ShoppingCart
                onClick={() => addToCartHandler(id)}
                className="absolute top-2 right-2 bg-blue-400 p-[3px] w-9 rounded cursor-pointer"
                fill="white"
                stroke="white"
              />
            </span>
          )) : null
        }

        {
          (thumbnail ?
            <img src={`http://localhost:5000/uploads/images/${thumbnail}`} onClick={() => navigate(`/posts/${id}`)}
              className="w-full max-sm:max-h-[300px]  sm:h-[350px] md:max-h-[230px] xl:max-h-[190px] rounded-lg cursor-pointer object-fill" />
            : null)
        }
        <CardHeader className="h-auto p-1">
          <CardDescription className='flex justify-between  text-[15px] font-bold'>
            <span className="flex items-center gap-1">
              {/* <Avatar className="h-[25px] w-[25px]">
                <AvatarImage src={`http://localhost:3000/uploads/images/${profile.profile.profilePicture}`} />
                <AvatarFallback>{instructor[0].toUpperCase()}</AvatarFallback>
              </Avatar> */}
              <span className="hover:underline cursor-pointer"
                onClick={() => navigate(`/store/${instructor}`)}>
                <span className='flex items-center ml-3'>
                  <Avatar>

                    <AvatarImage src={`http://localhost:4000/uploads/images/${sellerAvatar}`} />
                    {/* <AvatarFallback>{post.instructor[0].toUpperCase()}</AvatarFallback> */}
                  </Avatar>
                  <span className='font-bold p-3'>{instructor}</span>
                </span>
              </span>
            </span>
            <span className='flex items-center text-black'> 5.0 <Star className="h-5" fill='black' strokeWidth={0} /> ({ratings?.length})</span>
          </CardDescription>
          <CardTitle onClick={() => navigate(`/posts/${id}`)} className='cursor-pointer text-[18px] h-[50px] hover:underline'>{title}</CardTitle>
          <CardDescription onClick={() => navigate(`/posts/${id}`)} className='cursor-pointer flex items-center text-[20px] font-bold'>
            <Button className="bg-[#007EF3] text-[17px] font-bold p-2">
              From {price}
              <DollarSign className='font-bold h-[15px]' strokeWidth={3} />
            </Button>
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-between items-center h-5 px-1 mt-3 text-[13px]">
          {/* <span>{formattedDate}</span> */}
          <span>{formattedDate}</span>
          {
            profileUsername == instructor ?
              <span>
                <DropdownMenu >
                  <DropdownMenuTrigger className="bg-white font-bold text-[15px] rounded-full px-1 py-1 
          cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-3 bg-white">
                    <DropdownMenuItem className={`text-[16px] hover:bg-gray-300 cursor-pointer font-bold flex justify-center w-full`} onClick={() => navigate(`/update/${id}`)}>
                      {/* <Link to={`/update/${id}`} > */}
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      {/* <DropdownMenuItem className={`cursor-pointer font-bold w-100`}> */}
                      <AlertDialogTrigger className={`text-[16px] hover:bg-gray-300 cursor-pointer font-bold w-full`}>
                        Delete
                      </AlertDialogTrigger>
                      {/* </DropdownMenuItem> */}
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription className="text-[15px]">
                            This action will permanently delete your
                            post and remove it from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600" onClick={() => {
                            try {
                              handleDelete(id)
                                .then(() => {
                                  console.log('Post is deleted successfully');
                                  // location.assign('/')
                                })
                            } catch (error) {
                              console.error('Error deleting post:', error);
                            }
                          }}>Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </DropdownMenuContent>
                </DropdownMenu>

              </span>
              : null
          }
        </CardFooter>

      </Card>

    </div>
  )
}

export default Course