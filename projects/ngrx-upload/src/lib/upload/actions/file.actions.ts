import { Action } from '@ngrx/store';
import { FilePhotoModel } from '../models/file-photo.model';

export const FILE_ADD = '[FileAdded] FILE_ADD';

export class FileAddAction implements Action {
    readonly type = FILE_ADD;

    constructor(public payload: FilePhotoModel[]) { }
}

export const FILE_CHANGE_CAPTION = '[FileChangeCaption] FILE_CHANGE_CAPTION';

export class FileChangeCaptionAction implements Action {
    readonly type = FILE_CHANGE_CAPTION;

    constructor(public payload: any) { }
}

export const FILE_CLEAR = '[FileClearAction] FILE_CLEAR';

export class FileClearAction implements Action {
    readonly type = FILE_CLEAR;
}

export const FILE_REMOVE = '[File] FILE_REMOVE';

export class FileRemoveAction implements Action {
    readonly type = FILE_REMOVE;

    constructor(public payload: string) {}
}

export type FileActions =
    FileAddAction |
    FileChangeCaptionAction |
    FileClearAction |
    FileRemoveAction;
