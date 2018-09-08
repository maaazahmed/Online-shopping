import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    requestList: [],
    categoryList: [],
    categoryData: [],
    myProducts: [],
    selectedProduct: [],
    reJectedOrders: [],
    sellerList: [],
    orderList: [],
    myOrders: [],
    orderDetails: {},
    categoryID: "",
    shopkeeperID: "",
    coverImage: "",
    coverImageUrl: "",

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_LIST:
            return ({
                ...state,
                requestList: action.payload
            })
        case ActionTypes.CATEGORY_LIST:
            return ({
                ...state,
                categoryList: action.payload
            })
        case ActionTypes.CATEGORY_DATA:
            return ({
                ...state,
                categoryData: action.payload
            })
        case ActionTypes.CATEGORY_ID:
            return ({
                ...state,
                categoryID: action.payload
            })
        case ActionTypes.COVER_IMAGE:
            return ({
                ...state,
                coverImage: action.payload
            })
        case ActionTypes.MY_PRODUCT:
            return ({
                ...state,
                myProducts: action.payload
            })
        case ActionTypes.SELECTED_PRODUCTS:
            return ({
                ...state,
                selectedProduct: action.payload
            })
        case ActionTypes.SELLER_LIST:
            return ({
                ...state,
                sellerList: action.payload
            })
        case ActionTypes.SHOPKEEPER_ID:
            return ({
                ...state,
                shopkeeperID: action.payload
            })
        case ActionTypes.ORDER_LIST:
            return ({
                ...state,
                orderList: action.payload,
                coverImageUrl: action.coverImageUrl

            })
        case ActionTypes.ORDER_DETAILS:
            return ({
                ...state,
                orderDetails: action.payload,

            })
        case ActionTypes.ACCEPTED_ORDERS:
            return ({
                ...state,
                myOrders: action.payload,

            })
        case ActionTypes.REJECTED_ORDER:
            return ({
                ...state,
                reJectedOrders: action.payload,

            })
        default:
            return state;
    }

}
// shopkeeperID
