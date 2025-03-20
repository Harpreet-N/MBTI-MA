import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-buy-dialog',
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './buy-dialog.component.html',
  standalone: true,
  styleUrl: './buy-dialog.component.css'
})
export class BuyDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<BuyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  goToProfile() {
    this.dialogRef.close('success');
  }
}
