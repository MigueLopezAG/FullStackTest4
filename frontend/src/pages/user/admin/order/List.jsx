import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";
import SuccessAlert from '../../../../components/alerts/SuccessAlert'
import Loader from "../../../../components/Loader";
import { findAdviserNameById, findProductPriceById, findProductNameById } from "../../../../actions/helpers";

import { adminListAdvisers } from "../../../../actions/adviserActions";
import { getOrderList } from "../../../../actions/orderActions";
import { getProductList } from "../../../../actions/productActions";
import Delete from "./Delete";
import { ORDER_DELETE_RESET, GET_ORDER_RESET } from "../../../../constants/orderConstants";

export function OrderList() {

  const [viewModal, setViewModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const {
    userInfo,
  } = userLogin;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const orderList = useSelector((state) => state.orderList);
  const {
    loading: loadingOrders,
    error: errorOrder,
    orders,
  } = orderList;

  const editOrder = useSelector((state) => state.editOrder);
  const { message: editOrderMessage } = editOrder;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { message: deleteOrderMessage } = orderDelete;
  
  const adminAdviserList = useSelector((state) => state.adminAdviserList);
  const { advisers } = adminAdviserList;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(adminListAdvisers());
    dispatch(getProductList());
    dispatch({type: GET_ORDER_RESET})
  }, [])

  useEffect(() => {
    if(editOrderMessage) {
      dispatch(adminListAdvisers());
      dispatch(getProductList());
      dispatch({type: ORDER_DELETE_RESET});
    }
  }, [editOrderMessage])
  
  useEffect(() => {
    if (id) {
      var link = document.location.href.split("/");
      if (link[link.length - 1] === "eliminar") {
        actionOpenDeleteModal();
      }
    } else {
      setViewModal(false);
      dispatch({
        type: ORDER_DELETE_RESET,
      });
    }
  }, [orders, id]);

  const redirect = "/login";
  useEffect(() => {
    if(userInfo){
        if(userInfo.userType === 'Admin'){
            dispatch(getOrderList(userInfo.userType));
        } else {
            dispatch(getOrderList(userInfo.id))
        }
    } else {
      navigate(redirect);
    }
  }, [userInfo])
  

  const actionOpenDeleteModal = () => {
    setViewModal("delete");
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {viewModal !== false && viewModal === "delete" && (
        <Delete closeAction={() => setViewModal(false)} id={id} />
      )}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex items-center">
            <Typography variant="h6" color="white">
              Ordenes
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {loadingProducts || loadingOrders ? (
            <div className="flex w-full justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Orden ID", "Producto", "Proveedor", "Precio", ""].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {orders?.map(
                    (
                      {
                        _id,
                        productRef,
                        adviserRef
                      },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === products.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      return (
                        <tr key={_id}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {_id}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {productRef ? findProductNameById(products, productRef) : ""}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {userInfo.userType === 'Adviser' ? userInfo.tradename : findAdviserNameById(advisers, adviserRef) }
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {productRef ? "$ "+ findProductPriceById(products, productRef) : 0}
                                </Typography>
                              </div>
                            </div>
                          </td>

                          <td className={className}>
                            <Link to={`/admin/Ordenes/${_id}/editar`}>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-blue-500"
                              >
                                Editar
                              </Typography>
                            </Link>
                            {   userInfo.userType === 'Admin' &&
                                <Link to={`/admin/Order/${_id}/eliminar`}>
                                <Typography
                                    as="a"
                                    className="text-xs font-semibold text-blue-gray-600 hover:text-red-500"
                                >
                                    Eliminar
                                </Typography>
                                </Link>
                            }
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </>
          )}
        </CardBody>
      </Card>
      {editOrderMessage && (
        <SuccessAlert
          title={"Producto Editado Exitosamente"}
        />
      )}
    </div>
  );
}

export default OrderList;
