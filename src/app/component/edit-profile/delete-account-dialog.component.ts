import {Component} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-delete-account-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title class="dialog-title">Delete Account</h2>
      <mat-dialog-content>
        <div class="warning-icon">
          <mat-icon  style="color: #dc3545;">warning</mat-icon>
        </div>
        <p class="warning-text">  Are you sure you want to delete your account? This action is permanent and cannot be undone.</p>
        <p class="warning-detail">  Echo does not store your personal data on central servers. Your identity and assets are managed via your blockchain wallet and stored on the decentralized network.
          By deleting your account, your session and local app data will be removed. However, your wallet and any assets you own will remain accessible through your Web3 wallet unless you take further action.</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-flat-button  style="background-color: #dc3545;" (click)="onConfirm()">Delete Account</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
      min-width: 400px;
    }
    .dialog-title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
      color: #333;
    }
    mat-dialog-content {
      padding: 16px 0;
      text-align: center;
    }
    .warning-icon {
      margin-bottom: 16px;
    }
    .warning-icon mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }
    .warning-text {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #333;
    }
    .warning-detail {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
    }
    mat-dialog-actions {
      padding: 16px 0 0 0;
      margin-bottom: 0;
    }
    mat-dialog-actions button {
      min-width: 120px;
    }
  `]
})
export class DeleteAccountDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteAccountDialogComponent>) {
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
