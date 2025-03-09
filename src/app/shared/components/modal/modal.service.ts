import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ArrowDir} from "./modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private arrowActions$: BehaviorSubject<ArrowDir | null> = new BehaviorSubject<ArrowDir | null>(null)

  public currentPage: number = 1;
  public pagesCount: number = 1;

  constructor() {
  }

  get arrowAction(): Observable<ArrowDir | null> {
    return this.arrowActions$.asObservable();
  }

  next() {
    if (this.currentPage < this.pagesCount) {
      this.currentPage++;
      this.arrowActions$.next('next');
    }
  }

  prev() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.arrowActions$.next('prev');
    }
  }

  resetPage() {
    this.currentPage = 1;
    this.arrowActions$.next(null);
  }
}
