import { Component, Input, OnInit, OnChanges, SimpleChanges, Renderer2, ElementRef, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { FileHandlerService } from '../../services/file-handler.service';

const CLASS = 'PreviewComponent';

@Component({
    selector: 'preview-container',
    template: `
    <div class="preview-container" *ngIf="images.length">
     <div class="image-preview-content" #imagesPreviewContent>
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
    </div>`,
    styleUrls: ['preview.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('imagesPreviewContent') private _previewContent: ElementRef;

    @Input() images: File[];

    constructor(private _renderer: Renderer2, private _el: ElementRef, private _fileHandler: FileHandlerService) { }

    ngOnInit() {
        console.log(`[${CLASS}] images => `, this.images);
        console.log('Heya =>', this._previewContent);
    }


    ngOnChanges(changes: SimpleChanges) {
        console.log(`[${CLASS}] Simple changes => `, changes);
    }


    ngAfterViewInit() {
        for (let i = 0; i < this.images.length; i++) {
            // this._expandPreviewContent(this._previewContent.nativeElement, 200);
        }
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
        // this._renderer.setStyle(this.imagePreviewContent, 'width', this.imagePreviewContent.width - 200 + 'px');
    }


    /**
     * @param previewContentDOM 
     * @param width 
     */
    _expandPreviewContent(previewContentDOM, width) {
        this._renderer.setStyle(previewContentDOM, 'width', previewContentDOM.width + 200 + 'px');
    }
}