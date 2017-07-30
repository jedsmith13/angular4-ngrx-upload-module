import { Action } from '@ngrx/store';

export const FILE_REMOVE = '[File] FILE_REMOVE';

export class FileRemoveAction implements Action {
    readonly type = FILE_REMOVE;

    constructor(public payload: string) {}
}