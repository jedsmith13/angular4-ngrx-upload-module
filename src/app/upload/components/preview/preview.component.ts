import { Component, Input, OnInit, OnChanges, SimpleChanges, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { FileHandlerService } from '../../services/file-handler.service';

const CLASS = 'PreviewComponent';

@Component({
    selector: 'preview-container',
    template: `
    <h3>- Preview Your Photos -</h3>
    <div class="preview-container">
     <div class="image-preview-content" dynamic-scroll [count]="images.length" [size]="250">
        <md-card class="preview-card" *ngFor="let image of images">
            <md-progress-spinner class="image-loader" [color]="'primary'" [mode]="'indeterminate'" #myLoader></md-progress-spinner>
            <div class="preview-image-cancel" (click)="onRemoveFile(image.id)">
              <md-icon>cancel</md-icon>
            </div>
            <div class="image-content hide">
                <img md-card-image class="preview-image" process-image-buffer [imageBuffer]="image.buffer" (onImageLoaded)="onImageLoaded($event, myLoader._elementRef.nativeElement)">
                <md-card-content class="card-content">
                        <md-input-container class="image-description">
                            <input mdInput #message maxlength="256" placeholder="Message">
                            <md-hint align="start"><strong>Don't disclose personal info</strong> </md-hint>
                            <md-hint align="end">{{message.value.length}} / 256</md-hint>
                        </md-input-container>
                </md-card-content>
            </div>
        </md-card>
      </div>
    </div>
    <button class="upload-btn" md-raised-button>Upload</button>
    `,
    styleUrls: ['preview.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit, OnChanges {
    /**
     * Getting files on the store.
     * 
     * @type {File[]}
     * @memberof PreviewComponent
     */
    @Input() images: File[];


    constructor(private _renderer: Renderer2, private _fileHandler: FileHandlerService) { }

    ngOnInit() {
        console.log(`[${CLASS}] images => `, this.images);
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

}