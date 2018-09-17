import {
  Directive,
  Input,
  EventEmitter,
  ElementRef,
  OnChanges,
  SimpleChanges,
  Output
} from '@angular/core';

const CLASS = 'ProcessImageBufferDirective';

@Directive({
  selector: '[ngrxUploadProcessImageBuffer]'
})
export class ProcessImageBufferDirective implements OnChanges {
  @Input()
  imageBuffer;

  @Output()
  onImageLoaded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this._el.nativeElement.src === '' && changes.imageBuffer) {
      console.log(`[${CLASS}] Getting new image buffer to process.`);
      this._processImageBuffer(changes.imageBuffer.currentValue);
    }
  }

  /**
   * @param {any} image
   * @memberof PreviewComponent
   */
  private _processImageBuffer(imageBuffer) {
    const reader = new FileReader();

    reader.onload = event => {
      setTimeout(() => {
        this._onLoadedImage(event);
      }, Math.floor(Math.random() * 3500) + 1);
    };

    console.log(`[${CLASS}] Proccessing image ... => `, imageBuffer);

    reader.readAsDataURL(imageBuffer);
  }

  /**
   * @param event
   */
  private _onLoadedImage(event) {
    this._preventDefaultEventBehavior(event);

    this.onImageLoaded.emit({
      src: event.target.result,
      el: this._el.nativeElement,
      parent: this._el.nativeElement.parentElement
    });
  }

  /**
   * @param event
   */
  private _preventDefaultEventBehavior(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
