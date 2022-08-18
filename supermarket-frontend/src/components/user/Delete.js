import React, { useState } from 'react'
import { useNavigate } from "react-router";
import users from '../../apis/users';
import { getToken, removeToken } from '../../apis/token';



const handleSubmit = async (e,userDetails,navigate)=>{
    e.preventDefault();
    let token = getToken();
    let {employee_id,password} = userDetails;
    const response = await users.delete('/',
    {
        data:{employee_id,password},
        headers:{ 'Authorization' : `Bearer ${token}`}
    });
    console.log(response);
    if(response.data.status === "ok"){
        removeToken();
        navigate("/login",{ replace: true })
    }
    else{
        alert(response.data.error.message);
    }
};
const Delete = (props)=>{
        let navigate = useNavigate();
        const [userDetails, setUserDetails] = useState({employee_id:"",password:""});

        return (<div>
        <h2 className='shxl svxl middle'>{"Are you sure to delete this account?"}</h2>

        <form className='shxl svxl middle' onSubmit={(e)=>handleSubmit(e,userDetails,navigate)}>
            <div className="row mb-3">
                <label htmlFor="inputID" className="col-sm-2 col-form-label">Employee ID</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputID"
                value = {userDetails.employee_id}
                onChange = {(e)=> setUserDetails({...userDetails,employee_id: e.target.value})}
                />
                </div>
            </div>
            {console.log(userDetails)}
            <div className="row mb-3">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword"
                value = {userDetails.password}
                onChange = {(e)=> setUserDetails({...userDetails,password: e.target.value})}/>
                </div>
            </div>
            <button type="submit" className="btn btn-danger svl">Confirm</button>
        </form>


        
        
        </div>)
}


export default Delete;