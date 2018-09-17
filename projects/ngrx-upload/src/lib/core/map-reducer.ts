import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromDragAndDrop from '../upload/reducers/drag-and-drop.reducer';
import * as fromFile from '../upload/reducers/file.reducer';

export interface State {
  dragAndDrop: fromDragAndDrop.DragAndDropState;
  file: fromFile.FileState;
}

export const reducers = {
  dragAndDrop: fromDragAndDrop.dragAndDropReducer,
  file: fromFile.fileReducer
};

export const getFileUploadState = createFeatureSelector<State>(
  'file-upload'
);

export const getFile = createSelector(
  getFileUploadState,
  (state: State): fromFile.FileState => state.file ? state.file : fromFile.initialState
);

export const getDragAndDrop = createSelector(
  getFileUploadState,
  (state: State): fromDragAndDrop.DragAndDropState => state.dragAndDrop ? state.dragAndDrop : fromDragAndDrop.initialState
);
