import { LucideLoader2, StepBackIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetAllPostsQuery, useGetPostQuery, useUpdatePostMutation } from '../../services/postApi'
import { useGetProfileQuery } from '../../services/profileApi'

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(id);
    const { data: post, isLoading, isError, error, refetch:refetch1} = useGetPostQuery(id);
    let {data:posts,refetch} = useGetAllPostsQuery()

    const [notAllowed,setNotAllowed] = useState(null)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [publice, setPublic] = useState('');
    const [categorie, setCategorie] = useState('');
    const [image, setImage] = useState(null);

    const [updatePost, { isLoading: isUpdating, isError: updateError }] = useUpdatePostMutation();
    let {data:profile} = useGetProfileQuery()


    useEffect(() => {
        if (post?.Post) {
            setTitle(post.Post.title || '');
            setDescription(post.Post.description || '');
            setPrice(post.Post.price || '');
            setStock(post.Post.stock || '');
            setPublic(post.Post.public || '');
            setCategorie(post.Post.categorie || '');
        }
    }, [post]);

    if (isLoading) {
        return (
            <div className='w-[100vw] h-[100vh] flex items-center justify-center '>
                <LucideLoader2 className="animate-spin h-20 w-20 mr-3 ..." viewBox="0 0 24 24" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='border-4 border-red-700 bg-white text-red-800'>
                <strong>{error}</strong>
            </div>
        );
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      };

    const handler = async (e) => {
        e.preventDefault();
        const createdAt = new Date()
        const formData = new FormData(e.currentTarget)
        console.log("image:",image || 'no image')
        formData.append('image', image);
        formData.append('profilePicture', profile?.profile?.profilePicture);
        formData.append('createdAt', createdAt.toLocaleString('en-US', { timeZoneName: 'short' }));
        console.log("formData:", formData.get("image"));
        
        updatePost({id, formData}).then( async (updateResponse)=> {
            console.log("upd Res: ", updateResponse)
            if (updateResponse?.data === "logout" || updateResponse.error?.data?.error === 'not allowed') {
                console.log('Not allowed.');
                setNotAllowed('not allowed');
            } else {
                await refetch1()
                refetch().then(()=> {
                    navigate("/");
                    console.log('Post is updated successfully');
                })
            }
        })
        };

    console.log("pages:",post.price);
        return (
        <div>
            <div className='w-[90vw] h-[100vh] m-auto'>
                <button
                    onClick={() => navigate(-1)}
                    className='cursor-pointer bg-black text-white font-bold p-1 px-2 m-2 rounded flex'
                >
                    <StepBackIcon /> Back
                </button>
                <div className='h-[100%] w-[100%] flex justify-center items-center '>
                    {
                        notAllowed? 
                        <h1 className='font-bold text-[40px]'>This Page is not allowed !!</h1> :
                        <form onSubmit={handler} className='w-[500px] border border-gray-700 rounded border-3 shadow-inner shadow-2xl p-5 grid gap-5'>
                            <h1 className='font-bold text-[25px] text-center my-2'>Update Post</h1>
                            <Input
                                type="text"
                                autoFocus
                                placeholder="title"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <Textarea
                                placeholder="Type your description here."
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                            <Input placeholder="Type your price here." value={price} onChange={(e) => setPrice(e.target.value)}  name="price" />
                            <Input placeholder="Type your stock here." value={stock} onChange={(e) => setStock(e.target.value)}  name="stock" />
                            <Input placeholder="Type your categorie here." value={categorie} onChange={(e) => setCategorie(e.target.value)} required  name="categorie" />
                            <Input placeholder="public or private." value={publice} onChange={(e) => setPublic(e.target.value)} name="public" />
                            <div className='fileUpload_test'>
                                <Input type="file" onChange={handleImageChange} />
                            </div>
                            <Button type='submit' className='font-bold' >UPDATE</Button>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
};

export default Update;
