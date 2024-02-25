import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import Loader from "../../../../components/Loader";
import {
  PRODUCT_DELETE_RESET
} from "../../../../constants/productConstans";
import { findAdviserNameById } from "../../../../actions/helpers";
import { adminListAdvisers } from "../../../../actions/adviserActions";
import { getProductList } from "../../../../actions/productActions";
import Delete from "./Delete";

export function ProductList() {

  const [viewModal, setViewModal] = useState(false);

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;
  
  const adminAdviserList = useSelector((state) => state.adminAdviserList);
  const { advisers } = adminAdviserList;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const redirect = "/login";

  useEffect(() => {
    dispatch(adminListAdvisers());
    dispatch(getProductList());
  }, [])
  
  useEffect(() => {

    if (id) {
      var link = document.location.href.split("/");
      if (link[link.length - 1] === "eliminar") {
        actionOpenDeleteModal();
      }
    } else {
      setViewModal(false);
      dispatch({
        type: PRODUCT_DELETE_RESET,
      });
    }

  }, [products, id]);

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
              Productos
            </Typography>

            <div className="flex w-full flex-wrap items-center justify-end  gap-3">
              <Link to="/admin/Productos/crear" className="justify-end">
                <Button variant="gradient" color="white">
                  Crear
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {loadingProducts ? (
            <div className="flex w-full justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Nombre", "Categoria", "Proveedor", "Precio", ""].map((el) => (
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
                  {products?.map(
                    (
                      {
                        _id,
                        name,
                        category,
                        adviserRef,
                        price
                      },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === products.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      return (
                        <tr key={name}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {name}
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
                                  {category ? category : ""}
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
                                  {adviserRef ? findAdviserNameById(advisers, adviserRef): ""}
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
                                  {price ? "$ "+ price : ""}
                                </Typography>
                              </div>
                            </div>
                          </td>

                          <td className={className}>
                            <Link to={`/admin/Productos/${_id}/editar`}>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-blue-500"
                              >
                                Editar
                              </Typography>
                            </Link>
                            <Link to={`/admin/Productos/${_id}/eliminar`}>
                              <Typography
                                as="a"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-red-500"
                              >
                                Eliminar
                              </Typography>
                            </Link>
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
    </div>
  );
}

export default ProductList;
