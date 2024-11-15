import React, { memo } from 'react'
import anonAvatar from '../assets/anon-avatar.png'
import icons from '../ultils/icons'
import Button from './Button'


const { GoDotFill, FaPhoneAlt, SiZalo } = icons
const BoxInfo = ({ userData }) => {
    return (
        <div className='w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4'>
            <img src={anonAvatar} alt='avatar' className='w-16 h-16 object-contain rounded-full' />
            <h3 className='font-medium text-xl'>{userData?.name}</h3>
            <span className='flex items-center gap-3'>
                <GoDotFill color='green' size={20} />
                <span>Đang hoạt động</span>
            </span>

            <a className=' bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold' target='_blank' href={`tel:${userData?.phone}`} >
                <FaPhoneAlt />{userData?.phone}</a>

            <a className='bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md text-blue-600' target='_blank' href={`https://zalo.me/${userData?.zalo}`} >
                <SiZalo color='blue' size={33} /></a>

            <a href="tel:+05890000111">0-589-0000111</a>
        </div>
    )
}

export default memo(BoxInfo)
