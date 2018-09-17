import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileHandlerService } from './services/file-handler.service';
import * as fromRootUpload from '../core/map-reducer';
import * as fromFile from '../upload/reducers/file.reducer';
import * as fromDragAndDrop from '../upload/reducers/drag-and-drop.reducer';
import { Observable } from 'rxjs';

const CLASS = 'UploadComponent';

@Component({
  selector: 'ngrx-upload',
  template: `
    <div class="upload-container-wrapper">
    <mat-card>
        <mat-card-header>
            <ngrx-upload-header [title]="'Upload Your Best Pics ;)'" [subtitle]="'You can upload 10 photos max.'"></ngrx-upload-header>
        </mat-card-header>
        <mat-card-content>
            <ngrx-upload-body [currentStoreFileCount]="currentStoreFileCount"
                         [isFileOverZone]="(dragAndDropState$ | async)?.isFileOverZone"
                         [text]="'Drag files here'">
            </ngrx-upload-body>
        </mat-card-content>
        <mat-card-actions *ngIf="files.length > 0">
            <button mat-button (click)="onClearFiles()">Remove All Photos From Preview</button>
        </mat-card-actions>
    </mat-card>

    <mat-card *ngIf="files.length > 0">
        <ngrx-upload-preview-container [files]="files" (onUploadFilesEmitter)="onUploadFiles($event)"></ngrx-upload-preview-container>
    </mat-card>
    </div>
    `,
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  /**
   * @type {Observable<fromDragAndDrop.DragAndDropState>}
   * @memberof UploadComponent
   */
  dragAndDropState$: Observable<fromDragAndDrop.DragAndDropState>;

  /**
   * @type {Observable<fromFile.FileState>}
   * @memberof UploadComponent
   */
  filesChangesState$: Observable<fromFile.FileState>;

  /**
   *
   */
  files: Array<any> = [];

  /**
   * @type {number}
   * @memberof UploadComponent
   */
  currentStoreFileCount: number;

  constructor(
    private _store: Store<fromRootUpload.State>,
    private _fileHandler: FileHandlerService
  ) {}

  ngOnInit() {
    this.dragAndDropState$ = this._store.select(fromRootUpload.getDragAndDrop);
    this.filesChangesState$ = this._store.select(fromRootUpload.getFile);

    this.filesChangesState$.subscribe(fileChangeState => {
      if (fileChangeState) {
        this.files = fileChangeState.files;
        this.currentStoreFileCount = fileChangeState.files.length;
      }
    });
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
    const filesFromData: FormData = new FormData();

    for (const file of files) {
      console.log(`[${CLASS}] Appending file to formdata... => `, file);

      filesFromData.append('files', file.buffer, file.id);
      filesFromData.append(
        'photosReferenceDr',
        JSON.stringify({ id: file.id, caption: file.caption })
      );
    }

    this._fileHandler.upload(filesFromData).subscribe(
      // map the success function and alert the response
      response => {
        console.log('Success: ', response);
      },
      error => console.log('Error: ', error)
    );
  }
}
