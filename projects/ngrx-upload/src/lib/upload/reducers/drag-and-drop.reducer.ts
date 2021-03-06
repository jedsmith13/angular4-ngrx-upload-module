import {
  DRAG_FILE_OVER_ZONE,
  LEAVE_FILE_OVER_ZONE,
  WHEN_DROP_FILE_OVER_ZONE,
  DragAndDropActions
} from '../actions/drag-file-over-zone.actions';

export interface DragAndDropState {
  isFileOverZone: boolean;
  whenDroppedFile: number;
}

export const initialState: DragAndDropState = {
  isFileOverZone: false,
  whenDroppedFile: null
};

const CLASS = 'DRAG-AND-DROP-REDUCER';

export function dragAndDropReducer(
  state: DragAndDropState = initialState,
  action: DragAndDropActions
) {
  switch (action.type) {
    case DRAG_FILE_OVER_ZONE:
      console.log(`[${CLASS}] Changing state file over zone.`);
      return Object.assign({}, state, { isFileOverZone: action.payload });
    case LEAVE_FILE_OVER_ZONE:
      console.log(`[${CLASS}] Changing state file leave zone.`);
      return Object.assign({}, state, { isFileOverZone: action.payload });
    case WHEN_DROP_FILE_OVER_ZONE:
      console.log(`[${CLASS}] Dropped file over the zone! ${action.payload}`);
      return Object.assign({}, state, { whenDroppedFile: action.payload });
    default:
      return state;
  }
}
