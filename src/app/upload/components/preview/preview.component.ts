import { Component, Input, OnInit, OnChanges, SimpleChanges, Renderer2, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FileHandlerService } from '../../services/file-handler.service';

const CLASS = 'PreviewComponent';

@Component({
    selector: 'preview-container',
    template: `
    <div class="preview-container" *ngIf="images.length">
        <md-card class="preview-card" *ngFor="let image of images">
            <md-progress-spinner [id]="'loader-' + image.id" [color]="'primary'" [mode]="'indeterminate'"></md-progress-spinner>
            <div class="preview-image-cancel" (click)="onRemoveFile(image.id)">
              <md-icon>cancel</md-icon>
            </div>
            <div class="image-content hide">
                <img md-card-image process-image-buffer [imageBuffer]="image.buffer" (onImageLoaded)="onImageLoaded($event, 'loader-' + image.id)">
                <md-card-content>
                    <md-icon>border_color</md-icon>
                </md-card-content>
            </div>
        </md-card>
    </div>`,
    styleUrls: ['preview.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit, OnChanges {
    @Input() images: File[];

    constructor(private _renderer: Renderer2, private _el: ElementRef, private _fileHandler: FileHandlerService) { }

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
    onImageLoaded(element, uniqueLoader) {
        let loaderForImage = this._el.nativeElement.querySelector('#' + uniqueLoader);

        this._renderer.addClass(loaderForImage, 'hide');
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
     * @private
     * @returns 
     * @memberof PreviewComponent
     */
    private generateUniqueId() {
        return Date.now();
    }
}