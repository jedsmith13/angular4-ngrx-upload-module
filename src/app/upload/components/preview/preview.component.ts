import {
  Component,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  Renderer2,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChildren,
  EventEmitter
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { FilePhotoModel } from '../../models/file-photo.model';
import { FileHandlerService } from '../../services/file-handler.service';

const CLASS = 'PreviewComponent';

@Component({
  selector: 'ngrx-upload-preview-container',
  template: `
    <h3>- Preview Your Photos -</h3>
    <div class="preview-container">
     <div class="image-preview-content" dynamic-scroll [count]="files.length" [size]="250">
        <mat-card class="preview-card" *ngFor="let file of files">
            <mat-progress-spinner class="image-loader" [color]="'primary'" [mode]="'indeterminate'" #myLoader></mat-progress-spinner>
            <div class="preview-image-cancel" (click)="onRemoveFile(file.id)">
              <mat-icon>cancel</mat-icon>
            </div>
            <div class="image-content hide">
                <img mat-card-image class="preview-image" process-image-buffer [imageBuffer]="file.buffer" (onImageLoaded)="onImageLoaded($event, myLoader._elementRef.nativeElement)">
                <mat-card-content class="card-content">
                        <mat-form-field class="image-description">
                            <input matInput #message maxlength="256" placeholder="Message" [attr.data-imgid]="file.id">
                            <mat-hint align="start"><strong>Don't disclose personal info</strong> </mat-hint>
                            <mat-hint align="end">{{message.value.length}} / 256</mat-hint>
                        </mat-form-field>
                </mat-card-content>
            </div>
        </mat-card>
      </div>
    </div>
    <button class="upload-btn" mat-raised-button (click)="onUploadFiles()">Upload</button>
    `,
  styleUrls: ['preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit, OnChanges, AfterViewInit {
  /**
   * Getting files on the store.
   *
   * @type {File[]}
   * @memberof PreviewComponent
   */
  @Input()
  files: FilePhotoModel[];

  @Input()
  id: number;

  /**
   * @type {EventEmitter<any>}
   * @memberof PreviewComponent
   */
  @Output()
  onUploadFilesEmitter: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Collection of all messages input.
   */
  @ViewChildren('message')
  messageElementsRef: any;

  constructor(
    private _renderer: Renderer2,
    private _fileHandler: FileHandlerService
  ) {}

  ngOnInit() {
    // console.log(`[${CLASS}] images => `, this.files);
  }

  ngAfterViewInit() {
    // Subscribe for each input below image for change text then update the caption of the image due to
    // The user event text.
    this.messageElementsRef.forEach((messageInput: any) => {
      fromEvent(messageInput.nativeElement, 'keyup')
        .pipe(debounceTime(300))
        .subscribe((keyboardEvent: any) => {
          // Initialzie local variable per event it will be populated agian with new data.
          const el = keyboardEvent.target,
            imgId = el.getAttribute('data-imgid'),
            caption = el.value;

          // console.log(
          //   `[${CLASS}] The message that related to picture %s with caption => `,
          //   el.getAttribute('data-imgid'),
          //   caption
          // );

          // Get the first image it not matter because it always be id that relate to one image entity.
          const index = this.files.findIndex(file => file.id === imgId);

          const files = [...this.files];
          files[index] = { ...this.files[index], caption };

          this.files = files;
        });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(`[${CLASS}] Simple changes => `, changes);
  }

  /**
   * @memberof PreviewComponent
   */
  onImageLoaded(element) {
    element.el.src = element.src;
    this._renderer.removeClass(element.parent, 'hide');
  }

  /**
   * @memberof PreviewComponent
   */
  onRemoveFile(fileId: string) {
    // console.log(`[${CLASS}] Removing file by id => `, id);
    this._fileHandler.removeById(this.id, fileId);
  }

  /**
   * @memberof PreviewComponent
   */
  onUploadFiles() {
    this.onUploadFilesEmitter.emit(this.files);
  }
}
