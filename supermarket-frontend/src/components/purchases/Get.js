import React,{useEffect, useState} from 'react'
import purchases from '../../apis/purchases';
import { getToken } from '../../apis/token';
import { Link, useNavigate } from "react-router-dom";


const getPurchases = async (setPurchases)=>{
    let token = getToken();
    console.log(token);
    const response = await purchases.get('/',{
        headers:{
            'Authorization' : `Bearer ${token}`
        }});
    console.log(response);
    setPurchases(response.data.data);
}

const renderRecords = (purchases)=>{

    return purchases.map((purchase)=>{
        console.log(purchase);
        return(
            <tr>
                    <td>{purchase.id}</td>
                    <td>{purchase.customer_id}</td>
                    <td>{purchase.product_id}</td>
                    <td>{purchase.quantity}</td>
                    <td>{purchase.date_time}</td>
                    <td>{purchase.status}</td>
                    <td><Link to={`/purchases/edit/${purchase.id}`}>Edit</Link></td>
                    <td><Link to={`/purchases/delete/${purchase.id}`}>Delete</Link></td>
            </tr>
        )
    })
}

const Get = (props) => {
    const [purchases, setPurchases] = useState([]);

    let navigate = useNavigate();

    useEffect(()=>{
        getPurchases(setPurchases);
    },[]);

    return (
        
        <div>
        
        <div className="d-flex justify-content-center py-3">
            <button type="button" className="btn btn-primary" 
            onClick={(e)=>{navigate("./",{ replace: true })}}>
                Add a new Purchase</button>
        </div>

        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Customer ID</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Date and Time</th>
                    <th scope="col">Status</th>
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