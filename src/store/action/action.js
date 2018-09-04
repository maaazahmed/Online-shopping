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
