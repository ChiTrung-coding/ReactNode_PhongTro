import React, { memo } from 'react'
import Slider from "react-slick";


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const SliderCustom = ({ images }) => {
    //  console.log(images)

    return (
        <div className='w-full'>
            <Slider {...settings}>
                {images?.length > 0 && images?.map((item, index) => {
                    return (
                        <div key={index} className='bg-black flex justify-center h-[320px] px-12'>
                            <img className='h-full object-contain m-auto '
                                src={item}
                                alt='Slider' />
                        </div>
                    )
                }
                )}
            </Slider>
        </div>
    )
}

export default memo(SliderCustom)
