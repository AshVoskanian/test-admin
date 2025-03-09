import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleMenu]',
  standalone: true
})
export class ToggleMenuDirective {
  private isVisible = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggle() {
    this.isVisible = !this.isVisible;
    this.updateMenuVisibility();
  }

  @HostListener('document:click', ['$event']) closeMenu(event: MouseEvent) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isVisible = false;
      this.updateMenuVisibility();
    }
  }

  private updateMenuVisibility() {
    if (this.isVisible) {
      this.renderer.addClass(this.el.nativeElement, 'visible');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'visible');
    }
  }
}
