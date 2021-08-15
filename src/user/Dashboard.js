import React, { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import BookingCard from "../components/cards/BookingCard";
import { Link } from "react-router-dom";
import { userHotelBookings } from "../actions/hotel";
import { useSelector } from "react-redux";

const Dashboard= () => {
    const {auth}=useSelector((state) => ({...state}));
    const [booking,setBooking]=useState([]);
    useEffect(()=>{
        loadUserBookings();
    },[]);
    const loadUserBookings= async () => {
        const res=await userHotelBookings(auth.token);
        setBooking(res.data);
        console.log(res.data);
    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>
            <div className="container-fluid p-3">
                <DashboardNav />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your bookings</h2>
                    </div>
                    <div className="col-md-2">
                        <Link className="btn btn-primary" to="/">Browse hotels</Link>
                    </div>
                </div>
            </div>

            <div className="row">
                {booking.map( b => (
                    <BookingCard key={b._id} hotel={b.hotel} session={b.session} orderedBy={b.orderedBy} />
                ))}
            </div>
        </>
    )
}

export default Dashboard;