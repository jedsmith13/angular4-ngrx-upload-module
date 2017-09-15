import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import * as file from '../reducers/file.reducer';
import { FilePhotoModel } from '../models/file-photo.model';
import { FileAddAction } from '../actions/file-add.action';
import { FileClearAction } from '../actions/file-clear.action';
import { FileRemoveAction } from '../actions/file-remove.action';
import { FileChangeCaptionAction } from '../actions/file-change-caption.action';

@Injectable()
export class FileHandlerService {
    constructor(private _store: Store<file.State>, private _http: Http) { }


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


    /**
     * 
     * 
     * @param {*} files 
     * @returns 
     * @memberof FileHandlerService
     */
    upload(files: any) {
        //call the angular http method
        return this._http
            //post the form data to the url defined above and map the response.
            .post('localhost', files).map((res: Response) => res.json());
    }


    // /**
    //  * Change file/image caption by file id.
    //  * 
    //  * @param {any} id 
    //  * @param {any} caption 
    //  * @memberof FileHandlerService
    //  */
    // changeCaptionById(id, caption) {
    //     this._store.dispatch(new FileChangeCaptionAction({id, caption}));
    // }
}