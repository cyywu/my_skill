import { BUY_CAKE } from './cakeType'

const initialCakeState = {
    numOfCakes : 10
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

export default cakeReducer