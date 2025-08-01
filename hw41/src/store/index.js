import {createStore} from "redux"
import productReducer from "./reducers/productReducer"

const store = createStore(productReducer.handle)

export default store