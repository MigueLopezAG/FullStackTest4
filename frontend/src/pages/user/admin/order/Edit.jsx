import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginData } from "../../../../actions/userActions";
import { Input, InputSelectStatus } from "../../../../components/elements/ProductsInputs";

import { findAdviserNameById, findProductPriceById, findProductNameById } from "../../../../actions/helpers";
import Alert from "../../../../components/alerts/Alert";
import { EDIT_ORDER_RESET, GET_ORDER_RESET } from "../../../../constants/orderConstants";
import { Button } from "@material-tailwind/react";
import { useMaterialTailwindController } from "../../../../context";
import { getOrderAction, editOrderAction } from "../../../../actions/orderActions";
import { adminListAdvisers } from "../../../../actions/adviserActions";
import { getProductList } from "../../../../actions/productActions"

const orderStatus = ["Pendiente", "En Proceso", "Enviado", "Entregado"];

export function EditOrder() {
    const { id } = useParams();
    
    const [order, setOrder] = useState({
        productRef: '',
        adviserRef: '',
        orderStatus: '',
        parcelService: '',
        trackingNumber: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [controller, setController] = useMaterialTailwindController();
    const { sidenavColor, sidenavType, openSidenav } = controller;

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const editOrder = useSelector((state) => state.editOrder);
    const {
        loading: loadingEditOrder,
        error: errorEditOrder,
        message: messageEdit,
    } = editOrder;

    const orderDetail = useSelector((state) => state.orderDetail);
    const {
        loading: loadingOrderDetail,
        error: errorOrderDetail,
        order: orderInfo
    } = orderDetail;

    const adminAdviserList = useSelector((state) => state.adminAdviserList);
    const { advisers } = adminAdviserList;

    const productList = useSelector((state) => state.productList);
    const { products } = productList;
    const handleChange = (e) =>
        setOrder((prevState) => ({
            ...prevState,
            [e.target.name.split(".")[0]]:
                e.target.name.split(".").length === 2
                    ? {
                        ...prevState[e.target.name.split(".")[0]],
                        [e.target.name.split(".")[1]]: e.target.value,
                    }
                    : e.target.value,
        }));

    const handleChangeSelect = (e) => {
        setOrder((prevState) => ({
            ...prevState,
            orderStatus: e.target.value
        }));
    }

    const submitHandler = () => {
        dispatch(editOrderAction(id ,{orderInfo: order}));
    };
    const redirect = "/login";
    //Validar la sesion del usuario y controlar la redireccion
    useEffect(() => {
        if (messageEdit) {
            dispatch({ type: EDIT_ORDER_RESET });
            navigate("/adviser/Ordenes");
        }
        if (!userInfo) {
            dispatch(getLoginData());
        }
    }, [userInfo, messageEdit]);

    useEffect(() => {
      dispatch({type: GET_ORDER_RESET})
    }, [])
    
    useEffect(() => {
        if(id){
            dispatch(getOrderAction(id))
            dispatch(adminListAdvisers());
            dispatch(getProductList());
        }
    }, [id])
    
    useEffect(() => {
      if(orderInfo ) {
        setOrder({
            productRef: orderInfo.productRef,
            adviserRef: orderInfo.adviserRef,
            orderStatus: orderInfo.orderStatus,
            parcelService: orderInfo.parcelService,
            trackingNumber: orderInfo.trackingNumber
        })
      }
    }, [orderInfo])
    
    return orderInfo && (
        <div className="bg-slate-50 p-4">
            <h2 className="text-palette-primary text-xl font-bold">Editar Orden</h2>
            <div className="flex flex-row justify-between mt-6 mb-2">
                <div className="flex flex-col mb-2">
                    <h2 className="text-palette-primary text-xl font-bold">Proveedor:</h2>
                    <h2 className="text-palette-primary text-xl ">{userInfo.userType === 'Adviser' ? userInfo.tradename : findAdviserNameById(advisers, orderInfo.adviserRef)}</h2>
                </div>
                <div className="flex flex-col mb-2">    
                    <h2 className="text-palette-primary text-xl font-bold">Producto:</h2>
                    <h2 className="text-palette-primary text-xl">{orderInfo.productRef ? findProductNameById(products, orderInfo.productRef) : ""}</h2>
                </div>
                <div className="flex flex-col mb-2">
                    <h2 className="text-palette-primary text-xl font-bold">Precio:</h2>
                    <h2 className="text-palette-primary text-xl ">{order.productRef ? "$ "+ findProductPriceById(products, orderInfo.productRef) : 0}</h2>
                </div>
            </div>
            <form
                className="mt-3 grid gap-6 md:grid-cols-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler();
                }}
            >
                
                <div className="flex flex-col gap-3 md:grid-cols-1 md:grid-rows-2">
                    <Input
                        title="Servicio de Paqueteria"
                        name="parcelService"
                        type="text"
                        required={true}
                        value={order.parcelService}
                        setValue={handleChange}
                    />
                    <Input
                        title="Número de rastreo"
                        name="trackingNumber"
                        type="text"
                        required={true}
                        value={order.trackingNumber}
                        setValue={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <InputSelectStatus
                        title="Estatus"
                        name="orderStatus"
                        placeholder="Selecciona el estatus de la orden"
                        required={true}
                        value={order.orderStatus}
                        setValue={handleChangeSelect}
                        orderStatus={orderStatus}
                    />
                </div>
                <div className="col-span-full">
                    <div className="col-span-full mt-3 flex justify-center text-center">
                        {(errorOrderDetail || errorEditOrder) && (
                            <Alert title="Error" text={(errorOrderDetail || errorEditOrder)} />
                        )}
                    </div>
                    <div className="col-span-full flex justify-center text-center">
                        <Button
                            type="onSubmit"
                            color={sidenavColor}
                            className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
                            fullWidth
                        >
                            {(loadingEditOrder || loadingOrderDetail) && (
                                <img
                                    src="/assets/loader.svg"
                                    className="my-auto mr-3 h-6 w-6"
                                />
                            )}
                            {loadingEditOrder ? "Modificando..." : "Modificar"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditOrder;
