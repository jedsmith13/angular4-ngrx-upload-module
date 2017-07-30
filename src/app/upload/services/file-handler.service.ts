import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as file from '../reducers/file.reducer';
import { FilePhotoModel } from '../models/file-photo.model';
import { FileAddAction } from '../actions/file-add.action';
import { FileClearAction } from '../actions/file-clear.action';
import { FileRemoveAction } from '../actions/file-remove.action';

@Injectable()
export class FileHandlerService {
    constructor(private _store: Store<file.State>) {}


    /**
     * @param {File[]} files 
     * @memberof FileHandler
     */
    addFile(files: FilePhotoModel[]) {
        this._store.dispatch(new FileAddAction(files));
    }


    /**
     * @memberof FileHandlerService
     */
    clearFiles() {
        this._store.dispatch(new FileClearAction());
    }


    /**
     * @param {any} id 
     * @memberof FileHandlerService
     */
    removeById(id) {
        this._store.dispatch(new FileRemoveAction(id));
    }
}