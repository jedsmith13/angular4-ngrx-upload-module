import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './core/map-reducer';
import { UtilsService } from './common/utils.service';
import { UploadModule } from './upload/upload.module';
import { UploadComponent } from './upload/upload.component';
import { DragAndDropEffects } from './upload/effects/drag-and-drop.effect';

@NgModule({
  imports: [
    UploadModule,
    StoreModule.forFeature('file-upload', reducers),
    EffectsModule.forFeature([DragAndDropEffects])
  ],
  providers: [UtilsService],
  declarations: [],
  exports: [UploadComponent]
})
export class NgrxUploadModule {}
