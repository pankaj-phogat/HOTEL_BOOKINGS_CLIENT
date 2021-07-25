import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import { currencyFormatter, getAccountBalance, payoutSettings } from "../actions/stripe";
import { useEffect, useState } from "react";
import { SettingOutlined, LoadingOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";

const { Meta } = Card;
const { Ribbon } = Badge;


const ConnectNav = () => {
    const [loading, setLoading]=useState(false);
    const [balance, setBalance]=useState(0);
    const { auth }=useSelector((state) => ({...state}));
    const { user }= auth;
    useEffect(() => {
        getAccountBalance(auth.token)
            .then((res) => {
                console.log('BALANCE : ',res);
                setBalance(res.data);
            })
    },[]);

    const handlePayoutSettings = async () => {
        setLoading(true);
        try{
            const res=await payoutSettings(auth.token);
            console.log('RESULT OF PAYOUT SETTINGS ===>',res);
            toast.error(res.data);
            setLoading(false);
            //only for express accounts, not avail in india
            //window.location.href=res.data.url;
        }catch(err){
            console.log(err);
            setLoading(false);
            toast.error('unable to access settings. Try again!')
        }
    }
    return (
        <div className="d-flex justify-content-around">
            <Card>
                <Meta 
                    avatar={<Avatar>{user.name[0]}</Avatar>} 
                    title={user.name} 
                    description={`Joined ${moment(user.createdAt).fromNow()}`}
                />
            </Card>
            {
                auth &&
                auth.user &&
                auth.user.stripe_seller &&
                auth.user.stripe_seller.charges_enabled &&
                (
                    <>
                        <Ribbon text="available" color="grey">
                            <Card className="bg-light pt-1">
                                {balance &&
                                    balance.pending &&
                                    balance.pending.map((bal,i) =>
                                        (<span key={i} className="lead">
                                            {currencyFormatter(bal)}
                                        </span>)
                                    )
                                }
                            </Card>
                        </Ribbon>
                        <Ribbon text="payouts" color="silver">
                            <Card 
                                onClick={handlePayoutSettings} 
                                className="bg-light pointer"
                            >
                                {
                                    loading ?
                                    <LoadingOutlined />  :
                                    <SettingOutlined className="h-5 pt-2" />
                                }
                            </Card>
                        </Ribbon>
                    </>
                )
            }
        </div>   
    );
}

export default ConnectNav;

