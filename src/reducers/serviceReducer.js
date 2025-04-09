export default function serviceReducer(state, action) {

    switch (action.type) {
        case "ADD_SERVICE":
            return {...state, services: [...state.tickets, action.payload]};
        case "UPDATE_SERVICE":
            return {
                ...state, services: state.services.map(service => 
                    service.id === action.payload.id ? action.payload : service
                ),
                editingService: null
            };
        case "DELETE_SERVICE":
            if (state.editingService && state.editingService.id === action.payload.id) {
                return {
                    ...state,
                    services: state.services.filter(service =>
                        service.id !== action.payload.id
                    ),
                    editingService: null
                }
            }
            else {
                return {
                    ...state,
                    services: state.services.filter(service => 
                        service.id !== action.payload.id)
                };
            }
        case "SET_EDITING_SERVICE":
            return {
                ...state, editingService: action.payload
            };
        case "CLEAR_EDITING_SERVICE":
            return {
                ...state, editingService: null
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