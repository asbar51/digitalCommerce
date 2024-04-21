
import { Button } from "../ui/button"
import {Input} from "../ui/input"
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, StepBackIcon } from 'lucide-react'
import { useGetProfileQuery, useLoginProfileMutation } from '../../services/profileApi'
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { useEffect, useState } from "react"
import { useGetFromCartQuery } from "../../services/postApi"
import Swal from "sweetalert2"


const Login = () => {
    const navigate = useNavigate()
    const [loginProfile,{data:post}] = useLoginProfileMutation()
    let {data:posts,refetch} = useGetProfileQuery()
    let {data:cart,refetch:refetchCart} = useGetFromCartQuery()


    const [error, setError] = useState(null);
    const [errorMesg, setErrorMsg] = useState(null);

    const handler = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
    
        try {
            const res = await loginProfile({ username, password });
            switch (res.error?.data?.error) {
                case 'Username Not Found':
                    console.log('Username not found.');
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Username Incorrect!"
                      });
                    break;
                case 'password incorrect':
                    console.log('Password Incorrect.');
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Password Incorrect!"
                      });
                    break;
                default:
                    console.log('Login successful');
                    console.log('Response:', res);
                    // await refetchCart()
                    location.assign('/')
                    
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setError(null);
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, [error]);

  return (
    <div className='w-[90vw] h-[100vh] m-auto'>   
        <div className='h-[100%] w-[100%] flex justify-center items-center relative bottom-[100px]'>
            <form onSubmit={handler} className='w-[300px] border border-gray-700 rounded border-3 shadow-inner shadow-2xl p-5 grid gap-5'>
                <h1 className='font-bold text-[25px] text-center my-2'>Login</h1>
                <Input type="text" required autoFocus placeholder="username" name="username" />
                <Input type="password" required  placeholder="Type a strong password here."  name="password" />
                <Button type='submit' className='font-bold bg-gradient-to-r from-[#007EF3] to-[#72A9DC] ' >Login</Button>
                <small>
                    if you don't have an account? 
                    <span className="p-2 ml-2 text-[17px] bg-none hover:underline 
                        font-bold cursor-pointer" onClick={() => navigate('/sign_up')} >
                        Sign up
                    </span>
                </small>
            </form>
        </div>
    </div>
  )
}

export default Login
