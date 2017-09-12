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

  constructor(private _el: ElementRef, private _renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.count) {
      console.log(`[${CLASS}] Getting new image buffer to process.`);
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
    this._renderer.setStyle(this._el.nativeElement, 'width', ( count * size ) + buffer + 'px');
  }
}
