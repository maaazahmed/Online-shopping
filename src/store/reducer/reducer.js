import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    requestList: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_LIST:
            return ({
                ...state,
                requestList: action.payload
            })
        default:
            return state;
    }

}