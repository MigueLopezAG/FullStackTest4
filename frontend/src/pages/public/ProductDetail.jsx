import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductAction } from '../../actions/productActions';
import Header from '../../components/shop/Header';
import Loader from '../../components/Loader';
import { Buffer } from 'buffer';
import axios from 'axios';
import { Typography, Button } from '@material-tailwind/react';
import { createOrderAction } from '../../actions/orderActions';

const ProductDetail = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const productDetail = useSelector((state) => state.productDetail);
    const {
        loading: loadingProductDetail,
        product: productInfo,
    } = productDetail;
    
    const [image, setImage] = useState('')

    useEffect(() => {
        if (id) {
            dispatch(getProductAction(id))
        }
    }, [id])

    // const getImage = async () => {
    //     axios.get(currentProduct.image, { responseType: "arraybuffer" })
    //         .then((response) =>
    //             setImage(Buffer.from(response.data, "binary").toString("base64"))
    //         ).catch((err) => {
    //             console.log("ocurrio un error al cargar la imagen", err)
    //         });
    // }
    // getImage();

    const createOrder = () => {
        dispatch(createOrderAction({
          productRef: productInfo[0]._id,
          adviserRef: productInfo[0].adviserRef
        }))
      }

    return (
        <>
            <Header />
            {loadingProductDetail || !productInfo ?
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
                                            <img className="object-contain w-full lg:h-full" src={`data:;base64,${image}`} alt={''} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-4 md:w-1/2">
                                    <div className="lg:pl-20">
                                        <div className="mb-6 text-center">
                                            <Typography className="mt-6 mb-6 text-4xl font-semibold  tracking-wide text-gray-700 md:text-2xl">
                                                {productInfo[0].name}
                                            </Typography>
                                            <Typography className="inline-block text-4xl font-semibold text-gray-700">
                                                <span>${' '}{productInfo[0].price.toFixed(2)}</span>
                                            </Typography>
                                        </div>
                                        <div className="mb-6 text">
                                            <Typography className="max-w-l mt-6 mb-6 text-l leading-loose tracking-wide text-gray-700 md:text-xl">
                                                {productInfo[0].category}
                                            </Typography>
                                            <Typography className="max-w-xl mt-6 mb-6 text-xl leading-loose tracking-wide text-gray-700 md:text-2xl">
                                                {productInfo[0].description}
                                            </Typography>
                                            
                                            <div className="flex gap-4 mb-6">
                                                <Button
                                                    onClick={createOrder}
                                                    className={"w-full px-4 py-3 text-center text-white bg-gray-600 border border-transparent hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl"}
                                                >
                                                    Comprar Articulo
                                                </Button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
        </>
    );
};

export default ProductDetail;