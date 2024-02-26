import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import { createOrderAction } from '../../actions/orderActions';

const CardProduct = ({ product }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const createOrder = (e) => {
    e.stopPropagation();
    dispatch(createOrderAction({
      productRef: product._id,
      adviserRef: product.adviserRef
    }))
  }

  return (
    <div
      className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto bg-white shadow-lg rounded-xl duration-300 transform hover:scale-105 hover:shadow-xl"
      onClick={() => navigate('/productDetail/' + product._id)}
    >
      <img src={product.image.url} alt={product.model} className="h-72 w-full object-cover rounded-t-xl" />
      <div className="px-4 py-3">
        <p className="text-lg font-bold text-black truncate capitalize">{product.name}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-semibold text-black">${product.price.toFixed(2)}</p>
          <div className="ml-auto" onClick={createOrder}>
            <BanknotesIcon className='flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 focus:outline-none'/></div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;