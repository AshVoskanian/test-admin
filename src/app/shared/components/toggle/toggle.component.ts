import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIf } from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-toggle',
  templateUrl: 'toggle.component.html',
  styleUrls: ['toggle.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    TranslateModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() label: string = '';  // Optional label input
  @Output() toggleChange = new EventEmitter<boolean>();  // Emit when the toggle is clicked

  value: boolean = false; // Internal value for the toggle (true/false)

  // Functions for ControlValueAccessor
  onChange: (value: boolean) => void = () => {};  // No-op function
  onTouched: () => void = () => {};              // No-op function

  // Write the value from the parent to the component
  writeValue(value: boolean): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  // Register the onChange function (from ControlValueAccessor)
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  // Register the onTouched function (from ControlValueAccessor)
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Handle the toggle change event
  onToggleChange(): void {
    this.toggleChange.emit(this.value);  // Emit current value (before async call)
    this.value = !this.value;  // Toggle the value locally
    this.onChange(this.value);  // Notify the parent about the change
  }
}
