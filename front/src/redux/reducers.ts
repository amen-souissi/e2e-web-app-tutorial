import { combineReducers } from "redux";
import { i18nReducer } from "react-redux-i18n";

import * as actionTypes from "./actionTypes";
import { Locality } from "./actions";

export interface Store {
  currentChannel?: string | null;
}

export const currentChannel = (
  state: string | null = null,
  action: Locality
) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_CHANNEL: {
      const { channelId } = action;
      return channelId;
    }
    default:
      return state;
  }
};

export default combineReducers({
  // add reducers
  currentChannel: currentChannel,
  i18n: i18nReducer
});
