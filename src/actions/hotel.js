import axios from "axios"

export const createHotel= async (token,data) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-hotel`,
        data,
        {
            headers : {
                Authorization :   `Bearer ${token}`
            }
        }
    );
}

export const allHotels = async (token) => 
    await axios.get(`${process.env.REACT_APP_API}/hotels`);

export const diffDays= (from,to) => {
    const day= 24*60*60*1000; // in ms
    const start=new Date(from);
    const end=new Date(to);
    const difference=Math.round(Math.abs( (start-end)/day ));
    return difference;
}

export const loadSellerHotels= async (token) => 
    await axios.get(`${process.env.REACT_APP_API}/seller-hotels`,
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
    )

export const deleteHotel = async (token,hotelId) => {
    return await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
}

export const readHotel= async (hotelId) => {
    return await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);
}

export const updateHotel=async (token,hotelData,hotelId) => {
    return await axios.put(
                `${process.env.REACT_APP_API}/update-hotel/${hotelId}`,
                hotelData,
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            )
}

export const userHotelBookings= async (token) => {
    return await axios.get(`${process.env.REACT_APP_API}/user-hotel-bookings`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const isAlreadyBooked= async (token, hotelId) => {
    return await axios.get(`${process.env.REACT_APP_API}/is-already-booked/${hotelId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}


export const searchListings= async (query) => {
    return await axios.post(`${process.env.REACT_APP_API}/search-listings`,query);
}