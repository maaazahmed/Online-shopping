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



export const myOrderActioin = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.MY_ORDERS,
            payload: data, 
        })
    }
}




export const AccetedOrderActioin = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ACCEPTED_ORDER,
            payload: data, 
        })
    }
}


