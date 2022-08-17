import React from 'react'
import { useParams,useNavigate } from "react-router";
import purchases from '../../apis/purchases';
import { getToken } from '../../apis/token';

const goBack= (navigate) => {
        navigate("/purchases/",{ replace: true });
}

const deletePurchase = async (id,navigate)=>{
        let token = getToken();
        console.log(token);
        let response = await purchases.delete("/",{
                data: {id:parseInt(id)},
                headers:{ 'Authorization' : `Bearer ${token}`}
        });
        if(response.data.status === "ok"){
                navigate("/purchases/",{ replace: true });
        }
        else{
                console.log(response.data.error.message);
        }
}
const Delete = (props)=>{
        let navigate = useNavigate();
        let id = useParams().id
        return (<div className="middle">
        <h1 className='svl'>Delete Purchase</h1>

        <div className='svxl'>
                <h3>Are you sure want to delete this Purchase record?</h3>
                <button type="submit" className="btn btn-danger svxl sh"
                onClick = {(e)=>{deletePurchase(id,navigate)}}>Yes</button>
                <button type="button" className="btn btn-secondary me-2 svxl sh"
                onClick = {(e)=>{goBack(navigate)}}>
                        No
                </button>
        </div>
</div>)
}


export default Delete;