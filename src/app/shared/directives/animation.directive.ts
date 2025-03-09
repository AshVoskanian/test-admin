import {Directive, ElementRef, HostBinding, Input, OnChanges, OnDestroy, SimpleChanges} from "@angular/core";

@Directive({
  selector: "[animation]",
  standalone: true
})
export class AnimationDirective implements OnDestroy, OnChanges {
  @HostBinding('class') classes = '';

  @Input() animation: string = 'FADEIN';
  @Input() animateRepeatCount: number = 1;
  @Input() duration!: number;
  @Input() delay!: number;

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.classes = '';
    if (this.el.nativeElement?.parentElement?.parentElement) {
      this.el.nativeElement.parentElement.parentElement.style.overflow = 'Inherit';
    }

    if (changes['animation'].currentValue) {
      this.classes = 'animate__animated ' + this.animation;

      if (this.el.nativeElement?.parentElement?.parentElement) {
        this.el.nativeElement.parentElement.parentElement.style.overflow = 'Hidden';
      }

      if (this.animateRepeatCount) {
        this.el.nativeElement.style.setProperty('--animation-iteration-count', this.animateRepeatCount);
      }
      if (this.duration) {
        this.el.nativeElement.style.setProperty('--animate-duration', (this.duration + 's'));
      }
      if (this.delay || this.delay === 0) {
        this.el.nativeElement.style.setProperty('--animate-delay', (this.delay + 's'));
      }

      setTimeout(() => {
        if (this.el.nativeElement?.parentElement?.parentElement) {
          this.el.nativeElement.parentElement.parentElement.style.overflow = 'Inherit';
        }
      }, this.duration ? this.duration * 1000 : 1000);
    }
  }

  ngOnDestroy() {
    this.classes = '';
    if (this.el.nativeElement?.parentElement?.parentElement) {
      this.el.nativeElement.parentElement.parentElement.style.overflow = 'Inherit';
    }
  }
}
