import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { SideBarState } from "../types/navigation-types";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private sideBarState$: BehaviorSubject<SideBarState> = new BehaviorSubject<SideBarState>('closed');

  open() {
    this.sideBarState$.next('opened');
  }

  close() {
    this.sideBarState$.next('closed');
  }

  get sideBarState(): Observable<SideBarState> {
    return this.sideBarState$.asObservable();
  }
}
