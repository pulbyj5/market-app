import React, { useState, useEffect } from 'react'
import { useParams} from "react-router";
import purchases from '../../apis/purchases';

const fetchItem = async (id_old,setPurchaseDetails)=>{
    const response = await purchases.get(`/${id_old}`);
    console.log(response);
    let {id,cust_id,prod_id,quantity,date_time,status} = response.data[0]
    setPurchaseDetails({id,cust_id,prod_id,quantity,date_time,status});
};
let id_old;

const handleSubmit = async (e,id_old,purchaseDetails)=>{
    e.preventDefault();
    let {id,cust_id,prod_id,quantity,date_time,status} = purchaseDetails;
    const response = await purchases.patch('/',{id:parseInt(id_old), data: {id,cust_id,prod_id,quantity,date_time,status}});
    console.log(response);
};
const Edit = (props)=>{

        const [purchaseDetails, setPurchaseDetails] = useState({id:"",cust_id:"",prod_id:"",quantity:"",date_time:"",status:""});
        id_old = useParams().id;
        useEffect(() => {
            fetchItem(id_old,setPurchaseDetails)
        },[]);
        return (<div>
        <h2>{"Edit Purchase"}</h2>

        <form onSubmit={(e)=>handleSubmit(e,id_old,purchaseDetails)}>
            <div className="row mb-3">
                <label htmlFor="inputID" className="col-sm-2 col-form-label">ID</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputID"
                value = {purchaseDetails.id}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,id: parseInt(e.target.value)})}
                />
                </div>
            </div>
            {console.log(purchaseDetails)}
            <div className="row mb-3">
                <label htmlFor="CustomerID" className="col-sm-2 col-form-label">Customer ID</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="CustomerID"
                value = {purchaseDetails.cust_id}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,id: parseInt(e.target.value)})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="ProductID" className="col-sm-2 col-form-label">Product ID</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="ProductID"
                value = {purchaseDetails.prod_id}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,id: parseInt(e.target.value)})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="quantity" className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" name="Quantity"
                value = {purchaseDetails.quantity}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,name: parseInt(e.target.value)})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="date_time" className="col-sm-2 col-form-label">Date and Time</label>
                <div className="col-sm-10">
                <input type="date_time" className="form-control" date="date_time"
                value = {purchaseDetails.date_time}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,date: e.target.value})}/>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="inputStatus" className="col-sm-2 col-form-label">Status</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputStatus"
                value = {purchaseDetails.status}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,status: parseInt(e.target.value)})}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>


        
        
        </div>)
}


export default Edit;