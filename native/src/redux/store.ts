import { createStore, applyMiddleware, compose } from "redux";
import { loadTranslations, setLocale, syncTranslationWithStore } from "react-redux-i18n";

import reducers from "./reducers";
import middlewares from "./middlewares";
import { getTranslations } from "../utils/i18n";
import { DEFAULT_LOCALE } from "../constants";
import { Store } from "./reducers";

export default function createAppStore(initialState: Store = {}) {
  const store = createStore(reducers, initialState, compose(applyMiddleware(...middlewares)));
  syncTranslationWithStore(store);
  const userLocale = DEFAULT_LOCALE;
  //@ts-ignore Property 'type' is missing in type 'DispatchCallback<any>'
  store.dispatch(loadTranslations(getTranslations()));
  //@ts-ignore Property 'type' is missing in type 'DispatchCallback<any>'
  store.dispatch(setLocale(userLocale));
  return store;
}
