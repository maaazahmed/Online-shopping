import ActionTypes from "../constant/constant"


export const requestList = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.REQUEST_LIST,
            payload: data
        })
    }
}
