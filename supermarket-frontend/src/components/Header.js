import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import {removeToken} from "../apis/token"



const Header= ()=>{
  const location = useLocation();
  if(location.pathname === "/login"){
      return (<NotAuthenticated/>);
  }
  else{
      return (<Authenticated/>);
  }
}



const logout = (navigate) =>{
    removeToken();
    navigate("/login",{ replace: true });
}

const Authenticated = ()=>{

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><Link className="nav-link px-2 link-dark" to="/customers"><b>Customers</b></Link></li>
          <li><Link className="nav-link px-2 link-dark" to="/products"><b>Products</b></Link></li>
          <li><Link className="nav-link px-2 link-dark" to="/purchases"><b>Purchases</b></Link></li>
        </ul>

        <div className="col-md-3 text-end">
          <button type="button" className="btn btn-outline-primary me-2" 
              onClick={()=>{logout(navigate)}}
              >Logout</button>
          <Link to="/purchases" className="btn btn-outline-primary me-2">Employee Details</Link>
        </div>
      </div>
    </div>
  )
}

const NotAuthenticated = ()=>{
  return (<div></div>);
}

export default Header;


