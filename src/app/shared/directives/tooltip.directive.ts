import {Directive, ElementRef, HostListener, inject, Input, Renderer2} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Directive({
  selector: '[tooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('tooltip') tooltipText = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipElement!: HTMLElement;
  el = inject(ElementRef);
  renderer = inject(Renderer2);
  translate = inject(TranslateService);

  constructor() {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipText) {
      return;
    }

    if (!this.tooltipElement) {
      this.tooltipElement = this.renderer.createElement('span');
      this.renderer.appendChild(
        this.tooltipElement,
        this.renderer.createText(this.translate.instant(this.tooltipText))
      );
      this.renderer.appendChild(document.body, this.tooltipElement);

      this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
      this.renderer.setStyle(this.tooltipElement, 'background', '#333');
      this.renderer.setStyle(this.tooltipElement, 'background', '#333');
      this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
      this.renderer.setStyle(this.tooltipElement, 'padding', '5px 15px');
      this.renderer.setStyle(this.tooltipElement, 'border-radius', '6px');
      this.renderer.setStyle(this.tooltipElement, 'font-size', '14px');
      this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
      this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');

      this.setPosition();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = undefined!;
    }
  }

  private setPosition() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    switch (this.position) {
      case 'bottom':
        this.renderer.setStyle(this.tooltipElement, 'top', `${rect.bottom + window.scrollY + 5}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${rect.left + window.scrollX}px`);
        break;

      case 'left':
        this.renderer.setStyle(this.tooltipElement, 'top', `${rect.top + window.scrollY}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${rect.left + window.scrollX - tooltipRect.width - 5}px`);
        break;

      case 'right':
        this.renderer.setStyle(this.tooltipElement, 'top', `${rect.top + window.scrollY + 5}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${rect.right + window.scrollX + 5}px`);
        break;

      case 'top':
      default:
        this.renderer.setStyle(this.tooltipElement, 'top', `${rect.top + window.scrollY - tooltipRect.height - 5}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${rect.left + window.scrollX}px`);
        break;
    }
  }
}
