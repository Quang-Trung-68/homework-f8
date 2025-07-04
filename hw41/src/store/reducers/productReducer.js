import { InitialState } from "./InitState.jsx";
import { HandlerActions } from "./HandlerActions.jsx";

const productReducer = {
  // Main method action
  handle: (state = InitialState, action) => {
    return productReducer.handlers[action.type]
      ? productReducer.handlers[action.type](state, action)
      : state;
  },

  // Object of handlers for action types
  handlers: HandlerActions.handlers,
};

export default productReducer;
