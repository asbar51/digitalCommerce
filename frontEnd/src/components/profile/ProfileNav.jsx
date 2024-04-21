import { Home } from 'lucide-react'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ProfileAvatar from './ProfileAvatar'
import { useGetProfileQuery } from '../../services/profileApi'

const ProfileNav = () => {
    const navigate = useNavigate()
    let {data:profile} = useGetProfileQuery()

  return (
    <div className='w-[90%]  m-auto h-[100vh]'>
        
        <div className='p-5 m-auto w-[40%] max-[500px]:w-[100%] '>
            <h1 className='font-bold text-[18px]'>Options:</h1>
            <hr className='my-2'/>
            <div className='flex flex-col gap-3  ml-2'>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/setting')}>Setting</span>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate(`/store/${profile?.profile?.username}`)}>My store</span>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/orders')}>Payments</span>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/cart')}>My cart</span>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/notifications')}>Notifications</span>
                <span className='hover:bg-gray-200 cursor-pointer font-bold rounded-lg pl-3 '
                    onClick={()=> navigate('/profile/logout')}>Logout</span>
            </div>
        </div>
        <div>
        
        </div>
    </div>
  )
}

export default ProfileNav