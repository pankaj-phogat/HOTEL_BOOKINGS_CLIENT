import React, { useEffect, useState } from 'react';
import { diffDays, readHotel } from '../actions/hotel';
import moment from 'moment';

const ViewHotel=({match}) => {

    const [hotel,setHotel]=useState({});
    const [image,setImage]=useState('');
    useEffect(() => {
        loadSellerHotel();
    },[])
    const loadSellerHotel=async () => {
        let res=await readHotel(match.params.hotelId);
        //console.log(res);
        setHotel(res.data);
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    }
    return (
        <>
            <div className="container-fluid h1 p-5 text-center">
                <h2>{hotel.title}</h2>
            </div>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-6">
                        <br/>
                        <img src={image} alt={hotel.title} className="img img-fluid m-2" />
                    </div>

                    <div className="col-md-6">
                        <br/>
                        <b>{hotel.content}</b>
                        <p className="alert alert-info ml-3">{hotel.price}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(hotel.from,hotel.to)} 
                                {diffDays(hotel.from,hotel.to)<=1 ? "day" : "days"}
                            </span>
                        </p>
                        <p>
                            From &nbsp; &nbsp; &nbsp;
                            {moment(new Date(hotel.from)).format('MMMM Do YYYY, [11]:[00]:[00] a')}
                        </p>
                        <p>
                            To  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            {moment(new Date(hotel.to)).format('MMMM Do YYYY, [11]:[00]:[00] a')}
                        </p>
                        <i>Posted by {hotel.postedBy && hotel.postedBy.name } </i>
                        <button className="btn btn-block btn-lg btn-primary mt-3">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewHotel;