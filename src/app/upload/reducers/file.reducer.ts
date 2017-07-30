import { ActionReducer, Action } from '@ngrx/store';
import { FilePhotoModel } from '../models/file-photo.model';
import { FILE_ADD } from '../actions/file-add.action';
import { FILE_CLEAR } from '../actions/file-clear.action';
import { FILE_REMOVE } from '../actions/file-remove.action';

export interface State {
    files: FilePhotoModel[];
}

export const initialState: State = {
    files: []
}

const CLASS = 'FILE-MANAGMENT-REDUCER';

export const reducer: ActionReducer<State> = (state = initialState, action: Action) => {
    switch (action.type) {
        case FILE_ADD:
            console.log(`[${CLASS}] Added new file/files to preview before submition => `, state.files.concat(action.payload));

            return Object.assign({}, state, { files: state.files.concat(action.payload) });
        case FILE_CLEAR:
            console.log(`[${CLASS}] Cleaning all files from store.`);

            return Object.assign({}, state, { files: [] });
        case FILE_REMOVE:
            let fileId = action.payload;

            console.log(`[${CLASS}] Removing file from files by file guid => `, fileId);

            let newFilesState = state.files.filter(file => {
                if (file.id !== fileId) return file;
            })

            return Object.assign({}, state, { files: newFilesState });
        default:
            return state;
    }
}