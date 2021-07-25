import { useSelector } from "react-redux";
import { useState } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import { createConnectAccount } from "../actions/stripe";
import { deleteHotel, loadSellerHotels } from "../actions/hotel";
import { useEffect } from "react";
import { SmallCard } from "../components/cards/SmallCard"; 

const DashboardSeller= () => {
    const { auth } = useSelector((state) => ({...state}));
    const [loading, setLoading]=useState(false);
    const [hotels, setHotels]=useState([]);

    useEffect(() => {
        loadSeller();
    },[])

    const loadSeller= async () => {
        //api sends data by default or may use res.data
        let { data }= await loadSellerHotels(auth.token);
        setTimeout(() => setHotels(data), 1000 );
    }

    const handleClick=async () => {
        setLoading(true);
        try{
            let res= await createConnectAccount(auth.token);
            console.log(res);//get login link
            window.location.href=res.data;
        }catch(err){
            console.log(err);
            toast.error('Stripe connect failed try again.');
            setLoading(false);
        }
    }
    const handleHotelDelete= async(hotelId) => {
        if(!window.confirm('Are you sure you wand to delete this hotel?')) return ;
        deleteHotel(auth.token,hotelId).then(res => {
            toast.success("Hotel Deleted!");
            loadSellerHotels(auth.token);
        })
    }
    const connected =() => {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Hotels</h2>
                    </div>
                    <div className="col-md-2">
                        <Link className="btn btn-primary" to="/hotels/new">
                            + Add New
                        </Link>
                    </div>
                </div>
                <div className="row">
                    {hotels.map( (h) => 
                        <SmallCard 
                            key={h._id} 
                            h={h} 
                            showViewMoreButton={false} 
                            owner={true} 
                            handleHotelDelete={handleHotelDelete}
                            />
                    )}
                </div>
            </div>
        )
    }
    const notConnected= () => {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-3 text-center">
                        <div className="p-5 pointer">
                            <HomeOutlined className="h1" />
                            <h4>Setup payouts to post hotels.</h4>
                            <p className="lead">
                                MERN partners with stripe to transfer earnings to your bank account.
                            </p>
                            <button
                                disabled={loading} 
                                onClick={handleClick} 
                                className="btn btn-primary mb-3"
                            >
                                {loading ? 'processing' : 'Setup Payouts' }
                            </button>
                            <p className="text-muted">
                                You will be Redirected to stripe to complete the onboarding.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <ConnectNav />
            </div>
            <div className="container-fluid p-3">
                <DashboardNav />
            </div>
            {
                auth &&
                auth.user &&
                auth.user.stripe_seller &&
                auth.user.stripe_seller.charges_enabled
                    ? connected()
                    : notConnected()
            }
            <pre>{/*JSON.stringify(auth,null,4)*/}</pre>
        </>
    )
}

export default DashboardSeller;