import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileHandlerService } from './services/file-handler.service';
import * as fromRootUpload from '../core/map-reducer';
import * as fromFile from '../upload/reducers/file.reducer';
import * as fromDragAndDrop from '../upload/reducers/drag-and-drop.reducer';
import { Observable } from 'rxjs/Observable';

const CLASS = 'UploadComponent';

@Component({
    selector: 'upload-container',
    template: `
    <div class="upload-container-wrapper">
    <md-card>
        <md-card-header>
            <upload-header [title]="'Upload Your Best Pics ;)'" [subtitle]="'You can upload 10 photos max.'"></upload-header>
        </md-card-header>
        <md-card-content>
            <upload-body [currentStoreFileCount]="currentStoreFileCount"  [isFileOverZone]="(dragAndDropState$ | async)?.isFileOverZone" [text]="'Drag files here'">
            </upload-body>
        </md-card-content>
        <md-card-actions *ngIf="files.length > 0">
            <button md-button (click)="onClearFiles()">Remove All Photos From Preview</button>
        </md-card-actions>
    </md-card>

    <md-card *ngIf="files.length > 0">
        <preview-container [files]="files" (onUploadFilesEmitter)="onUploadFiles($event)"></preview-container>
    </md-card>
    </div>
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


    /**
     * 
     */
    files: Array<any> = [];


    /**
     * @type {number}
     * @memberof UploadComponent
     */
    currentStoreFileCount: number;


    constructor(private _store: Store<fromRootUpload.State>, private _fileHandler: FileHandlerService) { }


    ngOnInit() {
        this.dragAndDropState$ = this._store.select('dragAndDrop');
        this.filesChangesState$ = this._store.select('file');

        this.filesChangesState$.subscribe(fileChangeState => {
            this.files = fileChangeState.files;
            this.currentStoreFileCount = fileChangeState.files.length;
        })
    }


    /**
     * @memberof UploadComponent
     */
    onClearFiles() {
        this._fileHandler.clearFiles();
    }


    /**
     * @param {any} files 
     * @memberof UploadComponent
     */
    onUploadFiles(files) {
        let filesFromData: FormData = new FormData();
        filesFromData.append('cid', 'xjz34aw1');

        for (let file of files) {
            console.log(`[${CLASS}] Appending file to formdata... => `, file);

            filesFromData.append('showbizphoto[]', file.buffer, file.id);
            filesFromData.append('photosReferenceDr', JSON.stringify( { id: file.id + '-xjz34aw1', caption: file.caption }));
        }

        this._fileHandler.upload(filesFromData).subscribe(
            //map the success function and alert the response
            (response) => { console.log('Success: ', response.json()) },
            (error) => console.log('Error: ', error))
    }
}