import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngrx-upload-header',
  template: `
        <div class="upload-header-container">
          <mat-card-title>{{title}}</mat-card-title>
          <mat-card-subtitle>{{subtitle}}</mat-card-subtitle>
        </div>
    `,
  styleUrls: ['./upload-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadHeaderComponent {
  /**
   * @type {string}@memberof UploadHeaderComponent
   */
  @Input()
  title: string;

  /**
   * @type {string}@memberof UploadHeaderComponent
   */
  @Input()
  subtitle: string;
}
