import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import * as file from '../reducers/file.reducer';
import { FilePhotoModel } from '../models/file-photo.model';
import {
  FileAddAction,
  FileClearAction,
  FileRemoveAction,
  FileChangeCaptionAction
} from '../actions/file.actions';

@Injectable()
export class FileHandlerService {
  constructor(private _store: Store<file.State>, private _http: HttpClient) {}

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
   * @param {*} files
   * @returns
   * @memberof FileHandlerService
   */
  upload(files: any) {
    // call the angular http method
    return (
      this._http
        // post the form data to the url defined above and map the response.
        .post('http://localhost:3000/upload', files)
    );
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
