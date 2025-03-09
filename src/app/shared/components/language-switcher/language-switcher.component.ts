import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "../../services/local-storage.service";
import { NgStyle } from "@angular/common";
import { ToggleMenuDirective } from "../../directives/toggle.directive";
import { ListComponent } from "../list/list.component";
import { List } from "../list/list.interface";

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    NgStyle,
    ToggleMenuDirective,
    ListComponent
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent implements OnInit {
  languages = signal<Array<List>>([]);

  private readonly localStorage = inject(LocalStorageService);
  public readonly translateService = inject(TranslateService);

  ngOnInit() {
    this.fillLanguages();
  }

  fillLanguages() {
    this.languages.set([
      {
        text: 'En(Uk)',
        value: 'en-uk'
      },
      {
        text: 'En(Us)',
        value: 'en-us'
      },
      {
        text: 'Fr',
        value: 'fr'
      },
      {
        text: 'Es',
        value: 'es'
      }
    ]);
  }

  changeLang(item: List) {
    this.translateService.use(item.value);
    this.localStorage.setItem('language', item.value);
  }
}
