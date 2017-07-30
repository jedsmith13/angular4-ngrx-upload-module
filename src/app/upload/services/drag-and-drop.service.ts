import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers/drag-and-drop.reducer';
import { 
    DragFileOverZoneAction, 
    LeaveFileOverZoneAction,
    DropFileOverZoneAction } from '../actions/drag-file-over-zone.action';
import { FileAddAction } from '../actions/file-add.action';

@Injectable()
export class DragAndDropService {
    /**
     *
     */
    constructor(private _store: Store<State>) {
    }


    /**
     * 
     * @memberof DragAndDropService
     */
    notifyFileOverZone() {
        this._store.dispatch(new DragFileOverZoneAction());
    }


    /**
     * 
     * @memberof DragAndDropService
     */
    notifyLeaveFileOverZone() {
        this._store.dispatch(new LeaveFileOverZoneAction());
    }


    /**
     * @memberof DragAndDropService
     */
    notifyDropFile() {
        this._store.dispatch(new DropFileOverZoneAction(Date.now()));
    }
}