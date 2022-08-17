import React, { useState } from 'react'
import { useNavigate } from "react-router";
import customers from '../../apis/auth';

const fakeLogin = ()=>{
        localStorage.setItem(
                'auth',
                JSON.stringify({
                    token: "fake token"
                })
        )
}
const Login = (props)=>{
        let navigate = useNavigate();
        return (<div> 
                        <h1>Login</h1>
                        <button type="button" className="btn btn-outline-primary me-2" 
                        onClick={()=>{
                                fakeLogin();
                                navigate("/",{ replace: true });
                        }}>Fake Login</button>
                </div>)
}


export default Login;