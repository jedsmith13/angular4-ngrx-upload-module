import { Component, Input, OnInit, Output, OnChanges, SimpleChanges, Renderer2, ChangeDetectionStrategy, AfterViewInit, ViewChildren, EventEmitter } from '@angular/core';
import { FilePhotoModel } from '../../models/file-photo.model';
import { FileHandlerService } from '../../services/file-handler.service';
import { Observable } from 'rxjs/Observable'

const CLASS = 'PreviewComponent';

@Component({
    selector: 'preview-container',
    template: `
    <h3>- Preview Your Photos -</h3>
    <div class="preview-container">
     <div class="image-preview-content" dynamic-scroll [count]="files.length" [size]="250">
        <md-card class="preview-card" *ngFor="let file of files">
            <md-progress-spinner class="image-loader" [color]="'primary'" [mode]="'indeterminate'" #myLoader></md-progress-spinner>
            <div class="preview-image-cancel" (click)="onRemoveFile(file.id)">
              <md-icon>cancel</md-icon>
            </div>
            <div class="image-content hide">
                <img md-card-image class="preview-image" process-image-buffer [imageBuffer]="file.buffer" (onImageLoaded)="onImageLoaded($event, myLoader._elementRef.nativeElement)">
                <md-card-content class="card-content">
                        <md-input-container class="image-description">
                            <input mdInput #message maxlength="256" placeholder="Message" [attr.data-imgid]="file.id">
                            <md-hint align="start"><strong>Don't disclose personal info</strong> </md-hint>
                            <md-hint align="end">{{message.value.length}} / 256</md-hint>
                        </md-input-container>
                </md-card-content>
            </div>
        </md-card>
      </div>
    </div>
    <button class="upload-btn" md-raised-button (click)="onUploadFiles()">Upload</button>
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
    @Input() files: FilePhotoModel[];


    /**
     * @type {EventEmitter<any>}
     * @memberof PreviewComponent
     */
    @Output() onUploadFilesEmitter: EventEmitter<any> = new EventEmitter<any>();


    /**
     * Collection of all messages input.
     */
    @ViewChildren('message') messageElementsRef: any;


    constructor(private _renderer: Renderer2, private _fileHandler: FileHandlerService) { }


    ngOnInit() {
        console.log(`[${CLASS}] images => `, this.files);
    }


    ngAfterViewInit() {
        // Subscribe for each input below image for change text then update the caption of the image due to 
        // The user event text.
        this.messageElementsRef.forEach((messageInput: any) => {
            Observable.fromEvent(messageInput.nativeElement, 'keyup')
                .debounceTime(300)
                .subscribe((keyboardEvent: any) => {
                    // Initialzie local variable per event it will be populated agian with new data.
                    let el = keyboardEvent.target,
                        imgId = el.getAttribute('data-imgid'),
                        caption = el.value;
                    

                    console.log(`[${CLASS}] The message that related to picture %s with caption => `, el.getAttribute('data-imgid'), caption);

                    // Get the first image it not matter because it always be id that relate to one image entity.
                    let image = this.files.filter(image => image.id === imgId)[0];

                    image.caption = caption;
                });
        })
    }


    ngOnChanges(changes: SimpleChanges) {
        console.log(`[${CLASS}] Simple changes => `, changes);
    }


    /**
     * @param {any} element 
     * @memberof PreviewComponent
     */
    onImageLoaded(element, loaderEl) {
        this._renderer.addClass(loaderEl, 'hide');
        element.el.src = element.src;
        this._renderer.removeClass(element.parent, 'hide');
    }


    /**
     * @param {any} id 
     * @memberof PreviewComponent
     */
    onRemoveFile(id) {
        console.log(`[${CLASS}] Removing file by id => `, id);
        this._fileHandler.removeById(id);
    }


    /**
     * @memberof PreviewComponent
     */
    onUploadFiles() {
        this.onUploadFilesEmitter.emit(this.files);
    }
}