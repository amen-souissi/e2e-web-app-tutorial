import * as actionTypes from './actionTypes';

export interface UpdateCurrentChannel {
  type: actionTypes.UPDATE_CURRENT_CHANNEL;
  channelId: string | null;
}

export const updateCurrentChannel = (
  channelId?: string
): UpdateCurrentChannel => {
  return {
    type: actionTypes.UPDATE_CURRENT_CHANNEL,
    channelId: channelId || null,
  };
};

export type Locality = UpdateCurrentChannel; // | ...;
