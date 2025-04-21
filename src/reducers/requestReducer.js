export default function requestReducer(state, action) {

    switch (action.type) {
        case "SET_REQUESTS":
            return {...state, requests: action.payload};
        case "ADD_REQUESTS":
            return {...state, requests: [...state.requests, action.payload]};
        case "UPDATE_REQUESTS":
            return {
                ...state, requests: state.requests.map(request => 
                    request.id === action.payload.id ? action.payload : request
                ),
                editingrequest: null
            };
        case "DELETE_REQUESTS":
            if (state.editingrequest && state.editingrequest.id === action.payload.id) {
                return {
                    ...state,
                    requests: state.requests.filter(request =>
                        request.id !== action.payload.id
                    ),
                    editingrequest: null
                }
            }
            else {
                return {
                    ...state,
                    requests: state.requests.filter(request => 
                        request.id !== action.payload.id)
                };
            }
        case "SET_EDITING_REQUESTS":
            return {
                ...state, editingrequest: action.payload
            };
        case "CLEAR_EDITING_REQUESTS":
            return {
                ...state, editingrequest: null
            }
        case "SET_SORTING":
            return {
                ...state,
                sortPreference: action.payload,
            };
        default:
            return state;
    }
}