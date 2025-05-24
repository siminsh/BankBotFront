import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  @Output() messageSent = new EventEmitter<string>();
  
  messageForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      message: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.messageForm.valid) {
      const message = this.messageForm.get('message')?.value;
      this.messageSent.emit(message);
      this.messageForm.reset();
    }
  }
}
