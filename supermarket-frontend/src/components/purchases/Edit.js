import React, { useState, useEffect } from 'react'
import { useParams,useNavigate} from "react-router";
import purchases from '../../apis/purchases';
import { getToken } from '../../apis/token';

const fetchItem = async (id_old,setPurchaseDetails)=>{
    let token = getToken();
    const response = await purchases.get("/",{
        params:{id: id_old},
        headers:{ 'Authorization' : `Bearer ${token}`}
    });
    console.log(response);
    let {customer_id,product_id,quantity,date_and_time,status} = response.data.data[0]
    setPurchaseDetails({customer_id,product_id,quantity,date_and_time,status});
};
let id_old;

const handleSubmit = async (e,id_old,purchaseDetails,navigate)=>{
    e.preventDefault();
    console.log(purchaseDetails);
    let token = getToken();
    let {customer_id,product_id,quantity,date_and_time,status} = purchaseDetails;
    const response = await purchases.patch('/',{id:parseInt(id_old), data:{customer_id,product_id,quantity,date_and_time,status}},
    {
        headers:{ 'Authorization' : `Bearer ${token}`}
    });
    console.log(response);
    if(response.data.status === "ok"){
        navigate(-1);
    }
    else{
        alert(response.data.error.message);
    }
    console.log(response);
};
const Edit = (props)=>{
        let navigate = useNavigate();
        const [purchaseDetails, setPurchaseDetails] = useState({quantity:"",date_and_time:"",status:""});
        id_old = useParams().id;
        useEffect(() => {
            fetchItem(id_old,setPurchaseDetails)
        },[]);
        return (<div>
        <h2 className='svxl'>{"Edit Purchase"}</h2>

        <form onSubmit={(e)=>handleSubmit(e,id_old,purchaseDetails,navigate)}>
            {console.log(purchaseDetails)}
            <div className="row mb-3">
                <label htmlFor="CustomerID" className="col-sm-2 col-form-label">Customer ID</label>
                <div className="col-sm-10">
                <p id="CustomerID">{purchaseDetails.customer_id}</p>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="ProductID" className="col-sm-2 col-form-label">Product ID</label>
                <div className="col-sm-10">
                <p id="ProductID">{purchaseDetails.product_id}</p>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="quantity" className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" name="Quantity"
                value = {purchaseDetails.quantity}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,quantity: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="date_time" className="col-sm-2 col-form-label">Date and Time</label>
                <div className="col-sm-10">
                <input type="date_time" className="form-control" date="date_time"
                value = {purchaseDetails.date_and_time}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,date_and_time: e.target.value})}/>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="inputStatus" className="col-sm-2 col-form-label">Status</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputStatus"
                value = {purchaseDetails.status}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,status: e.target.value})}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>


        
        
        </div>)
}


export default Edit;