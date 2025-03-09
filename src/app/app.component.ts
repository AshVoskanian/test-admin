import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr";
import { LoaderComponent } from "./core/components/loader/loader.component";
import { AsyncPipe } from "@angular/common";
import { LocalStorageService } from "./shared/services/local-storage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ToastrModule, LoaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  private readonly translateService = inject(TranslateService)
  private readonly localStorage = inject(LocalStorageService);

  ngOnInit() {
    this.setLang();
  }

  setLang() {
    const currentLang: string | null = this.localStorage.getItem<string>('language');
    this.translateService.use(currentLang || 'en-uk')
  }
}
