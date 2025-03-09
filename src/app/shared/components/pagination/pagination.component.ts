import {Component, EventEmitter, Input, OnChanges, Output, signal} from '@angular/core';
import {NgStyle} from "@angular/common";
import {Paging} from "../../../pages/dashboard/jobs/jobs-interface";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges {
  @Input() totalItemsCount: any = 0;
  @Input() pagingData?: Paging;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages = signal<Array<number>>([]);
  xOffset = signal<number>(0);

  pageSize: number = 20;
  currentPage: number = 1;

  ngOnChanges(): void {
    this.pageSize = this.pagingData?.limit as number;
    this.currentPage = this.pagingData?.start as number;

    if (this.currentPage === 1) {
      this.xOffset.set(0);
    }

    this.setPagesList();
  }

  setPagesList() {
    const pages: number = Math.ceil(this.totalItemsCount / this.pageSize);
    const arr: Array<number> = Array.from({length: pages}, (_, i) => i + 1);
    this.pages.set(arr);
  }

  onPageChange(page: number) {
    if (page > 3 && page !== 4 && page !== 5) {
      const isLastPageAndFirstPageSelected = page === this.pages().length && this.currentPage === 1;
      const offsetAdjustment = isLastPageAndFirstPageSelected ?
        (this.currentPage - page + 2) :
        (this.currentPage - page);

      this.xOffset.set(this.xOffset() + offsetAdjustment * 38);
    } else {
      this.xOffset.set(page === 4 ? -38 : page === 5 ? -76 : 0);
    }

    this.currentPage = page;
    this.pageChange.emit(page);
  }

  toEnd() {
    this.onPageChange(this.pages().length);
  }

  toStart() {
    this.onPageChange(1);
  }
}
