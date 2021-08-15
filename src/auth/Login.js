import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/forms/LoginForm";
import { useDispatch } from "react-redux";

const Login=({history}) => {
    const [email, setEmail]=useState('pankajphogat1515@gmail.com');
    const [password, setPassword]=useState('PANKAJPHOGAT');

    const dispatch=useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('SEND LOGIN DATA',{email,password});
        try{
            const res= await login({email, password});
            if(res.data)
                console.log('SAVE USER RESPONSE IN REDUX AND LOCAL STORAGE THEN REDIRECT ');
            //console.log(res.data);
            //save user and token to localstorage 
            window.localStorage.setItem('auth',JSON.stringify(res.data)); 
            dispatch({
                type : "LOGGED_IN_USER",
                payload : res.data
            });
            history.push('/dashboard');
        }catch(err){
            console.log(err);
            if(err.response.status===400) toast.error(err.response.data);
        }
    }
    return(
        <>
            <div className="container-fluid text-center bg-secondary p-5">
                <h1>Login</h1>
            </div>
            <div className="container">
                <div className="col-md-6 offset-3">
                    <LoginForm 
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                </div>
            </div>
        </>
    );
}

export default Login;