import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UploadComponent } from './upload.component';
import {
    UploadBodyComponent,
    UploadHeaderComponent,
    UploadFileFormComponent,
    PreviewComponent
} from './components';

import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { ProcessImageBufferDirective } from './directives/process-image-buffer.directive';
import { FileUploadDirective } from './directives/file-upload.directive';

import {
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdInputModule
} from '@angular/material';

// TODO Implement effect thing..
// import { EffectsModule } from '@ngrx/effects';
// import { DragAndDropEffects } from './effects/drag-and-drop.effect';

import { FileHandlerService } from './services/file-handler.service';
import { DragAndDropService } from './services/drag-and-drop.service';
import { DynamicScrollDirective } from './directives/dynamic-scroll.directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MdCardModule,
        MdButtonModule,
        MdIconModule,
        MdProgressSpinnerModule,
        MdInputModule
    ],
    declarations: [
        UploadComponent,
        UploadBodyComponent,
        UploadHeaderComponent,
        FileUploadDirective,        
        UploadFileFormComponent,
        DragAndDropDirective,
        ProcessImageBufferDirective,
        PreviewComponent,
        DynamicScrollDirective,
    ],
    exports: [
        UploadComponent
    ],
    providers: [
        DragAndDropService,
        FileHandlerService
    ]
})
export class UploadModule {

}