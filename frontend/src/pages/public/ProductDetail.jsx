import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductAction } from '../../actions/productActions';
import Header from '../../components/shop/Header';
import Loader from '../../components/Loader';
import SuccessAlert from "../../components/alerts/SuccessAlert";
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import { createOrderAction } from '../../actions/orderActions';
import {
    Button,
    Typography
  } from "@material-tailwind/react";

const ProductDetail = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const productDetail = useSelector((state) => state.productDetail);
    const {
        loading: loadingProductDetail,
        product: productInfo
    } = productDetail;

    const createOrderInfo = useSelector((state) => state.createOrder);
    const {
        loading: loadingCreateOrder,
        message: createOrderMessage
    } = createOrderInfo;

    const createOrder = () => {
        dispatch(createOrderAction({
            productRef: productInfo[0]._id,
            adviserRef: productInfo[0].adviserRef
        }))
    }

    useEffect(() => {
        if (id) {
            dispatch({type: ORDER_CREATE_RESET})
            dispatch(getProductAction(id))
        }
    }, [id])

    return (
        <>
            <Header />
            {loadingProductDetail || loadingCreateOrder || !productInfo ?
                (
                    <div className="flex w-full justify-center">
                        <Loader />
                    </div>
                ) : (
                    <section className="py-10 font-poppins">
                        <div className="max-w-6xl px-4 mx-auto">
                            <div className="flex flex-wrap mb-24 -mx-4">
                                <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                    <div className="sticky top-0 overflow-hidden ">
                                        <div className="relative mb-6 lg:mb-10 lg:h-96">
                                            <img className="object-cover w-full h-full" src={productInfo[0].image.url} alt={productInfo[0].name} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-4 md:w-1/2">
                                    <div className="lg:pl-20">
                                        <div className="mb-6 text-center">
                                            <h1 className="mt-6 mb-4 text-4xl font-bold text-gray-800 md:text-3xl">{productInfo[0].name}</h1>
                                            <p className="text-3xl font-semibold text-gray-700">${productInfo[0].price.toFixed(2)}</p>
                                        </div>
                                        <div className="mb-6">
                                            <p className="max-w-lg mt-6 mb-4 text-lg leading-relaxed text-gray-700">{productInfo[0].category}</p>
                                            <p className="max-w-xl mt-6 mb-6 text-xl leading-relaxed text-gray-700">{productInfo[0].description}</p>
                                            <div className="flex gap-4">
                                                <Button
                                                    onClick={createOrder}
                                                    className="flex items-center justify-center w-full px-4 py-3 text-black bg-gray-500 border border-transparent rounded-xl hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200"
                                                >
                                                    <Typography className="mr-2">Comprar Articulo</Typography>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {createOrderMessage && (
                                <SuccessAlert
                                    title="Orden Creada Exitosamente"
                                />
                            )}
                        </div>
                    </section>
                )}
        </>
    );
};

export default ProductDetail;