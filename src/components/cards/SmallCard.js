import { diffDays } from "../../actions/hotel"
import { currencyFormatter } from "../../actions/stripe" 
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'


export const SmallCard= ({
    h, 
    handleHotelDelete= (f) => f ,
    owner=false, 
    showViewMoreButton=true
}) =>{
    const history=useHistory();
    return (
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    { 
                        h.image && h.image.contentType 
                        ? (<img 
                            src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
                            alt="Default Image"  
                            className="card-image img img-fluid"  
                            style={ { height : 300 } }
                        />)
                        : (<img 
                            src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                            alt="Default Image"  
                            className="card-image img img-fluid"  
                        />)
                    }
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">
                            {h.title} {" "}
                            <span className="float-right text-primary">
                                {currencyFormatter({
                                    amount : h.price*100,
                                    currency : "inr"
                                })}  
                            </span>
                        </h3>
                        <p className="alert alert-info">{h.location}</p>
                        <p className="card-text">{`${h.content.substring(0,200)}...`}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(h.from,h.to)} {diffDays(h.from,h.to)<=1 ? "day" : "days"}
                            </span>
                        </p>
                        <p className="card-text">Beds : {h.bed}</p>
                        <p className="card-text">Available from {new Date(h.from).toLocaleDateString()}</p>
                        <div className="d-flex justify-content-between h4">
                            {
                                showViewMoreButton &&
                                <button 
                                    onClick={()=> history.push(`/hotel/${h._id}`)} 
                                    className="btn btn-primary"
                                >
                                    Show more
                                </button>
                            }
                            {
                                owner && 
                                <>
                                    <Link to={`/hotel/edit/${h._id}`}>
                                        <EditOutlined className="text-warning" />
                                    </Link>
                                    <DeleteOutlined 
                                        onClick={() => handleHotelDelete(h._id)}
                                        className="text-danger"
                                    />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 