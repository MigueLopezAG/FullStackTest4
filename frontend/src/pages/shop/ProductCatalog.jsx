import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardProduct from './CardProduct';
import SuccessAlert from '../../components/alerts/SuccessAlert'
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';

const ProductCatalog = ({ products }) => {

  const dispatch = useDispatch();

  const createOrderInfo = useSelector((state) => state.createOrder);
  const { message } = createOrderInfo;

  //Disparador para reiniciar el mensaje de la orden creada
  useEffect(() => {
    dispatch({type: ORDER_CREATE_RESET})
  }, [])

  return (<>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {products.map((product) => (
        <CardProduct
          product={product}
        />
      ))}
    </div>
    {message && (
      <SuccessAlert
        title="Orden Creada Exitosamente"
      />
    )}
    </>
  );
};

export default ProductCatalog;