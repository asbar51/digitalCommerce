import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"


const ProfileAvatar = ({MyProfile,avatar}) => {
  return (
    <div className='h-[100px] rounded-lg bg-blue-500 flex justify-center'>
        <Avatar>
            <AvatarImage src={`https://digitalcommerce-backend.onrender.com/uploads/images/${avatar}`} />
            <AvatarFallback>{MyProfile}</AvatarFallback>
        </Avatar>
    </div>
  )
}

export default ProfileAvatar