import { Action } from '@ngrx/store';
import { FilePhotoModel } from '../models/file-photo.model';

export const FILE_ADD = '[FileAdded] FILE_ADD';

export class FileAddAction implements Action {
    readonly type = FILE_ADD;

    constructor(public payload: FilePhotoModel[]) { }
}