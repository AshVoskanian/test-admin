import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    TranslateModule,
    NgClass
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
  },]
})
export class InputComponent implements OnInit {
  @Output() iconClick = new EventEmitter();

  @Input() label: string = '';
  @Input() iconClass: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'number' | 'checkbox' | 'password' = 'text';

  fixedType = '';

  value: string = '';

  ngOnInit() {
    this.fixedType = this.type;
  }

  onChange: (value: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  toggleType() {
    if (this.type === "password") {
      this.type = "text";
      return;
    }

    if (this.type === "text") {
      this.type = "password"
    }
  }
}
