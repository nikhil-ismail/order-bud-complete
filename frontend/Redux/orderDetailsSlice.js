import { SET_ADDRESS, CLEAR_ADDRESS, SET_IS_DELIVERY } from './constants';

// ACTIONS
export const setAddress = (payload) => {
    return {
        type: SET_ADDRESS,
        payload
    }
}

export const setIsDelivery = (payload) => {
    return {
        type: SET_IS_DELIVERY,
        payload
    }
}

export const clearAddress = () => {
    return {
        type: CLEAR_ADDRESS
    }
}


// REDUCER
const initialState = { delivery: true };
export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADDRESS:
            console.log(action.payload);
            return {
                ...state,
                address: {
                    fullAddress: action.payload.fullAddress,
                    mainText: action.payload.addressPrimaryText,
                    secondaryText: action.payload.addressSecondaryText,
                    placeId: action.payload.addressPlaceId
                }
            }
        case SET_IS_DELIVERY:
            return {
                ...state,
                delivery: action.payload
            }
        case CLEAR_ADDRESS:
            return state = { delivery: true }
    }
    return state;
}


// SELECTOR
export const selectAddress = (state) => state.orderDetails.address;
export const selectIsDelivery = (state) => state.orderDetails.delivery;
