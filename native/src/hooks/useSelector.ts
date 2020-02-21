import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";

import { Store } from "../redux/reducers";

const useSelector: TypedUseSelectorHook<Store> = useReduxSelector;

export default useSelector;
