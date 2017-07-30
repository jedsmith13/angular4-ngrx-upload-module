import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UploadModule } from './upload/upload.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './core/map-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  PAPAPARSE_TOKEN
} from './common/papaparse.service';
import { UtilsService } from './common/utils.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UploadModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [{
    provide: PAPAPARSE_TOKEN,
    useValue: Papa
  },
  UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
