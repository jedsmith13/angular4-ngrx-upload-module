import { async, TestBed } from '@angular/core/testing';
import { NgrxUploadModule } from './ngrx-upload.module';

describe('NgrxUploadModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgrxUploadModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgrxUploadModule).toBeDefined();
  });
});
