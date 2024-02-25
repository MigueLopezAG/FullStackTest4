import React from 'react';
import { useSelector } from 'react-redux';
import { productToCart } from '../../app/Products/productModel';
import { Typography, Button } from '@material-tailwind/react';


const OrderSummary = () => {



  return (
    <div className="px-6 mb-14">
      <div>
        <Typography className="mb-6 text-3xl font-bold ">Resumen del Pedido</Typography>
        <div
          className="flex items-center justify-between px-10 py-4 mb-3 font-medium leading-8 bg-gray-100 bg-opacity-50 border rounded-xl">
          <Typography>Total de piezas</Typography>
          <Typography className="flex items-center text-xl">
            <Typography>{1}</Typography>
          </Typography>
        </div>
        <div
          className="flex items-center justify-between px-10 py-4 mb-6 font-medium leading-8 bg-gray-100 border rounded-xl">
          <Typography>Total</Typography>
          <Typography className="flex items-center text-xl text-blue-500 dark:text-blue-500">
            <Typography className="mr-2 text-base">$</Typography>
            <Typography>{subtotal.toFixed(2)}</Typography>
          </Typography>
        </div>
        <Button className="inline-block w-full px-6 py-4 text-lg font-medium leading-6 tracking-tighter text-center text-white bg-gray-500 lg:w-auto hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
          href="#">Ir a la tienda</Button>
      </div>
    </div>
  );
};

export default OrderSummary;
