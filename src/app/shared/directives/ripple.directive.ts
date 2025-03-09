import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRipple]',
  standalone: true
})
export class RippleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative'); // Ensure the parent element has a relative position
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden'); // Clip ripple effect to the element bounds
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const ripple = this.renderer.createElement('span');
    this.renderer.addClass(ripple, 'ripple');

    // Calculate the ripple size and position
    const rect = this.el.nativeElement.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    // Add ripple to the element
    this.renderer.appendChild(this.el.nativeElement, ripple);

    // Remove ripple after animation
    ripple.addEventListener('animationend', () => {
      this.renderer.removeChild(this.el.nativeElement, ripple);
    });
  }
}
