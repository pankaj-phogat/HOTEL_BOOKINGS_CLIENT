import { useState } from "react";
import { createHotel } from "../actions/hotel";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import HotelCreateForm from "../components/forms/HotelCreateForm";


const NewHotel=() => {
    //redux
    const { auth }= useSelector((state) => ({...state}));
    //state
    const [values, setValues]=useState({
        title: '',
        content: '',
        image: '',
        price: '',
        from: '',
        to:'',
        bed: ''
    });
    const [location,setLocation]=useState('');
    const [preview,setPreview]=useState('https://via.placeholder.com/100x100.png?text=PREVIEW');
    //destructuring from state
    const { title, content, image, price, from, to, bed } = values ;

    const handleSubmit= async (e) => {
        e.preventDefault();
        //creating form data
        let hotelData=new FormData();
        hotelData.append('title',title);
        
        hotelData.append('title',title);
        hotelData.append('content',content);
        hotelData.append('location',location);
        hotelData.append('price',price);
        image && hotelData.append('image',image);
        hotelData.append('from',from);
        hotelData.append('to',to);
        hotelData.append('bed',bed);
        try{
            const res= await createHotel(auth.token,hotelData);
            console.log("CREATE HOTEL REPONSE",res);
            setTimeout(() => {
                window.location.reload();
            },2000);
            toast.success('NEW HOTEL CREATED');
        }catch(err){
            console.log(err);
            toast.error(err.response.data);
        }
    }
    const handleImageChange=(e) => {
        //console.log(e.target.files[0]);
        setValues({...values,image : e.target.files[0]});
        setPreview(URL.createObjectURL(e.target.files[0]));
    }
    const handleChange=(e) => {
        setValues({...values,[e.target.name] : e.target.value})
    }

    return(
        <>
            <div className="container-fluid h1 p-5 text-center">
                <h2>Add Hotel</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <br />
                        <HotelCreateForm
                            values={values}
                            location={location}
                            setValues={setValues}
                            setLocation={setLocation}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            handleImageChange={handleImageChange}
                         />
                    </div>
                    <div className="col-md-2">
                        <img src={preview} alt="preview_text" className="img img-fluid m-2" />
                        <pre>{JSON.stringify(values,null,4)}</pre>
                        {JSON.stringify(location)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewHotel;