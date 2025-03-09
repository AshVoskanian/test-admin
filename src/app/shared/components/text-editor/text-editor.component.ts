import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuillEditorComponent} from "ngx-quill";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [
    QuillEditorComponent,
    FormsModule
  ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {
  @Input() text: string = ''
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  onEditorChange(e: any) {
    this.onChange.emit(e);
  }
}
