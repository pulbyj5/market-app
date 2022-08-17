import React, { useState } from 'react'
import { useNavigate , useParams,Link} from "react-router-dom";
import purchases from '../../../apis/purchases';
import products from '../../../apis/products';
import { getToken } from '../../../apis/token';



const handleSubmit = async (e,purchaseDetails,customer_id,navigate)=>{
    e.preventDefault();
    let token = getToken();
    console.log(customer_id);
    let {product_id,quantity,date_and_time} = purchaseDetails;
    const response = await purchases.post('/',{customer_id,product_id,quantity,status:"success",date_and_time},
    {
        headers:{ 'Authorization' : `Bearer ${token}`}
    });
    console.log(response);
    if(response.data.status === "ok"){
        navigate(`/customers/${customer_id}/purchases`,{ replace: true })
    }
};

const getProductsWithFilters = async (e,setProducts, filters) => {
    Object.keys(filters).forEach((key)=>{
        if(!filters[key]){
            delete filters[key]
        }
    });
    console.log(filters);
    let token = getToken();
    const response = await products.get('/',{
        headers:{
            'Authorization' : `Bearer ${token}`
        },
        params: filters
    });
    console.log(response);
    setProducts(response.data.data);
}

const renderRecords = (products)=>{

    return products.map((product)=>{
        console.log(product);
        return(
            <tr key={product.id}>
                <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.batch}</td>
                    <td>{product.p_type}</td>
                     <td>{product.brand}</td>
                     <td>{product.price}</td>
                    <td>{product.stock}</td>
                    
                    <td><Link to={`/products/edit/${product.id}`}>Edit</Link></td>
                  <td><Link to={`/products/delete/${product.id}`}>Delete</Link></td>
            </tr>
        )
    })
}

const Create = (props)=>{
        let navigate = useNavigate();
        const [products, setProducts] = useState([]);

        const [filters, setFilters] = useState({id:"",name:"",batch:"",p_type:"",brand:""});
    
    
        const [purchaseDetails, setPurchaseDetails] = useState({product_id:"",quantity:"",date_and_time:""});
        let customer_id = useParams().id;
        return (<div className='middle'>
        <h2 className='svxl'>{"Add Purchase Record"}</h2>

        <form onSubmit={(e)=>handleSubmit(e,purchaseDetails,customer_id,navigate)}>
            <div className="row mb-3">
                <label htmlFor="inputID" className="col-sm-2 col-form-label">Product ID</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputID"
                value = {purchaseDetails.id}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,product_id: parseInt(e.target.value)?parseInt(e.target.value):null})}
                />
                </div>
            </div>
            {console.log(purchaseDetails)}
            <div className="row mb-3">
                <label htmlFor="inputQuantity" className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputQuantity"
                value = {purchaseDetails.quantity}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,quantity: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputDate" className="col-sm-2 col-form-label">{"Date & time of creation [YYYY-MM-DD HH:MM:SS]"}</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputDate"
                value = {purchaseDetails.date_and_time}
                onChange = {(e)=> setPurchaseDetails({...purchaseDetails,date_and_time: e.target.value})}/>
                </div>
            </div>
            
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
        <br/><br/>
        <h5 className='svl'>{"Find Product"}</h5>
        <p>{"Helps you to find product id & its availablity"}</p>
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
                <input type="text" className="form-control" placeholder="p_type"
                value = {filters.p_type}
                onChange = {(e)=> setFilters({...filters,p_type: e.target.value})}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Brand"
                value = {filters.brand}
                onChange = {(e)=> setFilters({...filters,brand: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Batch"
                value = {filters.batch}
                onChange = {(e)=> setFilters({...filters,batch: e.target.value})}/>
                </div>
            </div>
            <button className="btn btn-outline-primary sv sh"
            onClick={(e)=>{getProductsWithFilters(e,setProducts,filters)}}
            >Find</button>
            <button className="btn btn-outline-primary sv sh" onClick={()=>{setFilters({id:"",name:"",batch:"",p_type:"",brand:""})}}>Clear</button>
        
        <table className="table">
            <thead>
                <tr>
                     <th scope="col">ID</th>
                     <th scope="col">Name</th>
                     <th scope="col">Batch</th>
                     <th scope="col">P_type</th>
                     <th scope="col">Brand</th>
                     <th scope="col">Price</th>
                     <th scope="col">Stock</th>
                     <th scope="col">#Edit</th>
                     <th scope="col">#Delete</th>
                </tr>
            </thead>
            <tbody>
            {renderRecords(products)}
            {console.log(filters)}
            </tbody>
        </table>

        
        </div>)
}


export default Create;