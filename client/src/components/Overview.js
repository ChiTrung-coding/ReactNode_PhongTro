import React from 'react'
import { Select, InputReadOnly, InputFormV2 } from './'
import { useSelector } from 'react-redux'


const targets = [
    { code: 'Nam', value: 'Nam' },
    { code: 'Nữ', value: 'Nữ' },
    { code: 'Tất cả', value: 'Tất cả' },
]

const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {



    const { categories } = useSelector(state => state.app)
    const { currentData } = useSelector(state => state.user)
    const { dataEdit } = useSelector(state => state.post)


    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
            <div className='w-full flex flex-col gap-4'>
                <div className='w-1/2'>
                    <Select
                        value={payload.categoryCode}
                        setValue={setPayload}
                        name='categoryCode'
                        options={categories}
                        label='Loại chuyên mục'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />

                </div>
                <InputFormV2
                    value={payload.title}
                    setValue={setPayload}
                    name='title'
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    label='Tiêu đề'
                />

                <div className='flex flex-col gap-2'>
                    <label htmlFor="desc">Nội dung mô tả</label>
                    <textarea
                        id="desc"
                        cols="30" rows="10"
                        className='w-full rounded-md outline-none border border-gray-300 p-2'
                        value={payload.description}
                        onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
                        onFocus={() => setInvalidFields([])}
                    ></textarea>
                    <small className='text-red-500'>
                        {invalidFields?.some(item => item.name === 'description') && invalidFields?.find(item => item.name === 'description')?.message}
                    </small>
                </div >

                <div className='w-1/2 flex flex-col gap-4'>
                    <InputReadOnly label='Thông tin liên hệ' value={currentData?.name || currentData?.username} />
                    <InputReadOnly label='Điện thoại' value={currentData?.phone} />
                    <InputFormV2
                        value={payload.priceNumber}
                        setValue={setPayload}
                        small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'
                        label='Giá cho thuê'
                        unit='đồng'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        name='priceNumber'
                    />
                    <InputFormV2
                        value={payload.areaNumber}
                        setValue={setPayload}
                        name='areaNumber'
                        label='Diện tích'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        unit='m2'
                    />
                    <Select
                        value={payload.target}
                        setValue={setPayload}
                        name='target'
                        options={targets}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        label='Đối tượng cho thuê'
                    />
                </div>

            </div>
        </div>
    )
}

export default Overview
