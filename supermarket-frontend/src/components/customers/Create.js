import React, { useState } from 'react'
import { useNavigate } from "react-router";
import customers from '../../apis/customers';
import { getToken } from '../../apis/token';



const handleSubmit = async (e,customerDetails,navigate)=>{
    e.preventDefault();
    let token = getToken();
    let {id,name,age,email_id,phone_no,sex,address} = customerDetails;
    const response = await customers.post('/',{id,name,age,email_id,phone_no,sex,address},
    {
        headers:{ 'Authorization' : `Bearer ${token}`}
    });
    console.log(response);
    if(response.data.status === "ok"){
        navigate("/customers/",{ replace: true })
    }
    else{
        alert(response.data.error.message);
    }
};
const Create = (props)=>{
        let navigate = useNavigate();
        const [customerDetails, setCustomerDetails] = useState({id:"",name:"",age:"",
        email_id:"",phone_no:"",sex:"",address:""});

        return (<div>
        <h2  className='svxl'>{"Add Customer"}</h2>

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


export default Create;