import { Action } from '@ngrx/store';

export const FILE_CLEAR = '[FileClearAction] FILE_CLEAR';

export class FileClearAction implements Action {
    readonly type = FILE_CLEAR;
}