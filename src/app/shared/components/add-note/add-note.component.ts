import {Component, Input, input, output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TextareaComponent} from "../textarea/textarea.component";

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [
    FormsModule,
    TextareaComponent
  ],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss'
})
export class AddNoteComponent {
  addNote = output<string>();

  @Input() note: string = '';
  @Input() required: boolean = false;

  onSubmit(e: Event) {
    if (!this.note) {
      this.required = true;
      setTimeout(() => this.required = false, 600);
      return;
    }
    e.stopPropagation();
    this.addNote.emit(this.note);
  }
}
