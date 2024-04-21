
import { Button } from "../ui/button"
import {Input} from "../ui/input"
import { useNavigate, useParams } from 'react-router-dom'
import { StepBackIcon } from 'lucide-react'
import { useAddProfileMutation, useGetProfileQuery } from '../../services/profileApi'

const SignUp = () => {
    const navigate = useNavigate()
    const [addProfile,{data:post}] = useAddProfileMutation()
    // let {data:posts,refetch} = useGetProfileQuery()


    const handler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')
        const createdAt = new Date()
        try {
            await addProfile({
                firstName,
                lastName,
                username,
                email,
                password,
                createdAt:createdAt.toLocaleString('en-US', { timeZoneName: 'short' })
            }).then((res) => {
                console.log(res)
            }).catch((err) => console.log(err.message))
            console.log('profile is created successfully')
            // await refetch()
            navigate('/login')
        } catch (error) {
            console.error('Error deleting profile:', error);
        }}

  return (
    <div className='w-[90vw] h-[100vh] m-auto'>
            
        <div className='h-[100%] w-[100%] flex justify-center items-center relative bottom-[20px] '>
            <form onSubmit={handler} className='w-[350px] border border-gray-700 rounded border-3 shadow-inner shadow-2xl p-5 grid gap-5'>
                <h1 className='font-bold text-[25px] text-center my-2'>Sign up</h1>
                <div className="flex gap-3">
                    <div>
                        <label htmlFor="fname" className="text-[13px] font-bold ">First Name : </label>
                        <Input type="text" required autoFocus placeholder="first name.." id="fname" name="firstName" />
                    </div>
                    <div>
                        <label htmlFor="lname" className="text-[13px] font-bold ">Last Name : </label>
                        <Input type="text" required autoFocus placeholder="Last name.." id="lname" name="lastName" />
                    </div>
                </div>
                <div>
                    <label htmlFor="username" className="text-[13px] font-bold ">username : </label>
                    <Input type="text" required autoFocus placeholder="username.." id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="email" className="text-[13px] font-bold ">email : </label>
                    <Input type="email" required placeholder="Type your email here."  name="email" />
                </div>
                <div>
                    <label htmlFor="password" className="text-[13px] font-bold ">password : </label>
                    <Input type="password" required  placeholder="Type a strong password here."  name="password" />
                </div>
                <Button type='submit' className='font-bold bg-gradient-to-r from-[#007EF3] to-[#72A9DC] ' >Sign up</Button>
                <small>
                    if you already have an account? 
                    <span className="p-2 ml-2 text-[17px] bg-none hover:underline font-bold cursor-pointer " onClick={() => navigate('/login')} >
                        Login
                    </span>
                </small>
            </form>
        </div>
    </div>
  )
}

export default SignUp