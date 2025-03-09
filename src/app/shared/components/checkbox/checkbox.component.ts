import {Component, forwardRef, Input} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  standalone: true,
  styleUrls: ['./checkbox.component.scss'],
  imports: [
    TranslateModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string = 'Label';
  checked = false;
  onChange = (value: boolean) => {};
  onTouched = () => {};

  writeValue(value: boolean): void {
    this.checked = value; // Update internal state
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn; // Register the change callback
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn; // Register the touch callback
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  // Handle checkbox change event
  toggleCheckbox() {
    this.checked = !this.checked; // Toggle the internal state
    this.onChange(this.checked); // Notify Angular forms of the change
    this.onTouched(); // Mark the checkbox as touched
  }
}
