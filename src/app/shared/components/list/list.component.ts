import { Component, EventEmitter, input, Output } from '@angular/core';
import { LanguageFormatPipe } from "../../pipes/lang-transform.pipe";
import { List } from "./list.interface";
import { TranslateModule } from "@ngx-translate/core";
import { NgClass } from "@angular/common";
import {FilterPipe} from "../../pipes/filter.pipe";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    LanguageFormatPipe,
    TranslateModule,
    NgClass,
    FilterPipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Output() selectOption: EventEmitter<List> = new EventEmitter<List>();

  list = input<Array<List>>([])

  selectListItem(item: List) {
    this.selectOption.emit(item);
  }
}
