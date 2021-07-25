import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { toast } from 'react-toastify';
import { register } from "../actions/auth";

const Register=({history}) => {
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');


    const handleSubmit=async (e) => {
        e.preventDefault();
        //console.table({name,email,password});
        try{
            const res=await register({
                name,
                email,
                password
            });
            console.log('REGISTER USER===>',res);
            toast.success('Register success! please login.');
            history.push('/login');
        }catch(err){
            console.log(err);
            toast.error('Error :'+err.response.data);   
        }
    }
    return(
        //Fragments
        <>
            <div className="container-fluid p-5 text-center bg-secondary">
                <h1>Register</h1>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3" >
                        <RegisterForm 
                            handleSubmit={handleSubmit} 
                            name={name} 
                            email={email} 
                            password={password}
                            setName={setName} 
                            setEmail={setEmail} 
                            setPassword={setPassword} 
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;