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
  const [image, setImage] = useState('')

  const getImage = async () => {
    // axios.get(product.image, { responseType: "arraybuffer" })
    //   .then((response) =>
    //     setImage(Buffer.from(response.data, "binary").toString("base64"))
    //   );
  }
  getImage();

  const createOrder = (e) => {
    e.stopPropagation();
    dispatch(createOrderAction({
      productRef: product._id,
      adviserRef: product.adviserRef
    }))
  }

  return (
    <div
      className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
      onClick={() => navigate('/productDetail/' + product._id)}
    >
      <img src={`data:;base64,${image}`} alt={product.model} className="h-80 w-72 object-cover rounded-t-xl" />
      <div className="px-4 py-3 w-72">
        <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price.toFixed(2)}</p>
          <div className="ml-auto" onClick={createOrder}><BanknotesIcon className='h-7 w-7'/></div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;