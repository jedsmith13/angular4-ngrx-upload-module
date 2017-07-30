import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
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
    MdProgressSpinnerModule
} from '@angular/material';

// TODO Implement effect thing..
// import { EffectsModule } from '@ngrx/effects';
// import { DragAndDropEffects } from './effects/drag-and-drop.effect';

import { FileHandlerService } from './services/file-handler.service';
import { DragAndDropService } from './services/drag-and-drop.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MdCardModule,
        MdButtonModule,
        MdIconModule,
        MdProgressSpinnerModule
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