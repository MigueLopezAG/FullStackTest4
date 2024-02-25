import React from 'react';
//import logo from './logo.png'; // Importa tu logo
import { FaUserCircle  } from 'react-icons/fa'; 

import '../../styles/Header.css'
import { useNavigate } from 'react-router-dom';
const Header= () => {
  
  const navigate = useNavigate();
  
  return (
    <div className="header-container">
      <img 
        src={''} 
        alt="Logo" 
        className="logo w-12 lg:w-20 cursor-pointer" 
        onClick={()=>{navigate('/');}}
      />
      <h1 
        className="title text-lg lg:text-2xl cursor-pointer" 
        onClick={()=>{navigate('/');}}
      >
        Mi tienda
      </h1>
      <div 
        className="flex flex-row items-center cart-icon cursor-pointer"
        onClick={()=>{navigate('/login');}}
      >
        <FaUserCircle  className="text-xl lg:text-2xl"/>
      </div>
    </div>
  );
};

export default Header;