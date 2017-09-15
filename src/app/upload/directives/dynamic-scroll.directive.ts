import { Directive, Input, ElementRef, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

const CLASS = 'DynamicScrollDirective',
  buffer = 100;

@Directive({
  selector: '[dynamic-scroll]'
})
export class DynamicScrollDirective {
  /**
   * The count of value to use the declimeter (size).
   * 
   * @type {number}
   * @memberof DynamicScrollDirective
   */
  @Input() count: number;

  /**
   * The declimeter for resize.
   * 
   * @type {number}
   * @memberof DynamicScrollDirective
   */
  @Input() size: number;


  /**
   * The width of the current container.
   * 
   * @type {number}
   * @memberof DynamicScrollDirective
   */
  width: any;

  constructor(private _el: ElementRef, private _renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    this.checkCurrentSizeContainer();

    if (changes.count) {
      if (changes.count.currentValue * this.size < this.width)
      {
        this._renderer.setStyle(this._el.nativeElement, 'width', '100%');
        console.log(`[${CLASS}] The scroll bar container is big enough there is not need to resize or interffer with javascript.`);
        return;
      }

      console.log(`[${CLASS}] Starting resizing processs for help scroll bar.`);
      this.resize(changes.count.currentValue, this.size);
    }
  }


  /**
   * @private
   * @param {any} count 
   * @param {any} size 
   * @memberof DynamicScrollDirective
   */
  private resize(count, size) {
    this._renderer.setStyle(this._el.nativeElement, 'width', (count * size) + 'px');
  }


  /**
   * 
   */
  private checkCurrentSizeContainer() {
    this.width = +window.getComputedStyle(this._el.nativeElement).getPropertyValue('width').replace('px', '');
  }
}
