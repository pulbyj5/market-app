import React from 'react'
import { useParams,useNavigate } from "react-router";
import customers from '../../apis/customers';
import { getToken } from '../../apis/token';


const deleteCustomer = async (id,navigate)=>{
        let token = getToken();
        console.log(token);
        let response = await customers.delete("/",{
                data: {id:parseInt(id)},
                headers:{ 'Authorization' : `Bearer ${token}`}
        });
        if(response.data.status === "ok"){
                navigate(-1);
            }
        else{
                alert(response.data.error.message);
        }
}
const Delete = (props)=>{
        let navigate = useNavigate();
        let id = useParams().id
        return (<div className="middle">
        <h1 className='svl'>Delete Customer</h1>

        <div className='svxl'>
                <h3>Are you sure want to delete this Customer record?</h3>
                <button type="submit" className="btn btn-danger svxl sh"
                onClick = {(e)=>{deleteCustomer(id,navigate)}}>Yes</button>
                <button type="button" className="btn btn-secondary me-2 svxl sh"
                onClick = {(e)=>{navigate(-1)}}>
                        No
                </button>
        </div>
</div>)
}


export default Delete;