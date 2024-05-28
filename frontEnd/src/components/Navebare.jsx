import { useEffect, useState } from 'react'

import { Button } from './ui/button'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDeleteProfileMutation, useGetProfileQuery } from '../services/profileApi'
import { BellRing, Coins, DollarSign, DollarSignIcon, Home, ListOrdered, ListOrderedIcon, LogOut, LucideLoader2, Menu, Option, Plus, Search, SettingsIcon, ShoppingCart, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

import { useGetFromCartQuery } from '../services/postApi'

const Navebare = () => {
  const navigate = useNavigate()
  const [titleSearch, setTitleSearch] = useState("")
  const [categorie, setCategorie] = useState()

  let [deleteProfile, { data: profileD }] = useDeleteProfileMutation()

  const [MyProfile, setMyProfile] = useState(null)
  let { data: profile, isLoading, isError, error, refetch } = useGetProfileQuery()
  let { data: cart, refetch: refetchCart } = useGetFromCartQuery()

  useEffect(() => {
    if (profile && profile !== "logout") {
      setMyProfile(profile.profile.username)
      console.log("profile logout : ", profile)
    } else {
      console.log("profile: ", profile)
      setMyProfile(null)
    }
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

  // const getCategorie = async (event) => {
  //   //
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the 'navigate' function to redirect to the desired route
    navigate(`/search/${titleSearch}/categorie/all/minPrice/1/maxPrice/399`);
  };

  const logout = async (event) => {
    event.preventDefault()
    try {
      deleteProfile(MyProfile).then(async (res) => {
        console.log('Logout successfully');
        console.log('respond: ', res);
        await refetchCart();
        refetch().then(() => {
          navigate('/')
          console.log("profiiiile: ", profile);
        })

      })
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  return (
    <div className='relative'>
      <div className='w-[100%] h-[50px] bg-white flex justify-between px-5 items-center border-b-2'>
        <div className='w-[100%] flex max-lg:justify-between items-center'>
          <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-[#007EF3] to-[#7FC1FF] font-bold text-[35px] mr-20 cursor-pointer' onClick={() => navigate('/')}>Streamara</h1>
          <form className='relative flex h-[35px] max-lg:hidden lg:w-[400px] xl:w-[600px] ' onSubmit={handleSubmit}>
            <input
              type='search'
              placeholder='Find digital Products...'
              name="search"
              required
              className='w-full border-2 p-2 outline-none pr-[55px] rounded-none'

              onChange={(e) => setTitleSearch(e.target.value)}
            />
            <Button className="bg-[#448ACC] hover:bg-[#6CB8FF] rounded-none absolute  right-0 h-[35px] w-[50px]">
              <Search stroke='white' strokeWidth={"4"} />
            </Button>
          </form>
        </div>
        <div className='flex gap-5'>
          <Sheet>
            <SheetTrigger>
              <Search className='min-[1024px]:hidden' stroke='black' />
            </SheetTrigger>
            <SheetContent side={"top"}>
              <SheetHeader>
                <SheetTitle>Search</SheetTitle>
                <form className='relative flex h-30px w-full mt-5 ' onSubmit={handleSubmit}>
                  <input
                    type='search'
                    placeholder='Find digital Products...'
                    name="search"
                    required
                    className='w-full border-2 p-2 outline-none pr-[55px] rounded-none'

                    onChange={(e) => setTitleSearch(e.target.value)}
                  />
                  <Button className="bg-[#448ACC] hover:bg-[#6CB8FF] rounded-none absolute  right-0 h-[42px] w-[50px]">
                    <Search stroke='white' strokeWidth={"4"} />
                  </Button>
                </form>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <div className='flex items-center mr-4 max-lg:hidden gap-9'>
            <span className='cursor-pointer text-[#448ACC] font-bold' onClick={() => navigate("/profile/orders")}>Payments </span>
            <ShoppingCart onClick={() => navigate('/profile/cart')} className='cursor-pointer' fill='#448ACC' stroke='#448ACC' />
            <Button onClick={() => navigate(`/create`)} className='bg-gradient-to-r from-[#007EF3] 
                to-[#72A9DC] hover:from-[#3FA2FF] hover:to-[#72A9DC]  justify-self-end w-[70px] h-9 
                text-white p-2 font-bold'><Plus className='m-1' fill="white" stroke="white" strokeWidth="3" />
              Add
            </Button>
            {/* <p onClick={() => navigate('/profile/orders')} className='cursor-pointer font-bold text-[#448ACC] hover:text-[#6CB8FF]'>Orders</p> */}
          </div>

          {
            MyProfile ?
              <div className=''>
                {/* <h1 className='font-bold'></h1>  */}
                <DropdownMenu >
                  <DropdownMenuTrigger className="w-[30px] h-[30px] rounded-full cursor-pointer bg-white 
                flex items-center justify-center font-bold">
                    <Avatar>
                      {profile?.profile?.profilePicture != "img" && profile?.profile?.profilePicture != "undefined" ?
                        <AvatarImage src={`http://localhost:4000/uploads/images/${profile?.profile?.profilePicture}`} className="object-cover" /> :
                        <AvatarFallback>{MyProfile[0].toUpperCase()}</AvatarFallback>}
                    </Avatar>

                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-3 bg-white">
                    {
                      profile?.profile?.role == "instructor" ?
                        <DropdownMenuItem className={`font-bold w-100`}>
                          <Link to={`/store/${profile?.profile?.username}`} className={`flex font-bold w-100`}>
                            <User className="mr-2 h-4 w-4" />
                            My store
                          </Link>
                        </DropdownMenuItem> :
                        <DropdownMenuItem className={`font-bold w-100`}>
                          <Coins className="mr-2 h-4 w-4" />
                          Become a seller
                        </DropdownMenuItem>
                    }
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <Link to={'/profile'} className={`flex font-bold w-100`}>
                        <ListOrderedIcon className="mr-2 h-4 w-4" />
                        Options
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={'/profile/setting'} className={`flex font-bold w-100`}>
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={'/profile/cart'} className={`flex font-bold w-100`}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        My cart
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={'/profile/orders'} className={`flex font-bold w-100`}>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Payments
                      </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                  <Link to={'/profile/notifications'} className={`flex font-bold w-100`}>
                    <BellRing className="mr-2 h-4 w-4" />
                    Notifications
                  </Link>
                </DropdownMenuItem> */}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem variant="outline" onClick={logout} className={`cursor-pointer font-bold w-100`}>
                      <LogOut className="mr-2 h-4 w-4" />
                      logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              :
              <div>
                {/* <Button onClick={() => navigate('/login')} variant="outline" className='max-lg:hidden text-[15px] font-bold h-8 mr-2'>
                  Login</Button> */}
                <Button onClick={() => navigate('/sign_up')} variant="outline"
                  className='text-[18px] font-bold '>Join</Button>
              </div>
          }
        </div>
      </div>
      <div className='flex w-full '>
        <span className='text-[17px] hover:border-blue-400 border-b-4 py-1 w-[25%] text-center 
        cursor-pointer' onClick={() => {
            navigate("/categorie/website/page/1")
          }}>Websites</span>
        <span className='text-[17px] hover:border-blue-400 border-b-4 py-1 w-[30%] text-center 
        cursor-pointer' onClick={() => {
            navigate("/categorie/course/page/1")
          }}>Courses</span>
        <span className='text-[17px] hover:border-blue-400 border-b-4 py-1 w-[30%] text-center 
        cursor-pointer' onClick={() => {
            navigate("/categorie/book/page/1")
          }}>Books</span>
        <span className='text-[17px] hover:border-blue-400 border-b-4 py-1 w-[30%] text-center 
        cursor-pointer' onClick={() => {
            navigate("/categorie/software/page/1")
          }}>Softwares</span>

      </div>
      <Outlet />
      <div className='grid  max-lg:grid-cols-4 min-[1024px]:rounded-lg min-[1024px]:grid-rows-4 min-[1024px]:w-[40px] 
        min-[1024px]:h-[450px] justify-center p-2 bg-white max-lg:h-[50px]
        max-lg:w-full fixed max-lg:bottom-[-1px] max-lg:p-3 max-lg:pb-10 left-0 max-lg:right-0 min-[1024px]:top-[20%] min-[1024px]:ml-2'>

        <div className='w-full flex justify-center'>
          <Home strokeWidth={'1.5px'} onClick={() => navigate("/")} className="mr-2 h-8 w-6 cursor-pointer" />
        </div>
        <div className='w-full flex justify-center'>
          <ShoppingCart strokeWidth={'1.5px'} onClick={() => navigate("/profile/cart")} className="mr-2 h-8 w-6 cursor-pointer" />
        </div>
        <div className='w-full flex justify-center'>
          <DollarSign strokeWidth={'1.5px'} onClick={() => navigate("/profile/orders")} className="mr-2 h-8 w-6 cursor-pointer" />
        </div>
        <div className='w-full flex justify-center'>
          <SettingsIcon strokeWidth={'1.5px'} onClick={() => navigate("/profile/setting")} className="mr-2 h-8 w-6 cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Navebare