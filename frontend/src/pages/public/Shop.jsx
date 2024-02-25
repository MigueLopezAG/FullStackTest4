import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from '../../components/shop/Header';
import { getProductList } from '../../actions/productActions';
import Loader from '../../components/Loader';
import ProductCatalog from '../shop/ProductCatalog';

const Shop = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const {
      loading: loadingProducts,
      products,
    } = productList;

    useEffect(() => {
        dispatch(getProductList());
      }, [])

    return (
        <>
            <Header/>
            { loadingProducts || !products ? 
            (
                <div className="flex w-full justify-center">
                  <Loader />
                </div>
            ) : (
                <div className="container mx-auto p-4 content-center">
                    <h1 className="text-3xl font-semibold mb-8 mt-2 text-center">Catálogo de Productos</h1>
                    {/* {errorMessage && <CustomErrorAlert AlertMessage={errorMessage}  onCancelAlert={()=>{dispatch(clearAlerts())}}/>}
                    {successMessage && <CustomSuccessAlert AlertMessage={successMessage} onCancelAlert={()=>{dispatch(clearAlerts())}}/>}*/}
                    <ProductCatalog products={products} />
                </div>
            )}
        </>
    )
}

export default Shop;