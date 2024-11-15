import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions'
import { Slider } from '../../components'
import icons from '../../ultils/icons'
import { underMap } from '../../ultils/constant'
import { Map, BoxInfo, RelatedPost } from '../../components'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { path } from '../../ultils/constant'


const { IoLocationOutline, TbReportMoney, RiCrop2Line, TbHash, IoMdTime } = icons

const DetailPost = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)

    useEffect(() => {
        postId && dispatch(getPostsLimit({ id: postId }))
    }, [postId])

    const handleFilterLabel = () => {
        const titleSearch = `Tìm kiếm thông tin theo chuyên mục ${posts[0]?.overviews?.area}`
        navigate({
            pathname: `/${path.SEARCH}`,
            search: createSearchParams({ labelCode: posts[0]?.overviews?.code1 }).toString()
        }, { state: { titleSearch } });
    }




    return (
        <div className='w-full flex gap-4'>
            <div className='w-[70%] '>
                <Slider images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)} />
                <div className='bg-white rounded-md shadow-md p-4'>
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-xl font-bold text-red-600'>{posts[0]?.title}</h2>
                        <div className='flex items-center gap-2'>
                            <span>Chuyên mục: </span>
                            <span onClick={handleFilterLabel}
                                className='text-blue-500 underline font-medium cursor-pointer hover:text-orange-500'>{posts[0]?.overviews?.area}</span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <IoLocationOutline color='blue' />
                            <span>{posts[0]?.address}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='flex items-center gap-2'>
                                <TbReportMoney />
                                <span className='font-semibold text-green-600 text-xl' size='20px'>{posts[0]?.attributes?.price}</span>
                            </span>

                            <span className='flex items-center gap-2'>
                                <RiCrop2Line />
                                <span >{posts[0]?.attributes?.acreage}</span>
                            </span>
                            <span className='flex items-center gap-2'>
                                <IoMdTime />
                                <span >{posts[0]?.attributes?.published}</span>
                            </span>
                            <span className='flex items-center gap-2'>
                                <TbHash />
                                <span >{posts[0]?.attributes?.hashtag}</span>
                            </span>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Thông tin mô tả</h3>
                        <div className='flex flex-col gap-3'>
                            {posts[0]?.description && JSON.parse(posts[0]?.description)?.map((item, index) => {
                                return (
                                    <span key={index}>
                                        {item}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
                        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                            <tbody>
                                <tr className="flex  even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Mã tin</td>
                                    <td className="p-3 w-1/2">{posts[0]?.overviews?.code}</td>
                                </tr>
                                <tr className="flex even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Mã chuyên mục</td>
                                    <td className="p-3 w-1/2">{posts[0]?.overviews?.code1}</td>
                                </tr>
                                <tr className="flex even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Khu vực</td>
                                    <td className="p-3 w-1/2">{posts[0]?.overviews?.area}</td>
                                </tr>
                                <tr className="flex even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Loại tin</td>
                                    <td className="p-3 w-1/2">{posts[0]?.overviews?.type}</td>
                                </tr>
                                <tr className="flex even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Đối tượng</td>
                                    <td className="p-3 w-1/2">{posts[0]?.overviews?.target}</td>
                                </tr>
                                <tr className="flex even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Gói tin</td>
                                    <td className="p-3 w-1/2">{posts[0]?.overviews?.bonus}</td>
                                </tr>
                                <tr className="flex even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Ngày đăng</td>
                                    <td className="p-3 w-1/2">{posts[0]?.overviews?.created}</td>
                                </tr>
                                <tr className="flex even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Ngày hết hạn</td>
                                    <td className="p-3 w-1/2">{posts[0]?.overviews?.expired}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='mt-8'>
                        <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
                        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                            <tbody>
                                <tr className="flex  even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Liên hệ</td>
                                    <td className="p-3 w-1/2">{posts[0]?.user?.name}</td>
                                </tr>
                                <tr className="flex even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Điện thoại</td>
                                    <td className="p-3 w-1/2">{posts[0]?.user?.phone}</td>
                                </tr>
                                <tr className="flex even:bg-gray-200">
                                    <td className="p-3 w-1/2 font-medium">Zalo</td>
                                    <td className="p-3 w-1/2">{posts[0]?.user?.zalo}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    {posts && <div className='mt-8'>
                        <h3 className="font-semibold text-xl my-4">Bản đồ</h3>
                        {/* <Map address={posts[0]?.address} /> */}

                        <span className='text-gray-400 text-sm py-4 text-justify'> {underMap[0]}</span>
                        <span className='text-gray-400 text-sm py-4 text-justify italic'> {`${posts[0]?.title} - Mã tin: ${posts[0]?.attributes?.hashtag}`}</span>
                        <span className='text-gray-400 text-sm py-4 text-justify'> {underMap[1]}</span>

                    </div>}
                </div>
            </div>
            <div className='w-[30%] flex flex-col gap-8'>
                <BoxInfo userData={posts[0]?.user} />
                <RelatedPost />
                <RelatedPost newPost />
            </div>
        </div>
    )
}

export default DetailPost