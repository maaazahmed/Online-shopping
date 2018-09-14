import ActionTypes from "../constant/constant"


export const requestList = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.REQUEST_LIST,
            payload: data
        })
    }
}



export const categoryList = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CATEGORY_LIST,
            payload: data
        })
    }
}



export const categoryID = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CATEGORY_ID,
            payload: data
        })
    }
}



export const categoryData = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CATEGORY_DATA,
            payload: data
        })
    }
}


export const coverImageUrl = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.COVER_IMAGE,
            payload: data
        })
    }
}




export const myProducts = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.MY_PRODUCT,
            payload: data
        })
    }
}



export const selectedProducts = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SELECTED_PRODUCTS,
            payload: data
        })
    }
}


export const sellerList = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SELLER_LIST,
            payload: data
        })
    }
}


export const shopkeeperID = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SHOPKEEPER_ID,
            payload: data
        })
    }
}


export const orderList = (data, coverImageUrl) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ORDER_LIST,
            payload: data, 
            coverImageUrl:coverImageUrl
        })
    }
}


export const orderDetailsAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ORDER_DETAILS,
            payload: data, 
        })
    }
}
export const accetedOrder = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ACCEPTED_ORDERS,
            payload: data, 
        })
    }
}



export const rejectedOrdersData = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.REJECTED_ORDER,
            payload: data, 
        })
    }
}



export const SignInRout = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SIGN_IN_ROUT,
            payload: data, 
        })
    }
}


export const DashboardRout = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.DASHBOARD_ROUT,
            payload: data, 
        })
    }
}

export const devicesToken = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.DEVICES_TOKEN,
            payload: data, 
        })
    }
}


export const SignOutAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SIGN_OUT,
            payload: data, 
        })
    }
}








