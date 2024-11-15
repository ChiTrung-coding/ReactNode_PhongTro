import React, { memo, useState } from 'react'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'
import { path } from '../ultils/constant'



const { FaStar, GoHeartFill, GoHeart, BsFillBookmarkStarFill } = icons


const Item = ({ images, user, title, star, description, attributes, address, id }) => {
    const [isHoverHeart, setIsHoverHeart] = useState(false)

    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<FaStar className='star-item' size={18} color='yellow' />)
        return stars

    }
    return (
        <div className='w-full flex border-t border-orange-300 py-4'>
            <Link to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`}
                className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'
            >
                {images.length > 0 && images.filter((i, index) => [...Array(4).keys()].some(i => i === index))?.map((i, index) => {
                    return (
                        <img key={index} src={i} alt="preview" className='w-[47%] h-[120px] object-cover' />
                    )
                })}
                <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4'>{`${images.length} ảnh`}</span>
                <span
                    className='text-white absolute right-5 bottom-1'
                    onMouseEnter={() => setIsHoverHeart(true)}
                    onMouseLeave={() => setIsHoverHeart(false)}
                >
                    {isHoverHeart ? <GoHeartFill size={26} color='red' /> : <GoHeart size={26} />}
                </span>
            </Link>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <Link to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`} className='text-red-600 font-medium'>
                        {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}
                        {title}
                    </Link>
                    <div className='w-[10%] flex justify-end'>
                        <BsFillBookmarkStarFill size={24} color='orange' />
                    </div>
                </div>
                <div className='my-2 flex items-center justify-between gap-2'>
                    <span className='font-bold flex-3 text-green-500 whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.price}</span>
                    <span className='flex-1'>{attributes?.acreage}</span>
                    <span className='flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>{`${address.split(',')[address.split(',').length - 2]}${address.split(',')[address.split(',').length - 1]}`}</span>
                </div>
                <p className='text-gray-500 w-full h-[50px] whitespace-nowrap text-ellipsis overflow-hidden'>
                    {description}
                </p>
                <div className='flex items-center my-3 justify-between'>
                    <div className='flex items-center'>
                        <img src='https://cdn0.iconfinder.com/data/icons/unigrid-flat-human-vol-2/90/011_101_anonymous_anonym_hacker_vendetta_user_human_avatar-1024.png' alt='avatar' className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <a href='tel:0327669552' target='_blank' className='bg-blue-700 text-white pd-1 px-2 rounded-md'>{`Gọi ${user?.phone}`}</a>
                        <a href={`https://zalo.me/${user?.zalo}`} target='_blank'
                            className=' text-blue-700 pd-1 px-2 rounded-md border border-blue-700' >Nhắn Zalo</a>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)
