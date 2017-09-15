import { Action } from '@ngrx/store';

export const FILE_CHANGE_CAPTION = '[FileChangeCaption] FILE_CHANGE_CAPTION';

export class FileChangeCaptionAction implements Action {
    readonly type = FILE_CHANGE_CAPTION;

    constructor(public payload: any) { }
}