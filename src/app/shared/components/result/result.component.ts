import {Component, EventEmitter, input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

export interface ResultModel {
  type: 'success' | 'error';
  title: string;
  text: string;
  btnText: string;
}

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  resultData = input<ResultModel>({
    type: 'error',
    title: 'Title',
    text: 'Text',
    btnText: 'Click'
  });

  btnAction() {
    this.buttonClick.next();
  }
}
