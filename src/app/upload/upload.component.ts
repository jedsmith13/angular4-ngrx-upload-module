import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileHandlerService } from './services/file-handler.service';
import * as fromRootUpload from '../core/map-reducer';
import * as fromFile from '../upload/reducers/file.reducer';
import * as fromDragAndDrop from '../upload/reducers/drag-and-drop.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'upload-container',
    template: `
    <md-card>
        <md-card-header>
            <upload-header [title]="'Upload File'" [subtitle]="'Upload your best photos!'"></upload-header>
        </md-card-header>
        <md-card-content>
            <upload-body [isFileOverZone]="(dragAndDropState$ | async)?.isFileOverZone" [text]="'Drag files here'"></upload-body>
        </md-card-content>
        <md-card-actions>
            <button md-button>Upload</button>
            <button md-button (click)="onClearFiles()">Clear</button>
        </md-card-actions>

        <preview-container [images]="(filesChangesState$ | async).files"></preview-container>
    </md-card>
    `,
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    /**
     * @type {Observable<fromDragAndDrop.State>}
     * @memberof UploadComponent
     */
    dragAndDropState$: Observable<fromDragAndDrop.State>;


    /**
     * @type {Observable<fromFile.State>}
     * @memberof UploadComponent
     */
    filesChangesState$: Observable<fromFile.State>;


    constructor(private _store: Store<fromRootUpload.State>, private _fileHandler: FileHandlerService) { }


    ngOnInit() {
        this.dragAndDropState$ = this._store.select('dragAndDrop');
        this.filesChangesState$ = this._store.select('file');
    }


    /**
     * @memberof UploadComponent
     */
    onClearFiles() {
        this._fileHandler.clearFiles();
    }
}