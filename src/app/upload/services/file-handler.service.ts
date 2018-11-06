import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import * as file from '../reducers/file.reducer';
import { FilePhotoModel } from '../models/file-photo.model';
import {
  FileAddAction,
  FileClearAction,
  FileRemoveAction
} from '../actions/file.actions';
import { Observable } from 'rxjs';

@Injectable()
export class FileHandlerService {
  constructor(
    private _store: Store<file.FileState>,
    private _http: HttpClient
  ) {}

  /**
   * @memberof FileHandler
   */
  addFile(id: number, files: FilePhotoModel[]) {
    this._store.dispatch(new FileAddAction({id, files}));
  }

  /**
   * @memberof FileHandlerService
   */
  clearFiles(id: number) {
    this._store.dispatch(new FileClearAction(id));
  }

  /**
   * @memberof FileHandlerService
   */
  removeById(id: number, fileId: string) {
    this._store.dispatch(new FileRemoveAction({id, fileId}));
  }

  /**
   * @memberof FileHandlerService
   */
  upload(files: any, url: string, options): Observable<any> {
    // call the angular http method
    return (
      this._http
        // post the form data to the url defined above and map the response.
        .post(url, files, options)
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
