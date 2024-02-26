import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProductAction, editProductAction, getProductAction } from "../../../../actions/productActions";
import { getLoginData } from "../../../../actions/userActions";
import { Input, InputFile, InputSelectAdvisers } from "../../../../components/elements/ProductsInputs";

import Alert from "../../../../components/alerts/Alert";
import { PRODUCT_CREATE_RESET, GET_PRODUCT_RESET } from "../../../../constants/productConstans";
import {
    Button,
} from "@material-tailwind/react";
import { useMaterialTailwindController } from "../../../../context";

export function CreateProduct() {
    const { id } = useParams();
    const isEdit = id ? true : false

    const [product, setProduct] = useState({
        name: "",
        adviserRef: "",
        category: "",
        description: "",
        price: '',
        base64textString: '',
        imageName: '',
        imageUrl: ''
    });
    const [image, setImage] = useState()

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [controller, setController] = useMaterialTailwindController();
    const { sidenavColor, sidenavType, openSidenav } = controller;

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const createProduct = useSelector((state) => state.createProduct);
    const {
        loading: loadingCreateProduct,
        error: errorCreateProduct,
        message: messageCreateProduct,
    } = createProduct;

    const editProduct = useSelector((state) => state.editProduct);
    const {
        loading: loadingEditProduct,
        error: errorEditProduct,
        message: messageEditProduct,
    } = editProduct;

    const productDetail = useSelector((state) => state.productDetail);
    const {
        loading: loadingProductDetail,
        error: errorProductDetail,
        product: productInfo
    } = productDetail;

    const adminAdviserList = useSelector((state) => state.adminAdviserList);
    const { advisers } = adminAdviserList;

    const handleChange = (e) =>
        setProduct((prevState) => ({
            ...prevState,
            [e.target.name.split(".")[0]]:
                e.target.name.split(".").length === 2
                    ? {
                        ...prevState[e.target.name.split(".")[0]],
                        [e.target.name.split(".")[1]]: e.target.value,
                    }
                    : e.target.value,
        }));
        
    const handleImageChange = (e) => {

        if(e){
            const reader = new FileReader();
            reader.readAsDataURL(e);

            reader.onload = () => {
                setImage(e)
                setProduct((prevState) => ({
                    ...prevState,
                    base64textString: reader.result,
                    imageName: e.name
                }));
            };

            reader.onerror = (error) => {
            console.log('Error: ', error);
            };
        } else {
            setProduct((prevState) => ({
                ...prevState,
                base64textString: '',
                imageName: ''
            }));
        }
    }

    const handleChangeSelect = (e) => {
        setProduct((prevState) => ({
            ...prevState,
            adviserRef: e.target.value
        }));
    }

    const submitHandler = () => {
        if(isEdit){
            dispatch(editProductAction(id, product))
        } else {
            dispatch(createProductAction(product));
        }
    };
    const redirect = "/login";
    //Validar la sesion del usuario y controlar la redireccion
    useEffect(() => {
        if (messageCreateProduct || messageEditProduct) {
            navigate("/admin/Productos");
        }
        if (!userInfo) {
            dispatch(getLoginData());
        } else if (userInfo.userType !== "Admin") {
            navigate(redirect);
        }
    }, [userInfo, messageCreateProduct, messageEditProduct ]);

    useEffect(() => {
        if(isEdit){
            dispatch(getProductAction(id))
        } else {
            dispatch({ type: GET_PRODUCT_RESET });
        }
    }, [id])
 
    useEffect(() => {
      if(productInfo && isEdit) {
        setProduct({
            name: productInfo[0].name || '',
            adviserRef: productInfo[0].adviserRef || '',
            price: productInfo[0].price || '',
            category: productInfo[0].category || '',
            description: productInfo[0].description ||'',
            imageUrl: productInfo[0].image.url ||'',
            imageName: productInfo[0].image.filename || ''
        })
      } else {
        setProduct({
            name: '',
            adviserRef: '',
            price: '',
            category: '',
            description: '',
            imageUrl: '',
            imageName: ''
        })
      }
    }, [productInfo])
    
    useEffect(() => {
      if(advisers.length !== 0){
        setProduct({
            ...product,
            adviserRef: advisers[0]._id
        })
      }
    }, [advisers])
    
    

    return (
        <div className="bg-slate-50 p-4">
            <h2 className="text-palette-primary text-xl font-bold">{isEdit ? 'Editar Producto' : 'Agregar Producto'}</h2>
            <form
                className="mt-3 grid gap-6 md:grid-cols-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler();
                }}
            >
                <div className="flex flex-col gap-3 md:grid-cols-1 md:grid-rows-2">
                    <Input
                        title="Nombre"
                        name="name"
                        type="text"
                        required={true}
                        value={product.name}
                        setValue={handleChange}
                    />
                    <InputSelectAdvisers
                        title="Proveedor"
                        name="adviserRef"
                        placeholder="Selecciona el proveedor"
                        required={true}
                        value={product.adviserRef}
                        setValue={handleChangeSelect}
                        advisers={advisers}
                    />
                    <Input
                        title="Precio"
                        name="price"
                        type="number"
                        required={true}
                        value={product.price}
                        setValue={handleChange}
                    />
                    <Input
                        title="Categoria"
                        name="category"
                        type="text"
                        required={true}
                        value={product.category}
                        setValue={handleChange}
                    />
                    <Input
                        title="Descripción"
                        name="description"
                        type="text"
                        required={true}
                        value={product.description}
                        setValue={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <InputFile
                        title="Imagen del Producto"
                        name="image"
                        required={true}
                        value={product.imageUrl !== '' ? product.imageUrl: image}
                        setValue={handleImageChange}
                        url={product.imageUrl}
                        removeImage={()=>{
                            setProduct({
                                ...product,
                                imageUrl: ''
                            })
                        }}
                    />
                </div>
                <div className="col-span-full">
                    <div className="col-span-full mt-3 flex justify-center text-center">
                        {(errorCreateProduct || errorProductDetail || errorEditProduct) && (
                            <Alert title="Error" text={(errorCreateProduct || errorProductDetail || errorEditProduct)} />
                        )}
                    </div>
                    <div className="col-span-full flex justify-center text-center">
                        <Button
                            type="onSubmit"
                            color={sidenavColor}
                            className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
                            fullWidth
                        >
                            {(loadingCreateProduct || loadingProductDetail || loadingEditProduct) && (
                                <img
                                    src="/assets/loader.svg"
                                    className="my-auto mr-3 h-6 w-6"
                                />
                            )}
                            {loadingCreateProduct ? isEdit ? "Modificando..." : "Creando...": isEdit ? "Modificar" : "Crear"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateProduct;
