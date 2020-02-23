import { createStore, applyMiddleware, compose } from "redux";

import reducers from "./reducers";
import middlewares from "./middlewares";
import { Store } from "./reducers";

export default function createAppStore(initialState: Store = {}) {
  const store = createStore(reducers, initialState, compose(applyMiddleware(...middlewares)));
  return store;
}
