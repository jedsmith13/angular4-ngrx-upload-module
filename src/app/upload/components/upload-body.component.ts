import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DragAndDropService } from '../services/drag-and-drop.service';
import { UtilsService } from '../../common/utils.service';
import { FileHandlerService } from '../services/file-handler.service';
import { FilePhotoModel } from '../models/file-photo.model';

const CLASS = 'UploadBodyComponent';

@Component({
    selector: 'upload-body',
    template: `
        <div class="dropzone" drag-and-drop (onDropFile)="onDropFile($event)" (onFileOverZone)="onFileOverZone($event)" (onFileLeaveZone)="onFileLeaveZone($event)">
          <div class="text-wrapper">
            <div class="centered">
                <md-icon>cloud_upload</md-icon>
                <div [ngClass]="{'hide' : isFileOverZone}">
                    <div>{{text}}</div>
                </div>
            </div>
          </div>
        <upload-file-form (onChangeFilesFromInput)="onChangeFilesFromInput($event)"></upload-file-form>
        </div>
    `,
    styleUrls: ['./upload-body.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadBodyComponent implements OnInit {
    /**
     * 
     * @type {string}@memberof UploadBodyComponent
     */
    @Input() text: string;


    /**
     * @type {boolean}@memberof UploadBodyComponent
     */
    @Input() isFileOverZone: boolean;


    /**
     * The number of files that current stored in the store for limit
     * The uploading photos to 10 per one request in the preview component.
     */
    @Input() currentStoreFileCount: File;


    /**
     *
     */
    constructor(private _dragNdrop: DragAndDropService, private _fileHandler: FileHandlerService, private _utils: UtilsService) { }


    ngOnInit() { }


    /**
     * Drag the file/img above the drag zone.
     * This function will execute untill the file above the drag zone.
     * 
     * @param {Event} event 
     * @memberof UploadBodyComponent
     */
    onFileOverZone(event: Event) {
        console.log(`[${CLASS}] Event on file over zone been called is file over zone? => `, this.isFileOverZone);

        if (this.isFileOverZone) {
            console.log(`[${CLASS}] No need to modify the state that file over the zone.`);
            return;
        }

        this._dragNdrop.notifyFileOverZone();
    }


    /**
     * 
     * 
     * @param {*} event 
     * @memberof UploadBodyComponent
     */
    onFileLeaveZone(event: any) {
        if (!this.isFileOverZone) {
            return;
        }

        this._dragNdrop.notifyLeaveFileOverZone();
    }


    /**
     * When you release the file/img over the drag zone.
     * 
     * @param {Event} event 
     * @memberof UploadBodyComponent
     */
    onDropFile(fileList: FileList) {
        let files = this.createFilePhotoModelFromFileList(fileList);

        if (files.length === 0) return;

        this._dragNdrop.notifyDropFile();
        this.fileCountLimitValidation(this.currentStoreFileCount)(files);
    }


    /**
     * @param {FileList} fileList 
     * @returns 
     * @memberof UploadBodyComponent
     */
    onChangeFilesFromInput(fileList: FileList) {
        let files = this.createFilePhotoModelFromFileList(fileList);

        if (files.length === 0) return;

        this.fileCountLimitValidation(this.currentStoreFileCount)(files);
    }


    /**
     * Pass this validation step only if the number of files that current in the store are 
     * smaller then 10.
     * 
     * @private
     * @param {any} count 
     * @returns 
     * @memberof UploadBodyComponent
     */
    private fileCountLimitValidation(count) {
        console.log(`[${CLASS}] Current there %s files in the store.. `, count);

        return (files) => {
            if (count > 9) {
                console.error(`[${CLASS}] You reach the maximum images you can upload. `);
                return;
            }

            this._fileHandler.addFile(files);
        }
    }


    /**
     * @private
     * @param {FileList} fileList 
     * @returns {FilePhotoModel[]} 
     * @memberof UploadBodyComponent
     */
    private createFilePhotoModelFromFileList(fileList: FileList): FilePhotoModel[] {
        let immutateFileList = Array.from(fileList).concat([]),
            tempFileArray = [],
            filePhotoModels: FilePhotoModel[] = [];

        filePhotoModels = immutateFileList.map(file => {
            if (this.isValidType(file.type)) {
                return new FilePhotoModel('img-' + this._utils.guid(), file);
            }
        });

        return filePhotoModels.filter(filePhotoModel => filePhotoModel);
    }


    /**
     * @private
     * @param {any} type 
     * @returns 
     * @memberof UploadBodyComponent
     */
    private isValidType(type) {
        return type === 'image/jpeg' || type === 'image/png';
    }
}