import { Action } from '@ngrx/store';

export const DRAG_FILE_OVER_ZONE = '[DragAndDrop] DRAG_FILE_OVER_ZONE';

export class DragFileOverZoneAction implements Action {
  readonly type = DRAG_FILE_OVER_ZONE;

  constructor(public payload: boolean = true) {}
}

export const LEAVE_FILE_OVER_ZONE = '[DragAndDrop] LEAVE_FILE_OVER_ZONE';

export class LeaveFileOverZoneAction implements Action {
  readonly type = LEAVE_FILE_OVER_ZONE;

  constructor(public payload: boolean = false) {}
}

export const WHEN_DROP_FILE_OVER_ZONE =
  '[DragAndDrop] WHEN_DROP_FILE_OVER_ZONE';

export class DropFileOverZoneAction implements Action {
  readonly type = WHEN_DROP_FILE_OVER_ZONE;

  constructor(public payload: number = null) {}
}

export type DragAndDropActions =
  | DragFileOverZoneAction
  | LeaveFileOverZoneAction
  | DropFileOverZoneAction;
