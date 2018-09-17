import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

const CLASS = 'FileUploadDirective';

@Directive({
  selector: '[ngrxUploadFileUpload]'
})
export class FileUploadDirective {
  @Output()
  onFileChanges: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  /**
   * Get notify when files been change from input.
   *
   * @param {*} event
   * @memberof FileUploadDirective
   */
  @HostListener('change', ['$event'])
  public onFilesChange(event: any) {
    this.onFileChanges.emit(event.target.files);
  }
}
