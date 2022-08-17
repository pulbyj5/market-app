import React, { useState } from 'react'
import { useNavigate , useParams} from "react-router";
import purchases from '../../../apis/purchases';
import { getToken } from '../../../apis/token';



const handleSubmit = async (e,purchaseDetails,customer_id,navigate)=>{
    e.preventDefault();
    let token = getToken();
    console.log(customer_id);
    let {product_id,quantity,date_and_time} = purchaseDetails;
    const response = await purchases.post('/',{customer_id,product_id,quantity,status:"success",date_and_time},
    {
        headers:{ 'Authorization' : `Bearer ${token}`}
    });
    console.log(response);
    if(response.data.status === "ok"){
        navigate(`/customers/${customer_id}/purchases`,{ replace: true })
    }
};


const Create = (props)=>{
        let navigate = useNavigate();
        const [purchaseDetails, setPurchaseDetails] = useState({product_id:"",quantity:"",date_and_time:""});
        let customer_id = useParams().id;
        return (<div className='middle'>
        <h2 className='svxl'>{"Add Purchase Record"}</h2>

        <form onSubmit={(e)=>handleSubmit(e,purchaseDetails,customer_id,navigate)}>
            <div className="row mb-3">
                <label htmlFor="inputID" className="col-sm-2 col-form-label">Product ID</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputID"
                value = {purchaseDetails.id}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,product_id: parseInt(e.target.value)?parseInt(e.target.value):null})}
                />
                </div>
            </div>
            {console.log(purchaseDetails)}
            <div className="row mb-3">
                <label htmlFor="inputQuantity" className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputQuantity"
                value = {purchaseDetails.quantity}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,quantity: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputDate" className="col-sm-2 col-form-label">{"Date & time of creation [YYYY-MM-DD HH:MM:SS]"}</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputDate"
                value = {purchaseDetails.date_and_time}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,date_and_time: e.target.value})}/>
                </div>
            </div>
            
            <button type="submit" className="btn btn-primary">Save</button>
        </form>


        
        
        </div>)
}


export default Create;