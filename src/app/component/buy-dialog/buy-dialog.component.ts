import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-buy-dialog',
  imports: [
    MatIcon,
    MatButton,
    CurrencyPipe
  ],
  templateUrl: './buy-dialog.component.html',
  standalone: true,
  styleUrl: './buy-dialog.component.css'
})
export class BuyDialogComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<BuyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nft: any }
  ) {}

  cancel() {
    this.dialogRef.close(false); // Close dialog and return false
  }

  confirm() {
    this.dialogRef.close(true); // Close dialog and return true
    this.router.navigate(['/profile']); // Redirect to profile after buying
  }
}
