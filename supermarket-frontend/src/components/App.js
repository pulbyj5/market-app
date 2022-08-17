import React, { useState, useEffect } from 'react'
import { useNavigate,useLocation  } from "react-router";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'


import Header from './Header';
import Home from './Home';
import customers from './customers';
import products from './products';
import user from './user';
import purchases from './purchases';
import Auth from './auth';
import customerPurchases from './customers/purchases';


const getToken = ()=>{
  const auth= JSON.parse(localStorage.getItem('auth'));
  const token = auth?auth.token:null;
  console.log(auth);
  return token;
}

let location, navigate;
const AppRoutes = ()=>{

      location = useLocation();
      navigate = useNavigate();

      let [auth, setAuth] = useState({status:"not_fetched"});

      useEffect(()=>{
          if(auth.status === "not_fetched"){
              const token = getToken();
              if(token){
                  setAuth({status:"available", token: token});
              }else{
                  setAuth({status:"unavailable", token: token});
              }
          }
          else if (auth.status === "available"){
              if(location.pathname === "/login");
              navigate("/",{ replace: true });
          }
          else{
              if(location.pathname !== "/login");
              navigate("/login",{ replace: true });
          }
      },[auth]);
      console.log(location);
      
    return(
    <><Header/>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/customers' exact element={<customers.Get/>}/>
        <Route path='/customers/create' exact element={<customers.Create/>}/>
        <Route path='/customers/edit/:id' exact element={<customers.Edit/>}/>
        <Route path='/customers/delete/:id' exact element={<customers.Delete/>}/>
        <Route path='/customers/:id/purchases' exact element={<customerPurchases.Get/>}/>
        <Route path='/customers/:id/purchases/create' exact element={<customerPurchases.Create/>}/>
        <Route path='/products' exact element={<products.Get/>}/>
        <Route path='/products/create' exact element={<products.Create/>}/>
        <Route path='/products/edit/:id' exact element={<products.Edit/>}/>
        <Route path='/products/delete/:id' exact element={<products.Delete/>}/>
        <Route path='/purchases' exact element={<purchases.Get/>}/>
        <Route path='/purchases/edit/:id' exact element={<purchases.Edit/>}/>
        <Route path='/purchases/delete/:id' exact element={<purchases.Delete/>}/>
        <Route path='/user' exact element={<user.Get/>}/>
        <Route path='/user/create' exact element={<user.Create/>}/>
        <Route path='/user/edit/' exact element={<user.Edit/>}/>
        <Route path='/user/delete/' exact element={<user.Delete/>}/>
        <Route path='/login' exact element={<Auth.Login/>}/>

    </Routes></>
    );
}

const App = ()=>{

        return(
            <div  className="container">
                <BrowserRouter>
                    <AppRoutes/>
                </BrowserRouter>
            </div>
        )
}


export default App;