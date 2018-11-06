import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DragAndDropState } from '../reducers/drag-and-drop.reducer';
import {
  DragFileOverZoneAction,
  LeaveFileOverZoneAction,
  DropFileOverZoneAction
} from '../actions/drag-file-over-zone.actions';

@Injectable()
export class DragAndDropService {
  /**
   *
   */
  constructor(private _store: Store<DragAndDropState>) {}

  /**
   * @memberof DragAndDropService
   */
  notifyFileOverZone() {
    this._store.dispatch(new DragFileOverZoneAction());
  }

  /**
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
