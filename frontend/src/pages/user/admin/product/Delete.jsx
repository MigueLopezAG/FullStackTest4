import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {deleteProduct} from "../../../../actions/productActions";
import Loader from "../../../../components/Loader";
import { findProductNameById } from "../../../../actions/helpers";

export function ProductDelete({ closeAction, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorProducts,
    message
  } = productDelete;

  useEffect(() => {
    if (message) {
      navigate("/admin/Productos");
    }
  }, [message]);

  const submitHandler = () => {
    dispatch(deleteProduct(id));
  };
  
  const closeHandler = () => {
    navigate("/admin/Productos");
  };
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30">
        {loadingDelete || loading ? (
          <Loader />
        ) : (
          <div className="relative max-h-[90%]  w-11/12 overflow-hidden rounded-md bg-white shadow lg:w-1/2 2xl:w-2/6">
            <div className="flex w-full items-center justify-between rounded-t-md bg-blue-gray-800 p-2 px-4 text-white">
              <h2 className="text-2xl  text-white">Eliminar Producto</h2>
              <button
                type="button"
                onClick={closeHandler}
                className="text-2xl font-bold hover:text-red-600"
              >
                <MdClose />
              </button>
            </div>
            <form
              className="flex flex-col gap-2 "
              onSubmit={(e) => {
                e.preventDefault();
                submitHandler();
              }}
            >
              <div className="flex flex-col justify-center gap-3">
                <div className="my-3 flex justify-center">
                  <AiOutlineWarning className="h-24 w-24 fill-red-600" />
                </div>
                <div className="my-3 flex justify-center">
                  ¿Seguro que deseas eliminar este producto?
                </div>

                <div className="flex w-full justify-center px-6 text-2xl">
                  <div className="flex h-12 w-1/2 justify-end">
                    <p className="my-auto">Nombre:</p>
                  </div>
                  <div className="mx-3 flex w-1/2 justify-center">
                    <input
                      className="mx-2 flex w-full rounded-md border-2 p-2 text-center font-bold outline-none focus:border-blue-500"
                      defaultValue={findProductNameById(products, id)}
                      disabled
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-center text-center">
                  <button className="mb-6 flex rounded-full bg-red-300 p-2 px-4 text-lg text-gray-300 hover:bg-red-900 hover:text-white hover:shadow-2xl">
                    {loadingDelete && (
                      <img
                        src="/assets/loader.svg"
                        className="my-auto mr-3 h-6 w-6"
                      />
                    )}
                    {loadingDelete ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDelete;
