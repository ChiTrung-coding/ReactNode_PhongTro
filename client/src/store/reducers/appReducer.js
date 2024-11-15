import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    categories: [],
    prices: [],
    areas: [],
    provinces: []
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        //categories
        case actionTypes.GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories || [],
                msg: action.msg || '',
            }
        //price
        case actionTypes.GET_PRICES:
            return {
                ...state,
                prices: action.prices || [],
                msg: action.msg || '',
            }

        //area
        case actionTypes.GET_AREAS:
            return {
                ...state,
                areas: action.areas || [],
                msg: action.msg || '',
            }

        //provices
        case actionTypes.GET_PROVINCES:
            return {
                ...state,
                provinces: action.provinces || [],
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default appReducer