import React, { useState, useEffect } from 'react'
import { useNavigate,useParams } from "react-router";
import customers from '../../apis/customers';
import { getToken } from '../../apis/token';

const fetchItem = async (id_old,setCustomerDetails)=>{
        let token = getToken();
        const response = await customers.get('/',{
                params:{id: id_old},
                headers:{ 'Authorization' : `Bearer ${token}`}
            });
        console.log(response);
        let {id,name,age,email_id,phone_no,sex,address} = response.data.data[0];
        setCustomerDetails({id,name,age,email_id,phone_no,sex,address});
};

const handleSubmit = async (e,customerDetails,navigate)=>{
    e.preventDefault();
    let token = getToken();
    let {id,name,age,email_id,phone_no,sex,address} = customerDetails;
    const response = await customers.patch('/',{id:id_old, data:{id,name,age,email_id,phone_no,sex,address}},
    {
        headers:{ 'Authorization' : `Bearer ${token}`}
    });
    console.log(response);
    if(response.data.status === "ok"){
        navigate("/customers/",{ replace: true })
    }
};
let id_old;
const Edit = (props)=>{
        let navigate = useNavigate();
        id_old = parseInt(useParams().id);
        const [customerDetails, setCustomerDetails] = useState({id:"",name:"",age:"",
        email_id:"",phone_no:"",sex:"",address:""});
        
        useEffect(() => {
                fetchItem(id_old,setCustomerDetails)
            },[]);

        return (<div>
        <h2>{"Edit Customer"}</h2>

        <form onSubmit={(e)=>handleSubmit(e,customerDetails,navigate)}>
            <div className="row mb-3">
                <label htmlFor="inputID" className="col-sm-2 col-form-label">ID</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputID"
                value = {customerDetails.id}
                onChange = {(e)=> setCustomerDetails({...customerDetails,id: parseInt(e.target.value)})}
                />
                </div>
            </div>
            {console.log(customerDetails)}
            <div className="row mb-3">
                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputName"
                value = {customerDetails.name}
                onChange = {(e)=> setCustomerDetails({...customerDetails,name: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputAge" className="col-sm-2 col-form-label">Age</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputAge"
                value = {customerDetails.age}
                onChange = {(e)=> setCustomerDetails({...customerDetails,age: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="input" className="col-sm-2 col-form-label">Email ID</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputEmail"
                value = {customerDetails.email_id}
                onChange = {(e)=> setCustomerDetails({...customerDetails,email_id: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputPhone" className="col-sm-2 col-form-label">Phone no</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputPhone"
                value = {customerDetails.phone_no}
                onChange = {(e)=> setCustomerDetails({...customerDetails,phone_no: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputSex" className="col-sm-2 col-form-label">Sex</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputSex"
                value = {customerDetails.sex}
                onChange = {(e)=> setCustomerDetails({...customerDetails,sex: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputAddress" className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputAddress"
                value = {customerDetails.address}
                onChange = {(e)=> setCustomerDetails({...customerDetails,address: e.target.value})}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>


        
        
        </div>)
}


export default Edit;