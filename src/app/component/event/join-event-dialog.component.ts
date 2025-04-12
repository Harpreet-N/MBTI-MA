import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {EventModel} from '../../model/event.model';

@Component({
  selector: 'app-join-event-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <mat-icon class="success-icon">event_available</mat-icon>
      <h2 class="dialog-title">Join Event</h2>

      <div class="event-details">
        <h3>{{ data.event.title }}</h3>
        <p class="event-info">
          <mat-icon>event</mat-icon>
          {{ data.event.date }} at {{ data.event.time }}
        </p>
        <p class="event-info">
          <mat-icon>place</mat-icon>
          {{ data.event.location }}
        </p>
      </div>

      <p class="dialog-message">
        Are you sure you want to join this event? You'll receive updates and notifications about the event.
      </p>

      <div class="dialog-actions">
        <button mat-stroked-button (click)="onNoClick()">Cancel</button>
        <button mat-flat-button color="primary" (click)="onJoinClick()">Join Event</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
      text-align: center;
      max-width: 400px;
    }

    .success-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #000000;
      margin-bottom: 16px;
    }

    .dialog-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 24px;
      color: #000000;
    }

    .event-details {
      background-color: #f5f7fa;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
      text-align: left;
    }

    .event-details h3 {
      margin: 0 0 16px 0;
      font-size: 18px;
      color: #000000;
    }

    .event-info {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
      color: #666;
    }

    .event-info mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .dialog-message {
      color: #666;
      line-height: 1.5;
      margin-bottom: 24px;
    }

    .dialog-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
    }

    .dialog-actions button {
      min-width: 120px;
    }

    button[color="primary"] {
      background: linear-gradient(90deg, #000000, #333333);
    }
  `]
})
export class JoinEventDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<JoinEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: EventModel }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onJoinClick(): void {
    this.dialogRef.close('joined');
  }
}
