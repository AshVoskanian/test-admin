import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  public static isEmptyObject(obj: unknown): boolean {
    return typeof obj === 'object' && obj !== null && Object.keys(obj).length === 0;
  }

  public static markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: FormGroup<any>) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  public static getTime(dateString?: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  }

  public static calculateHoursDifference(startDateIso: string, endDateIso: string): number {
    const startDate = new Date(startDateIso);
    const endDate = new Date(endDateIso);
    const diffInMilliseconds = endDate.getTime() - startDate.getTime();

    return diffInMilliseconds / (1000 * 60 * 60);
  }

  public static getMonthAndDay(dateString: string): { month: string; day: string } {
    if (!dateString) {
      throw new Error("A valid ISO date string is required.");
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format. Use 'YYYY-MM-DDTHH:mm:ss'.");
    }

    const optionsMonth: Intl.DateTimeFormatOptions = {month: 'short'};
    const optionsDay: Intl.DateTimeFormatOptions = {day: '2-digit'};

    const month = date.toLocaleDateString('en-US', optionsMonth);
    const day = date.toLocaleDateString('en-US', optionsDay);

    return {month, day};
  }
}
