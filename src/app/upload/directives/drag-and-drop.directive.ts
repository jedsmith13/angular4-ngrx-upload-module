import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: "[drag-and-drop]"
})
export class DragAndDropDirective {
    @HostBinding('class.file-over-zone') private fileOverZone = false;

    /**
     * @type {EventEmitter<any>}
     * @memberof DragAndDropDirective
     */
    @Output() onDropFile: EventEmitter<any> = new EventEmitter<any>();


    /**
     * @type {EventEmitter<any>}
     * @memberof DragAndDropDirective
     */
    @Output() onFileOverZone: EventEmitter<any> = new EventEmitter<any>();


    /**
     * @type {EventEmitter<any>}
     * @memberof DragAndDropDirective
     */
    @Output() onFileLeaveZone: EventEmitter<any> = new EventEmitter<any>();


    /**
     * Drag the file/img above the drag zone.
     * This function will execute untill the file above the drag zone.
     * 
     * @param {*} event 
     * @memberof DragAndDropDirective
     */
    @HostListener('dragover', ['$event']) public onDragOver(event: any) {
        this.fileOverZone = true;
        this.onFileOverZone.emit();

        this._preventDefaultEventBehavior(event);
    }


    /**
     * 
     * 
     * @param {any} evt 
     * @memberof DragAndDropDirective
     */
    @HostListener('dragleave', ['$event']) public onDragLeave(event) {
        this._clear();
        this.onFileLeaveZone.emit();

        this._preventDefaultEventBehavior(event);
    }


    /**
     * When you release the file/img over the drag zone.
     * 
     * @param {any} evt 
     * @memberof DragAndDropDirective
     */
    @HostListener('drop', ['$event']) public onDrop(event) {
        let files = event.dataTransfer.files;

        if (files.length > 0) {
            this.onDropFile.emit(files);
            this._clear();
            this.onFileLeaveZone.emit();
        }

        this._preventDefaultEventBehavior(event);
    }


    /**
     * @param event 
     */
    private _preventDefaultEventBehavior(event) {
        event.preventDefault();
        event.stopPropagation();
    }


    /**
     * Clear the directive hostbinding manipulation.
     * 
     * @private
     * @memberof DragAndDropDirective
     */
    private _clear() {
        this.fileOverZone = false;
    }
}