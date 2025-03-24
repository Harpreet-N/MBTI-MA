import {Component, Inject} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {DecimalPipe, NgIf} from '@angular/common';


@Component({
  selector: 'success-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  template: `
    <div class="dialog-container">
      <mat-icon class="success-icon" color="primary">info</mat-icon>

      <h2 class="dialog-title">Confirm Purchase</h2>

      <p class="dialog-message">
        Are you sure you want to buy <strong>{{ data.ethAmount.toFixed(6) }}</strong> ETH for <strong>{{ data.amount.toFixed(2) }} €</strong>?
      </p>

      <p class="dialog-fee">
        Total fees: <strong>{{ data.fee.toFixed(2) }} €</strong>
      </p>

      <div class="dialog-buttons">
        <button mat-stroked-button color="warn" (click)="cancel()">Cancel</button>

        <button mat-flat-button color="primary" (click)="confirmBuy()">Buy Crypto</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      text-align: center;
    }

    .success-icon {
      font-size: 48px;
      color: #4CAF50;
      margin-bottom: 16px;
    }

    .dialog-title {
      font-weight: bold;
      font-size: 1.5rem;
      margin-bottom: 8px;
    }

    .dialog-message, .dialog-fee {
      color: #666;
      font-size: 1rem;
      margin: 8px 0;
    }

    .dialog-buttons {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 20px;
      width: 100%;
    }

    button {
      min-width: 120px;
    }
  `]
})
export class SuccessDialogComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ethAmount: number; amount: number; fee: number }
  ) {}

  cancel() {
    this.dialogRef.close(false);
  }



  confirmBuy() {
    this.dialogRef.close(true);
    this.router.navigate(['/profile']); // Navigate to profile after buy

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
    SuccessDialogComponent,
    MatIcon,
    DecimalPipe,
    NgIf
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
  walletId: string = '1234-5678-9012';  // Replace with your real wallet ID logic

  updateETHAmount(): void {
    if (this.amount > 0) {
      this.ethAmount = this.amount / this.ethPrice;
    } else {
      this.ethAmount = 0;
    }
  }

  buyCrypto(): void {
    if (this.amount <= 0) {
      alert('Please enter a valid amount!');
      return;
    }

    const feePercentage = 0.029;
    const flatFee = 0.3;
    const minFee = 5;

    let fee = this.amount * feePercentage + flatFee;
    if (fee < minFee) {
      fee = minFee;
    }
    this.dialog.open(SuccessDialogComponent, {
      width: '300px',
      data: {
        ethAmount: this.ethAmount,
        amount: this.amount,
        fee: fee
      }
    });
  }


  constructor(private dialog: MatDialog) {}
}
