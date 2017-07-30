import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { DRAG_FILE_OVER_ZONE, LEAVE_FILE_OVER_ZONE } from '../actions/drag-file-over-zone.action';

@Injectable()
export class DragAndDropEffects {
    // @Effect() fileOverZone$: Observable<Action> = this.actions$.ofType(DRAG_FILE_OVER_ZONE).map(action => {
    //     return action;
    // })


    // @Effect() fileLeaveZone$: Observable<Action> = this.actions$.ofType(LEAVE_FILE_OVER_ZONE).map(action => {
    //     return action;
    // })

    /**
     *
     */
    constructor(private actions$: Actions) { }
}