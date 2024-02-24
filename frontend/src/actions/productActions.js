import axios from "axios";
import {
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,    
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL
} from '../constants/productConstans'

export const createProductAction = (productInfo) => async (dispatch) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        });
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            "/api/products",
            { productInfo },
            config
        );
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
        dispatch({
            type: PRODUCT_CREATE_RESET,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.response,
        });
    }
}

export const getProductList = () => async (dispatch) => {
    try{
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });
        const { data } = await axios.get("/api/products");
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.response,
        });
    }
}

export const getProductAction = (id) => async (dispatch) => {
  try{
      dispatch({
          type: GET_PRODUCT_REQUEST
      });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
          type: GET_PRODUCT_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: GET_PRODUCT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response,
      });
  }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      });
      const { data } = await axios.delete(`/api/products/${id}`);
  
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: message,
      });
    }
  };