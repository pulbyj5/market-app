import React, { useState, useEffect } from 'react'
import { useNavigate,useParams } from "react-router";
import products from '../../apis/products';
import { getToken } from '../../apis/token';

const fetchItem = async (id_old,setProductDetails)=>{
        let token = getToken();
        const response = await products.get('/',{
                params:{id: id_old},
                headers:{ 'Authorization' : `Bearer ${token}`}
            });
        console.log(response);
        let {id,name,batch,p_type,brand,price,stock} = response.data.data[0];
        setProductDetails({id,name,batch,p_type,brand,price,stock});
};

const handleSubmit = async (e,productDetails,navigate)=>{
    e.preventDefault();
    let token = getToken();
    let {id,name,batch,p_type,brand,price,stock} = productDetails;
    const response = await products.patch('/',{id:id_old, data:{id,name,batch,p_type,brand,price,stock}},
    {
        headers:{ 'Authorization' : `Bearer ${token}`}
    });
    console.log(response);
    if(response.data.status === "ok"){
        navigate(-1)
    }
    else{
        alert(response.data.error.message);
    }
};
let id_old;
const Edit = (props)=>{
        let navigate = useNavigate();
        id_old = parseInt(useParams().id);
        const [productDetails, setProductDetails] = useState({id:"",name:"",batch:"",
        p_type:"",brand:"",price:"",stock:""});
        
        useEffect(() => {
                fetchItem(id_old,setProductDetails)
            },[]);

        return (<div>
        <h2 className='svxl'>{"Edit Product"}</h2>

        <form onSubmit={(e)=>handleSubmit(e,productDetails,navigate)}>
            <div className="row mb-3">
                <label htmlFor="inputID" className="col-sm-2 col-form-label">ID</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputID"
                value = {productDetails.id}
                onChange = {(e)=> setProductDetails({...productDetails,id: parseInt(e.target.value)})}
                />
                </div>
            </div>
            {console.log(productDetails)}
            <div className="row mb-3">
                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputName"
                value = {productDetails.name}
                onChange = {(e)=> setProductDetails({...productDetails,name: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputBatch" className="col-sm-2 col-form-label">Batch</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputBatch"
                value = {productDetails.batch}
                onChange = {(e)=> setProductDetails({...productDetails,batch:e.target.value })}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="input" className="col-sm-2 col-form-label">P_Type</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputp_type"
                value = {productDetails.p_type}
                onChange = {(e)=> setProductDetails({...productDetails,p_type: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputBrand" className="col-sm-2 col-form-label">Brand</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputBrand"
                value = {productDetails.brand}
                onChange = {(e)=> setProductDetails({...productDetails,brand: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputPrice" className="col-sm-2 col-form-label">Price</label>
                <div className="col-sm-10">
                <input type="number" step="0.01" className="form-control" id="inputPrice"
                value = {productDetails.price}
                onChange = {(e)=> setProductDetails({...productDetails,price: parseFloat(e.target.value)?parseFloat(e.target.value):null})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputStock" className="col-sm-2 col-form-label">Stock</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="inputStock"
                value = {productDetails.stock}
                onChange = {(e)=> setProductDetails({...productDetails,stock: parseInt(e.target.value)?parseInt(e.target.value):null})}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>


        
        
        </div>)
}


export default Edit;