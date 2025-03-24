import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {EventModel} from '../../model/event.model';


@Component({
  selector: 'join-event-dialog',
  template: `
    <div class="dialog-container">
      <mat-icon>help_outline</mat-icon>
      <h2>Join Event?</h2>
      <p>Do you want to join <strong>{{ data.event.title }}</strong>?</p>

      <div class="dialog-actions">
        <button mat-stroked-button (click)="cancel()">Cancel</button>
        <button mat-flat-button color="primary" (click)="confirm()">Join</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  styles: [`
    .dialog-container {
      text-align: center;
      padding: 24px;
    }

    .dialog-actions {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
  `]
})
export class JoinEventDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<JoinEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: EventModel }
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    // Send event data to profile or backend here if needed
    this.dialogRef.close('joined');
  }
}
