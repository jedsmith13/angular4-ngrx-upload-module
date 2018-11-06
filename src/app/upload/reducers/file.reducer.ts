import { FilePhotoModel } from '../models/file-photo.model';
import {
  FILE_ADD,
  FILE_CLEAR,
  FILE_REMOVE,
  FILE_CHANGE_CAPTION,
  FileActions
} from '../actions/file.actions';

export interface FileState {
  files: { [id: number]: FilePhotoModel[] };
}

export const initialState: FileState = {
  files: {}
};

// const CLASS = 'FILE-MANAGMENT-REDUCER';

export function fileReducer(
  state: FileState = initialState,
  action: FileActions
) {
  switch (action.type) {
    case FILE_ADD:
      // console.log(
      //   `[${CLASS}] Added new file/files to preview before submition => `,
      //   state.files.concat(action.payload)
      // );
      const id = action.payload.id;
      let files = [];
      if (state.files[id]) {
        files = [...state.files[id]];
      }

      files = [...files, ...action.payload.files];

      return { ...state, files: { ...state.files, [id]: files } };
    // case FILE_CHANGE_CAPTION: {
    //     console.log(`[${CLASS}] Changing caption for image => `, action.payload.id);

    //     let newFilesState = state.files.map(file => {
    //         return file.id === action.payload.id ? Object.assign({}, file, { caption: action.payload.caption }) : file;
    //     });

    //     return Object.assign({}, state, { files: state.files.concat(newFilesState) });
    // }
    case FILE_CLEAR:
      // console.log(`[${CLASS}] Cleaning all files from store.`);

      return { ...state, files: { ...state.files, [action.payload]: [] } };
    case FILE_REMOVE:
      const fileGroupId = action.payload.id;
      const fileId = action.payload.fileId;

      // console.log(
      //   `[${CLASS}] Removing file from files by file guid => `,
      //   fileId
      // );

      const newFiles = state.files[fileGroupId].filter(file => {
        if (file.id !== fileId) {
          return file;
        }
      });

      return { ...state, files: { ...state.files, [fileGroupId]: newFiles } };
    default:
      return state;
  }
}
