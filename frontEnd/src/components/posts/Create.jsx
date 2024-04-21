import React, { useEffect, useState } from 'react'
import { Button } from "../ui/button"
import {Input} from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useNavigate, useParams } from 'react-router-dom'
import { StepBackIcon } from 'lucide-react'
import { postApi, useAddPostMutation, useGetAllPostsQuery } from '../../services/postApi'
import { useDispatch } from 'react-redux'
import { useGetProfileQuery } from '../../services/profileApi'

const Create = () => {
    const navigate = useNavigate()
    const [addPost,{data:post, isLoading,isError,error}] = useAddPostMutation()
    let {data:posts,refetch} = useGetAllPostsQuery()
    

    const [MyProfile,setMyProfile] = useState(null)
    let {data:profile} = useGetProfileQuery()

    const [image, setImage] = useState(null);
    
    useEffect(() => {
        if (profile !== "logout" ) {
            if (profile?.profile.role == "instructor") setMyProfile(profile.profile.username)
            console.log('there is profile ')
            console.log("role is : ",profile?.profile.role)
        } else console.log('there is no profile ')

    }, [profile])

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      };
    
    
    const handler = async (e) => {
        e.preventDefault()
        
        const createdAt = new Date()
        const formData = new FormData(e.currentTarget)
        console.log("image:",image)
        formData.append('image', image);
        formData.append('profilePicture', profile?.profile?.profilePicture);
        formData.append('createdAt', createdAt.toLocaleString('en-US', { timeZoneName: 'short' }));
        try {
            await addPost(formData)
            console.log('image is uploaded successfully')
            refetch().then((res)=> {
                navigate('/')
                console.log(res)
            })
            
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

  return (
    <div className='w-[90vw] h-[100vh] m-auto'>
            <button onClick={() => navigate(`/`)} className='cursor-pointer bg-black 
            text-white font-bold p-1 px-2 m-2 rounded flex'>
                <StepBackIcon /> Back
            </button>
        <div className='h-[100%] w-[100%] flex justify-center items-center '>
            {
                MyProfile? 
                <div>
                <form onSubmit={handler}  className='w-[500px] border border-gray-700 rounded border-3 shadow-inner shadow-2xl p-5 grid gap-5'>
                    <h1 className='font-bold text-[25px] text-center my-2'>create Post</h1>
                    <Input type="text" autoFocus required placeholder="title" name="title" />
                    <Textarea placeholder="Type your description here." required  name="description" />
                    <Input placeholder="Type your price here." required  name="price" />
                    <Input placeholder="Type your stock here." required  name="stock" />
                    <Input placeholder="Type your categorie here." required  name="categorie" />
                    <Input placeholder="public or private." required  name="public" />
                    <div className='fileUpload_test'>
                        <Input type="file" required onChange={handleImageChange} />
                    </div>
                    <Button type='submit' className='font-bold' >Upload</Button>
                </form>
                </div>  : <h1 className='font-bold text-[40px]'>This Page is allowed for creators only!!</h1>
            }
        </div>
    </div>
  )
}

export default Create