import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'upload-file-form',
    template: `
        <input type="file" multiple accept="image/x-png,image/jpeg" file-upload (onFileChanges)="onFileChanges($event)" />
    `,
    styleUrls: ['./upload-file.form.component.css']
})
export class UploadFileFormComponent {
    /**
     * @type {EventEmitter<any>}
     * @memberof UploadFileFormComponent
     */
    @Output() onChangeFilesFromInput: EventEmitter<any> = new EventEmitter<any>();


    /**
     * @param {FileList} files 
     * @memberof UploadFileFormComponent
     */
    onFileChanges(files: FileList) {
        this.onChangeFilesFromInput.emit(files);
    }
}