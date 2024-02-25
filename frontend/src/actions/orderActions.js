import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,
    ORDER_CREATE_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,    
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    EDIT_ORDER_REQUEST,
    EDIT_ORDER_SUCCESS,
    EDIT_ORDER_FAIL,
    EDIT_ORDER_RESET
} from '../constants/orderConstants'

export const createOrderAction = (orderInfo) => async (dispatch) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        });
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            "/api/orders",
            orderInfo ,
            config
        );
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
        dispatch({
            type: ORDER_CREATE_RESET,
        });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.response,
        });
    }
}

export const editOrderAction = (orderRef, orderInfo) => async (dispatch) => {
  try{
      dispatch({
          type: EDIT_ORDER_REQUEST
      });
      const config = {
          headers: {
            "Content-Type": "application/json",
          },
      };
      const { data } = await axios.put(
          "/api/orders/" + orderRef,
          orderInfo ,
          config
      );
      dispatch({
          type: EDIT_ORDER_SUCCESS,
          payload: data,
      });
      dispatch({
          type: EDIT_ORDER_RESET,
      });
  } catch (error) {
      dispatch({
          type: EDIT_ORDER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response,
      });
  }
}

export const getOrderList = (userType) => async (dispatch) => {
    try{
        dispatch({
            type: ORDER_LIST_REQUEST
        });
        const { data } = await axios.get("/api/orders/orderList/"+userType);
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.response,
        });
    }
}

export const getOrderAction = (id) => async (dispatch) => {
  try{
      dispatch({
          type: GET_ORDER_REQUEST
      });
      const { data } = await axios.get(`/api/orders/${id}`);
      dispatch({
          type: GET_ORDER_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: GET_ORDER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response,
      });
  }
}

export const deleteOrder = (id) => async (dispatch) => {
    try {
      dispatch({
        type: ORDER_DELETE_REQUEST,
      });
      const { data } = await axios.delete(`/api/order/${id}`);
  
      dispatch({
        type: ORDER_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ORDER_DELETE_FAIL,
        payload: message,
      });
    }
  };