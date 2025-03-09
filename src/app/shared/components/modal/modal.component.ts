import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, signal} from '@angular/core';
import { AnimationDirective } from "../../directives/animation.directive";
import { AnimationTypes } from "../../enums/animations.enum";
import { ModalService } from "./modal.service";
import {TranslateModule} from "@ngx-translate/core";
import {CloseOnOutsideClickDirective} from "../../directives/close-on-outside-click.directive";


type Direction = 'up' | 'down' | 'left' | 'right';
export type ArrowDir = 'next' | 'prev';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrl: 'modal.component.scss',
  standalone: true,
  imports: [
    AnimationDirective,
    TranslateModule,
    CloseOnOutsideClickDirective
  ]
})
export class ModalComponent implements OnInit, OnDestroy{
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  @Input() modalTitle: string = '';
  @Input() animDirection: Direction = 'up';
  @Input() showArrows: boolean = false;
  @Input() bgOverlay: boolean = true;

  animationTypes = signal(AnimationTypes);

  public modalService: ModalService = inject(ModalService);

  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  closeModal(e?: Event) {
    if (e) {
      e.stopPropagation();
    }
    this.close.emit();
  }

  getAnim(): AnimationTypes {
    switch (this.animDirection) {
      case 'up':
        return this.animationTypes().SLIDEINUP;
      case 'down':
        return this.animationTypes().SLIDEINDOWN;
      case 'left':
        return this.animationTypes().SLIDEINLEFT;
      case 'right':
        return this.animationTypes().SLIDEINRIGHT;
      default:
        return this.animationTypes().SLIDEINUP;
    }
  }

  next() {
    this.modalService.next();
  }

  prev() {
    this.modalService.prev();
  }

  ngOnDestroy() {
    this.modalService.resetPage();
    document.body.style.overflow = '';
  }
}
