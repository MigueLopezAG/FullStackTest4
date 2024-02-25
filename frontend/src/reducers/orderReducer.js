import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,
    ORDER_CREATE_FAIL,
  
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_RESET,
    ORDER_LIST_FAIL,
    
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_RESET,
    ORDER_DELETE_FAIL,
  
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    GET_ORDER_RESET,

    EDIT_ORDER_REQUEST,
    EDIT_ORDER_SUCCESS,
    EDIT_ORDER_FAIL,
    EDIT_ORDER_RESET
  } from '../constants/orderConstants'
  
  export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true };
      case ORDER_CREATE_SUCCESS:
        return { loading: false, message: action.payload.message };
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const editOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case EDIT_ORDER_REQUEST:
        return { loading: true };
      case EDIT_ORDER_SUCCESS:
        return { loading: false, message: action.payload.message };
      case EDIT_ORDER_FAIL:
        return { loading: false, error: action.payload };
      case EDIT_ORDER_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const getOrderListReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload.orders };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_LIST_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const getOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ORDER_REQUEST:
        return { loading: true };
      case GET_ORDER_SUCCESS:
        return { loading: false, order: action.payload.order };
      case GET_ORDER_FAIL:
        return { loading: false, error: action.payload };
      case GET_ORDER_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_DELETE_REQUEST:
        return { loading: true };
      case ORDER_DELETE_SUCCESS:
        return { loading: false, message: action.payload.message };
      case ORDER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };