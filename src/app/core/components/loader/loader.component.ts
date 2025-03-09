import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {LoadingService} from "../../../shared/services/loader.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [
    AsyncPipe
  ],
  standalone: true
})
export class LoaderComponent implements OnInit {
  $loading?: Observable<boolean>;

  private readonly loadingService = inject(LoadingService);

  ngOnInit() {
    this.$loading = this.loadingService.loading$;
  }
}
