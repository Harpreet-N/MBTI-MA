import {Component, Inject} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';



@Component({
  selector: 'success-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  template: `
    <div class="dialog-container">
      <mat-icon class="success-icon" color="primary">check_circle</mat-icon>
      <h2 class="dialog-title">Success!</h2>
      <p class="dialog-message">
        You've successfully bought <strong>{{ data.ethAmount.toFixed(6) }}</strong> ETH for <strong>{{ data.amount.toFixed(2) }} €</strong>.
      </p>
      <p class="dialog-fee">
        Total fees: <strong>{{ data.fee.toFixed(2) }} €</strong>
      </p>

      <button mat-flat-button color="primary" (click)="goToProfile()">Go to Profile</button>
    </div>
  `,
  styles: [`
    button {
      margin-top: 16px;
    }
  `]
})
export class SuccessDialogComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ethAmount: number; amount: number; fee: number }
  ) {}

  goToProfile() {
    this.dialogRef.close();
    this.router.navigate(['/profile']); // You need to have /profile route configured
  }
}

@Component({
  selector: 'app-buy-crypto',
  imports: [
    MatFormField,
    FormsModule,
    MatButton,
    MatInput,
    MatLabel,
    SuccessDialogComponent
  ],
  templateUrl: './buy-crypto.component.html',
  standalone: true,
  styleUrl: './buy-crypto.component.css'
})
export class BuyCryptoComponent {
  btcEquivalent: string = '0';
  availableBalance: number = 0;
  ethPrice: number = 2019.29;
  amount: number = 0;
  ethAmount: number = 0;

  constructor(private dialog: MatDialog) {}

  updateETHAmount() {
    this.ethAmount = this.amount / this.ethPrice;
  }

  buyCrypto() {
    this.updateETHAmount();

    const feePercentage = 0.029;
    const flatFee = 0.3;
    const minFee = 5;

    let fee = this.amount * feePercentage + flatFee;
    if (fee < minFee) {
      fee = minFee;
    }

    console.log(`Buying ${this.ethAmount.toFixed(6)} ETH for ${this.amount} EUR, fee: ${fee} EUR`);

    this.dialog.open(SuccessDialogComponent, {
      width: '300px',
      data: {
        ethAmount: this.ethAmount,
        amount: this.amount,
        fee: fee
      }
    });
  }
}
