import React, { useState } from 'react'
import { InputForm, Button } from '../../components'
import Swal from 'sweetalert2'

const Contact = () => {
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        content: ''
    })

    const handleSubmit = () => {
        Swal.fire(`Cảm ơn ${payload.name ? payload.name : ''}!`, 'Phản hồi của bạn đã được ghi nhận', 'success').then(() => {
            setPayload({
                name: '',
                phone: '',
                content: ''
            })
        })
    }





    return (
        <div className='w-full'>
            <h1 className='text-2xl font-semibold mb-6'>Liên hệ với chúng tôi</h1>
            <div className='flex gap-4 '>
                <div className='flex-1 flex flex-col gap-4 h-fit bg-blue-500 rounded-3xl p-4 text-white bg-gradient-to-br from-cyan-500 to-blue-500'>
                    <h4 className='font-medium'>Thông tin liên hệ</h4>

                    <span>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro123.Com</span>
                    <span>Điện thoại: 0917 686 101</span>
                    <span>Email: cskh.phongtro123@gmail.com</span>
                    <span>Zalo: 0917 686 101</span>
                    <span>Viber: 0917 686 101</span>
                    <span>Địa chỉ: Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí Thọ, Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam.</span>


                </div>
                <div className='flex-1 bg-white shadow-md rounded-xl p-4 mb-6'>
                    <h4 className=' font-semibold text-lg mb-4 '>Liên hệ trực tuyến</h4>
                    <div className='flex flex-col gap-6'>
                        <InputForm value={payload.name} setValue={setPayload} keyPayload='name'
                            label='Họ và tên của bạn'
                        />
                        <InputForm value={payload.phone} setValue={setPayload} keyPayload='phone'
                            label='Số điện thoại'
                        />
                        <div>
                            <label htmlFor='desc'>Nội dung mô tả</label>
                            <textarea value={payload.content} name='content' onChange={e => setPayload(prev => ({ ...prev, content: e.target.value }))}
                                id='desc' cols="30" rows="3" className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full' ></textarea>
                        </div>

                        <Button fullWidth bgColor='bg-blue-500' textColor='text-white' text='Gửi liên hệ' onClick={handleSubmit} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
