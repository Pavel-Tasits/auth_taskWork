/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectCode = () =>
  createSelector(
    selectHome,
    homeState => homeState.responseCode,
  );

export { selectHome, makeSelectCode };
