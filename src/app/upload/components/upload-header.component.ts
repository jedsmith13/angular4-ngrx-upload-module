import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'upload-header',
    template: `
        <div class="upload-header-container">
          <md-card-title>{{title}}</md-card-title>
          <md-card-subtitle>{{subtitle}}</md-card-subtitle>
        </div>
    `,
    styleUrls: ['./upload-header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadHeaderComponent {
    /**
     * @type {string}@memberof UploadHeaderComponent
     */
    @Input() title: string;


    /**
     * @type {string}@memberof UploadHeaderComponent
     */
    @Input() subtitle: string;
}