
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Toaster } from "../ui/toaster"
import { useNavigate, useParams } from 'react-router-dom'
import { Home, LucideLoader2, StepBackIcon } from 'lucide-react'
import { useAddProfileAvatarMutation, useGetProfileQuery, useUpdateProfileMutation } from '../../services/profileApi'
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import { useGetStoreQuery } from "../../services/postApi"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Setting = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [usernameOrg, setUsernameORG] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(null);
    const { toast } = useToast()

    const navigate = useNavigate()
    const [addProfileAvatar, { data: avatar }] = useAddProfileAvatarMutation()
    const [updateProfile, { data: prof }] = useUpdateProfileMutation()
    const [MyProfile, setMyProfile] = useState(null)
    let { data: profile, isLoading, isError, error, refetch } = useGetProfileQuery()
    let { data: storePosts, refetch: refetchStore } = useGetStoreQuery()

    useEffect(() => {
        if (profile && profile !== "logout") {
            setMyProfile(profile.profile.username)
            setUsernameORG(profile?.profile?.username)

            setUsername(profile?.profile?.username)
            setFirstName(profile?.profile?.firstName)
            setLastName(profile?.profile?.lastName)
            setEmail(profile?.profile?.email)
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

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            try {
                const response = await addProfileAvatar(formData);
                console.log('avatar uploaded successfully:', response.data);
                if (response.data.success == true) {
                    refetch()
                    refetchStore()
                }

                // Set the uploaded image path for display
            } catch (error) {
                console.error('Error uploading avatar:', error);
            }
        } else alert('choose the image')
    };

    const handler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const username = formData.get('username')
        const email = formData.get('email')
        try {
            await updateProfile({ usernameOrg, body: { username, firstName, lastName, email } })
                .then((res) => {
                    // if ()
                    console.log('profile is updated successfully')
                    console.log(res)
                }).catch((err) => console.log(err.message))
            await refetch()
            navigate('/')
        } catch (error) {
            console.error('Error in updating profile:', error);
        }
    }

    return (
        <div className='w-[90vw] h-[100vh] m-auto'>
            <div className='flex justify-center mt-9 px-5 w-full h-[70px] bg-gradient-to-r from-[#007EF3] to-[#72A9DC] 
                my-3 min-[1024px]:ml-7 rounded-lg '>

                <img src="../../../public/settings.png" className='mr-5 my-2' alt="" />
                <h1 className='font-bold text-white text-center text-[35px]  flex items-center 
            gap-2 ' >
                    Settings
                </h1>
            </div>
            <div className='h-[100%] w-[100%] flex justify-center items-center '>
                <div className='w-[400px] border border-gray-700 rounded border-3 shadow-inner shadow-2xl relative bottom-[10px] p-5 grid gap-5'>
                    <h1 className='font-bold text-[25px] text-center italic my-2'>UPDATE</h1>
                    <Avatar className="m-auto h-[80px] w-[80px] ">
                        {profile?.profile?.profilePicture != "img" && profile?.profile?.profilePicture != "undefined" ?
                            <AvatarImage src={`http://localhost:4000/uploads/images/${profile?.profile?.profilePicture}`} className="object-cover" /> :
                            <AvatarFallback>Avatar</AvatarFallback>
                            // <AvatarFallback>{MyProfile[0].toUpperCase()}</AvatarFallback>       
                        }
                    </Avatar>
                    <div className='fileUpload_test'>
                        <Input type="file" onChange={handleFileChange} />
                        <Button className='bg-blue-500 hover:bg-blue-400 rounded my-2 p-2 text-white font-bold' onClick={handleUpload}>Upload Avatar</Button>
                    </div>
                    <form onSubmit={handler} className=" grid gap-5">
                        <div className="flex gap-3">
                            <div>
                                <label htmlFor="fname" className="text-[13px] font-bold ">First Name : </label>
                                <Input type="text" required autoFocus placeholder="first name.." id="fname" name="firstName"
                                    onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                            </div>
                            <div>
                                <label htmlFor="lname" className="text-[13px] font-bold ">Last Name : </label>
                                <Input type="text" required autoFocus placeholder="Last name.." id="lname" name="lastName"
                                    onChange={(e) => setLastName(e.target.value)} value={lastName} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="text-[13px] font-bold ">username : </label>
                            <Input type="text" required autoFocus placeholder="username.." id="username" name="username"
                                onChange={(e) => setUsername(e.target.value)} value={username} />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-[13px] font-bold ">email : </label>
                            <Input type="email" required placeholder="Type your email here." name="email"
                                onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <Button type='submit' className='font-bold bg-gradient-to-r from-[#007EF3] to-[#72A9DC] ' >Update</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Setting