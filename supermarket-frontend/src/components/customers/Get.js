import React,{useEffect, useState} from 'react'
import customers from '../../apis/customers';
import { getToken } from '../../apis/token';
import { Link, useNavigate } from "react-router-dom";


const getCustomers = async (setCustomers)=>{
    let token = getToken();
    console.log(token);
    const response = await customers.get('/',{
        headers:{
            'Authorization' : `Bearer ${token}`
        }});
    console.log(response);
    setCustomers(response.data.data);
}

const getCustomersWithFilters = async (e,setCustomers, filters) => {
    Object.keys(filters).forEach((key)=>{
        if(!filters[key]){
            delete filters[key]
        }
    });
    console.log(filters);
    let token = getToken();
    const response = await customers.get('/',{
        headers:{
            'Authorization' : `Bearer ${token}`
        },
        params: filters
    });
    console.log(response);
    setCustomers(response.data.data);
}


const renderRecords = (customers)=>{

    return customers.map((customer)=>{
        console.log(customer);
        return(
            <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.age}</td>
                    <td>{customer.email_id}</td>
                    <td>{customer.phone_no}</td>
                    <td>{customer.sex}</td>
                    <td>{customer.address}</td>
                    <td><Link to={`/customers/${customer.id}/purchases`}>Orders</Link></td>
                    <td><Link to={`/customers/edit/${customer.id}`}>Edit</Link></td>
                    <td><Link to={`/customers/delete/${customer.id}`}>Delete</Link></td>
            </tr>
        )
    })
}

const Get = (props) => {
    const [customers, setCustomers] = useState([]);

    const [filters, setFilters] = useState({id:"",name:"",age:"",email_id:"",phone_no:"",sex:""});

    let navigate = useNavigate();

    useEffect(()=>{
        getCustomers(setCustomers);
    },[]);

    return (
        
        <div>
        
        <div className="d-flex justify-content-center py-3">
            <button type="button" className="btn btn-primary" 
            onClick={(e)=>{navigate("./create",{ replace: true })}}>
                Add a new Customer</button>
        </div>
            <div className="row sv">
                <div className="col">
                <input type="text" className="form-control" placeholder="ID"
                value = {filters.id}
                onChange = {(e)=> setFilters({...filters,id: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Name"
                value = {filters.name}
                onChange = {(e)=> setFilters({...filters,name: e.target.value})}/>
                </div>
            </div>
            <div className="row sv">
                <div className="col">
                <input type="text" className="form-control" placeholder="Email ID"
                value = {filters.email_id}
                onChange = {(e)=> setFilters({...filters,email_id: e.target.value})}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Phone NO"
                value = {filters.phone_no}
                onChange = {(e)=> setFilters({...filters,phone_no: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Sex"
                value = {filters.sex}
                onChange = {(e)=> setFilters({...filters,sex: e.target.value})}/>
                </div>
            </div>
            <button className="btn btn-primary sv sh"
            onClick={(e)=>{getCustomersWithFilters(e,setCustomers,filters)}}
            >Filter</button>
            <button className="btn btn-primary sv sh" onClick={()=>{setFilters({id:"",name:"",age:"",email_id:"",phone_no:"",sex:""})}}>Clear</button>
        
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Email ID</th>
                    <th scope="col">Phone NO</th>
                    <th scope="col">Sex</th>
                    <th scope="col">Address</th>
                    <th scope="col">#Orders</th>
                    <th scope="col">#Edit</th>
                    <th scope="col">#Delete</th>
                </tr>
            </thead>
            <tbody>
            {renderRecords(customers)}
            {console.log(filters)}
            </tbody>
        </table>

            
        </div>
        );
}

export default Get;