import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FileHandlerService } from './services/file-handler.service';
import * as fromRootUpload from '../core/map-reducer';
import * as fromFile from '../upload/reducers/file.reducer';
import * as fromDragAndDrop from '../upload/reducers/drag-and-drop.reducer';
import { Observable } from 'rxjs';

// const CLASS = 'UploadComponent';

@Component({
  selector: 'ngrx-upload',
  template: `
    <div class="upload-container-wrapper">
    <mat-card>
        <mat-card-header>
            <ngrx-upload-header [title]="'Upload Your Best Pics ;)'" [subtitle]="'You can upload 10 photos max.'"></ngrx-upload-header>
        </mat-card-header>
        <mat-card-content>
            <ngrx-upload-body [id]="options.id" [currentStoreFileCount]="currentStoreFileCount"
                         [isFileOverZone]="(dragAndDropState$ | async)?.isFileOverZone"
                         [text]="'Drag files here'">
            </ngrx-upload-body>
        </mat-card-content>
        <mat-card-actions *ngIf="files.length > 0">
            <button mat-button (click)="onClearFiles()">Remove All Photos From Preview</button>
        </mat-card-actions>
    </mat-card>

    <mat-card *ngIf="files.length > 0">
        <ngrx-upload-preview-container [id]="options.id" [files]="files" (onUploadFilesEmitter)="onUploadFiles($event)"></ngrx-upload-preview-container>
    </mat-card>
    </div>
    `,
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input()
  options = {
    url: 'http://localhost:3000/upload',
    header: null,
    formatter: (files): FormData => {
      const filesFromData = new FormData();

      for (const file of files) {
        // console.log(`[${CLASS}] Appending file to formdata... => `, file);

        filesFromData.append('files', file.buffer, file.id);
        filesFromData.append(
          'photosReferenceDr',
          JSON.stringify({ id: file.id, caption: file.caption })
        );
      }

      return filesFromData;
    },
    id: 0,
    actions: []
  };

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
    this.dragAndDropState$ = this._store.pipe(
      select(fromRootUpload.getDragAndDrop)
    );
    this.filesChangesState$ = this._store.pipe(select(fromRootUpload.getFile));

    this.filesChangesState$.subscribe(fileChangeState => {
      if (fileChangeState && fileChangeState.files && fileChangeState.files[this.options.id]) {
        this.files = fileChangeState.files[this.options.id];
        this.currentStoreFileCount = this.files.length;
      }
    });
  }

  /**
   * @memberof UploadComponent
   */
  onClearFiles() {
    this._fileHandler.clearFiles(this.options.id);
  }

  /**
   * @param {any} files
   * @memberof UploadComponent
   */
  onUploadFiles(files) {
    const filesFromData: FormData = this.options.formatter(files);

    const url =
      typeof this.options.url === 'function'
        ? (this.options.url as any)()
        : this.options.url;

    const uploadOptions: { header?: Headers } = {};

    if (this.options.header) {
      uploadOptions.header = this.options.header;
    }

    this._fileHandler
      .upload(filesFromData, url, { header: this.options.header })
      .subscribe(
        // map the success function and alert the response
        response => {
          if (this.options.actions && this.options.actions.length > 0) {
            this.options.actions.forEach(action =>
              this._store.dispatch(new action(response))
            );
          }
          this.onClearFiles();
        },
        error => console.log('Error: ', error)
      );
  }
}
