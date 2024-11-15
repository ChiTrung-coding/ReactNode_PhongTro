import React, { memo, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { IoLocationSharp } from "react-icons/io5";


const Position = ({ icon }) => <div>{icon}</div>;

const Map = ({ address }) => {

    const [coords, setCoords] = useState(null);

    useEffect(() => {
        // lấy vị trí hiện tại
        // navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        //     setCoords({ lat: latitude, lng: longitude });
        // });

        // lấy vị trí bài đăng
        const getCoords = async () => {
            const result = await geocodeByAddress(address);
            const lnglat = await getLatLng(result[0]);
            setCoords(lnglat)
        }
        if (address) {
            getCoords()
        } else {
            navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                setCoords({ lat: latitude, lng: longitude });
            })
        }
    }, [address])


    return (
        <div>
            <div className='h-[300px] w-full relative'>
                {address && <div className='absolute top-[8px] left-[8px] z-50 max-w-max rounded-md bg-white shadow-md p-4 text-xs'>
                    {address}
                </div>}


                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                    defaultCenter={coords}
                    center={coords}
                    defaultZoom={11}
                >
                    <Position
                        lat={coords?.lat}
                        lng={coords?.lng}
                        icon={<IoLocationSharp color='red' size={24} />}

                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}

export default memo(Map)
