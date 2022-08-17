import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router";
import users from '../../apis/users';
import { getToken } from '../../apis/token';

const fetchUser = async (setUserData)=>{
        let token = getToken();
        const response = await users.get('/',{
                headers:{ 'Authorization' : `Bearer ${token}`}
            });
        console.log(response);
        if(response.data.status === "ok"){
                setUserData(response.data.data);
        }
        else{
                console.log(response.data.error);
        } 
}

const Get = (props)=>{
        let navigate = useNavigate();
        let [userdata,setUserData] = useState({id:"",name:"",email_id:"",employee_id:""});
        useEffect(()=>{
                fetchUser(setUserData);
        },[]);
        return (<div>
                <h1 className='svxl shxl'>{`Welcome! ${userdata.name}`}</h1>
                <p className='svxl shxl'>Employee ID: <b>{userdata.employee_id}</b></p>
                <p className='svxl shxl'>Email ID: <b>{userdata.email_id}</b></p>
                <button type="button" className="btn btn-primary svxl sh"
                onClick = {(e)=>{navigate("/user/create")}}>Create New User</button>
                <button type="button" className="btn btn-secondary me-2 svxl sh"
                onClick = {(e)=>{navigate("/user/edit")}}>
                        Edit your details
                </button>
                <button type="button" className="btn btn-danger svxl sh"
                onClick = {(e)=>{navigate("/user/delete")}}>Delete your account</button>
        </div>)
}


export default Get;