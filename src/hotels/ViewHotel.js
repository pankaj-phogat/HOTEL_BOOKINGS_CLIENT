import React, { useEffect, useState } from 'react';
import { diffDays, isAlreadyBooked, readHotel } from '../actions/hotel';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getSessionId } from '../actions/stripe';
import { loadStripe } from '@stripe/stripe-js';

const ViewHotel=({match,history}) => {
    const { auth }=useSelector((state) => ({...state}))
;
    const [hotel,setHotel]=useState({});
    const [image,setImage]=useState('');
    const [loading, setLoading]=useState(false);
    const [alreadyBooked, setAlreadyBooked]=useState(false);
    useEffect(() => {
        loadSellerHotel();
    },[])
    useEffect(() => {
        if(auth && auth.token){
            isAlreadyBooked(auth.token,match.params.hotelId)
            .then(res => {
                if(res.data.ok)
                    setAlreadyBooked(true);
            })
        }
    },[])

    const loadSellerHotel=async () => {
        let res=await readHotel(match.params.hotelId);
        //console.log(res);
        setHotel(res.data);
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    }
    const handleClick=async (e) => {
        e.preventDefault();
        setLoading(true);
        if(!auth){
            history.push('/login');
        }else{
            //console.log(auth.token,match.params.hotelId);
            let res=await getSessionId(auth.token,match.params.hotelId);
            //console.log('GET SESSION ID',res.data.sessionId);
            const stripe=await loadStripe(process.env.REACT_APP_STRIPE_KEY);
            stripe.redirectToCheckout({
                sessionId : res.data.sessionId
            }).then(res => {
                console.log(res);
            })
        }
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
                        <button onClick={handleClick} 
                            className="btn btn-block btn-lg btn-primary mt-3"
                            disabled={loading || alreadyBooked}    
                        >
                            {loading ? "Loading..." :
                                alreadyBooked ? "Already Booked" : 
                                    auth && auth.token ? "Book Now" : "Login to Book"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewHotel;