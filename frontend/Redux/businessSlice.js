import { SET_BUSINESS_ADDRESS } from './constants';

// ACTIONS
export const setBusinessAddress = (payload) => {
    return {
        type: SET_BUSINESS_ADDRESS,
        payload
    }
}


// REDUCER
const initialState = {};
export const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUSINESS_ADDRESS:
            return {
                ...state,
                address: {
                    fullAddress: action.payload.fullAddress,
                    mainText: action.payload.mainText,
                    secondaryText: action.payload.secondaryText,
                    placeId: action.payload.placeId
                }
            }
    }
    return state;
}


// SELECTOR
export const selectBusinessAddress = (state) => Object.keys(state.userDetails).length !== 0 ? state.businessDetails.address : 'No Address Given';