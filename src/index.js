import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Homepage from './Components/homepage';

import Login from './Components/Login';

import Register from './Components/Register';
import './index.css';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
    <Routes>
      <Route path='/'element={<Login/>}/>
      <Route path='/register'element={<Register/>}/>
      <Route path='/homepage'element={<Homepage/>}/>
  
      </Routes>
    </BrowserRouter>    
  </React.StrictMode>
);
reportWebVitals();
