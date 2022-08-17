import React, { useState } from 'react'
import { useNavigate } from "react-router";
import users from '../../apis/users';
import { getToken } from '../../apis/token';



const handleSubmit = async (e,userDetails,navigate)=>{
    e.preventDefault();
    let token = getToken();
    let {name,email_id,employee_id,password} = userDetails;
    const response = await users.post('/',{employee_id,name,email_id,password},
    {
        headers:{ 'Authorization' : `Bearer ${token}`}
    });
    console.log(response);
    if(response.data.status === "ok"){
        navigate("/user/",{ replace: true })
    }
};
const Create = (props)=>{
        let navigate = useNavigate();
        const [userDetails, setUserDetails] = useState({employee_id:"",name:"",email_id:"",
        password:""});

        return (<div>
        <h2 className='shxl svxl'>{"Add User"}</h2>

        <form onSubmit={(e)=>handleSubmit(e,userDetails,navigate)}>
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
                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputName"
                value = {userDetails.name}
                onChange = {(e)=> setUserDetails({...userDetails,name: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword"
                value = {userDetails.password}
                onChange = {(e)=> setUserDetails({...userDetails,password: e.target.value})}/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="input" className="col-sm-2 col-form-label">Email ID</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputEmail"
                value = {userDetails.email_id}
                onChange = {(e)=> setUserDetails({...userDetails,email_id: e.target.value})}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary svl">Save</button>
        </form>


        
        
        </div>)
}


export default Create;