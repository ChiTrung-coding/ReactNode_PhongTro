import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import moment from 'moment'
import { Button, UpdatePost } from '../../components'
import { apiDeletePost } from '../../services'
import Swal from 'sweetalert2'




const ManagePost = () => {
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const { postOfCurrent, dateEdit } = useSelector(state => state.post)
    const [updateData, setUpdateData] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        !dateEdit && dispatch(actions.getPostsLimitAdmin())
    }, [dateEdit, updateData])

    useEffect(() => {
        !dateEdit && setIsEdit(false)
    }, [dateEdit])

    useEffect(() => {
        setPosts(postOfCurrent)
    }, [postOfCurrent])


    const checkStatus = (dateString) => moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(new Date().toDateString())

    const handleDeletePost = async (postId) => {
        try {
            const response = await apiDeletePost(postId)

            if (response && response.data && response.data.err === 0) {
                setUpdateData(prev => !prev)
                Swal.fire('Thành công', 'Xóa bài đăng thành công!', 'success')
            } else {
                throw new Error(response?.data?.msg || 'Xóa bài đăng thất bại')
            }
        } catch (error) {
            console.error('Error deleting post:', error)
            Swal.fire('Oops!', error.message || 'Xóa bài đăng thất bại!', 'error')
        }
    }

    const handleFilterByStatus = (statusCode) => {

        if (statusCode === 1) {
            const activePost = postOfCurrent?.filter(item => checkStatus(item?.overviews?.expired?.split(' ')[3]))
            setPosts(activePost)
        } else if (statusCode === 2) {
            const expirePost = postOfCurrent?.filter(item => !checkStatus(item?.overviews?.expired?.split(' ')[3]))
            setPosts(expirePost)
        } else {
            setPosts(postOfCurrent)
        }
    }

    return (
        <div className='flex flex-col gap-6 '>
            <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
                <h1 className='text-3xl font-medium '>Quản lý tin đăng</h1>
                <select onChange={e => handleFilterByStatus(+e.target.value)} className='outline-none border p-2 border-gray-200 rounded-md'>
                    <option value="0">Lọc theo trạng thái</option>
                    <option value="1">Đang hoạt động</option>
                    <option value="2">Đã hết hạn</option>
                </select>
            </div>
            <table className="w-full table-auto">
                <thead >
                    <tr className='flex w-full bg-secondary1 text-white' >
                        <th className='border flex-1 p-2'>Mã tin</th>
                        <th className='border flex-1 p-2'>Ảnh đại diện</th>
                        <th className='border flex-1 p-2'>Tiêu đề</th>
                        <th className='border flex-1 p-2'>Giá</th>
                        <th className='border flex-1 p-2'>Ngày bắt đầu</th>
                        <th className='border flex-1 p-2'>Ngày hết hạn</th>
                        <th className='border flex-1 p-2'>Trạng thái</th>
                        <th className='border flex-1 p-2'>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {!posts
                        ? <tr>
                            <td>dfsdfs</td>
                        </tr>
                        : posts?.map(item => {
                            return (
                                <tr className='flex h-16  items-center' key={item.id}>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center '>{item?.overviews?.code}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center  '>
                                        <img src={JSON.parse(item?.images?.image)[0] || ''} alt='Ảnh của bài Post' className='w-10 h-10 object-cover rounded-md' />
                                    </td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center '>{`${item?.title?.slice(0, 30)}...`}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center '>{item?.attributes?.price}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center '>{item?.overviews?.created}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center '>{item?.overviews?.expired}</td>
                                    <td className='border px-2 flex-1 h-full flex items-center justify-center '>
                                        {checkStatus(item?.overviews?.expired?.split(' ')[3]) ? 'Đang hoạt động' : 'Đã hết hạn'}
                                    </td>
                                    <td className='border px-2 flex-1 h-full items-center flex justify-center gap-4 '>
                                        <Button
                                            onClick={() => {
                                                dispatch(actions.editData(item))
                                                setIsEdit(true)
                                            }}
                                            text='Sửa'
                                            bgColor='bg-green-500 text-white' />
                                        <Button
                                            onClick={() => handleDeletePost(item.id)}
                                            text='Xóa'
                                            bgColor='bg-red-500 text-white' />
                                    </td>
                                </tr>
                            )
                        })}

                </tbody>
            </table>
            {isEdit && <UpdatePost setIsEdit={setIsEdit} />}

        </div>
    )
}

export default ManagePost
