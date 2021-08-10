import produce from 'immer';
import { RESPONSE_CODE } from './constants';

export const initialState = {
  responseCode: '',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESPONSE_CODE:
        draft.responseCode = action.responseCode;
        break;
    }
  });

export default homePageReducer;
