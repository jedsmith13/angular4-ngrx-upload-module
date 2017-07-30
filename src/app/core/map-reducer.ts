import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

import * as fromDragAndDrop from '../upload/reducers/drag-and-drop.reducer';
import * as fromFile from '../upload/reducers/file.reducer';

export interface State {
  dragAndDrop: fromDragAndDrop.State,
  file: fromFile.State
}

const reducers = {
  dragAndDrop: fromDragAndDrop.reducer,
  file: fromFile.reducer
}

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}