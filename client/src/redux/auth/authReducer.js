import initialState from "./initialState";
import { START_OFF, START_ON } from "./types";


const authReducer = ( state = initialState , { type, payload }) => {
    switch (type) {
        case START_ON:
            return true

        case START_OFF:
            return false

        default:
            return state
    }
}

export default authReducer