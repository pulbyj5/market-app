import React,{useEffect, useState} from 'react'
import customers from '../../../apis/customers';
import { getToken } from '../../../apis/token';
import { Link, useNavigate, useParams } from "react-router-dom";


const getPurchases = async (customer_id,setPurchases)=>{
    let token = getToken();
    const response = await customers.get(`/${customer_id}/purchases`,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }});
    console.log(response.data.data);
    setPurchases(response.data.data);
}


const renderRecords = (purchases)=>{

    return purchases.map((purchase)=>{
        console.log(purchase);
        return(
            <tr key={purchase.id}>
                    <td>{purchase.id}</td>
                    <td>{purchase.customer_id}</td>
                    <td>{purchase.product_id}</td>
                    <td>{purchase.prod_name}</td>
                    <td>{purchase.quantity}</td>
                    <td>{purchase.status}</td>
                    <td>{purchase.date_and_time}</td>
                    <td><Link to={`/purchases/edit/${purchase.id}`}>Edit</Link></td>
                    <td><Link to={`/purchases/delete/${purchase.id}`}>Delete</Link></td>
            </tr>
        )
    })
}

let customer_id;
const Get = (props) => {
    const [purchases, setPurchases] = useState([]);

    let navigate = useNavigate();
    customer_id = useParams().id;
    useEffect(()=>{
        getPurchases(customer_id, setPurchases);
    },[]);

    return (
        
        <div>
        
        <div className="d-flex justify-content-center py-3">
            <button type="button" className="btn btn-primary" 
            onClick={(e)=>{navigate("./create",{ replace: true })}}>
                Add a new Purchase record</button>
        </div>

        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Customer ID</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date and Time of purchase</th>
                    <th scope="col">#Edit</th>
                    <th scope="col">#Delete</th>
                </tr>
            </thead>
            <tbody>
            {renderRecords(purchases)}
            </tbody>
        </table>

            
        </div>
        );
}

export default Get;