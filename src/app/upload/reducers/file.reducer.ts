import { ActionReducer } from '@ngrx/store';

import { FilePhotoModel } from '../models/file-photo.model';
import {
  FILE_ADD,
  FILE_CLEAR,
  FILE_REMOVE,
  FILE_CHANGE_CAPTION,
  FileActions
} from '../actions/file.actions';

export interface State {
  files: FilePhotoModel[];
}

export const initialState: State = {
  files: []
};

const CLASS = 'FILE-MANAGMENT-REDUCER';

export const reducer: ActionReducer<State> = (
  state = initialState,
  action: FileActions
) => {
  switch (action.type) {
    case FILE_ADD:
      console.log(
        `[${CLASS}] Added new file/files to preview before submition => `,
        state.files.concat(action.payload)
      );

      return Object.assign({}, state, {
        files: state.files.concat(action.payload)
      });
    // case FILE_CHANGE_CAPTION: {
    //     console.log(`[${CLASS}] Changing caption for image => `, action.payload.id);

    //     let newFilesState = state.files.map(file => {
    //         return file.id === action.payload.id ? Object.assign({}, file, { caption: action.payload.caption }) : file;
    //     });

    //     return Object.assign({}, state, { files: state.files.concat(newFilesState) });
    // }
    case FILE_CLEAR:
      console.log(`[${CLASS}] Cleaning all files from store.`);

      return initialState;
    case FILE_REMOVE:
      const fileId = action.payload;

      console.log(
        `[${CLASS}] Removing file from files by file guid => `,
        fileId
      );

      const newFilesState = state.files.filter(file => {
        if (file.id !== fileId) {
            return file;
        }
      });

      return Object.assign({}, state, { files: newFilesState });
    default:
      return state;
  }
};
