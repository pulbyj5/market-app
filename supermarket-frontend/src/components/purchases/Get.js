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


const getPurchasesWithFilters = async (e,setPurchases, filters) => {
    Object.keys(filters).forEach((key)=>{
        if(!filters[key]){
            delete filters[key]
        }
    });
    console.log(filters);
    let token = getToken();
    const response = await purchases.get('/',{
        headers:{
            'Authorization' : `Bearer ${token}`
        },
        params: filters
    });
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

    const [filters, setFilters] = useState({id:"",customer_id:"",product_id:"",quantity:"",date_time:"",status:""});

    let navigate = useNavigate();

    useEffect(()=>{
        getPurchases(setPurchases);
    },[]);

    return (
         
        <div>
        
        <div className="d-flex justify-content-center py-3">
            <button type="button" className="btn btn-primary" 
            onClick={(e)=>{navigate("/",{ replace: true })}}>
                Add a new Purchase</button>
        </div>
            <div className="row sv">
                <div className="col">
                <input type="text" className="form-control" placeholder="ID"
                value = {filters.id}
                onChange = {(e)=> setFilters({...filters,id: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Customer ID"
                value = {filters.customer_id}
                onChange = {(e)=> setFilters({...filters,customer_id: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
            </div>
            <div className="row sv">
                <div className="col">
                <input type="text" className="form-control" placeholder="Product ID"
                value = {filters.product_id}
                onChange = {(e)=> setFilters({...filters, product_id: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Quantity"
                value = {filters.quantity}
                onChange = {(e)=> setFilters({...filters,quantity: e.target.value})}/>
                </div>
                <div> 
                    <p></p>   
                    <div className="col">
                    <input type="text" className="form-control" placeholder="Date and Time"
                    value = {filters.date_time}
                    onChange = {(e)=> setFilters({...filters,date_time: e.target.value})}/>
                    </div>  
                    <p></p>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="status"
                    value = {filters.status}
                    onChange = {(e)=> setFilters({...filters,status: e.target.value})}/>
                    </div>
                </div>
            </div>
            <br></br>
            <button className="btn btn-primary sv sh"
            onClick={(e)=>{getPurchasesWithFilters(e,setPurchases,filters)}}
            >Filter</button>
            <button className="btn btn-primary sv sh" onClick={()=>{setFilters({id:"",customer_id:"",product_id:"",quantity:"",date_time:"",status:""})}}>Clear</button>
        
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
            {console.log(filters)}
            </tbody>
        </table>

            
        </div>
        );
}

export default Get;
