import {Component, Inject} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
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
      <mat-icon class="success-icon">info</mat-icon>

      <h2 class="dialog-title">Confirm Purchase</h2>

      <p class="dialog-message">
        Are you sure you want to buy <strong>{{ data.ethAmount.toFixed(6) }}</strong> ETH for <strong>{{ data.amount.toFixed(2) }} €</strong>?
      </p>

      <div class="fee-details">
        <h3 class="fee-title">Fee Breakdown</h3>

        <div class="fee-item">
          <span class="fee-label">Transaction Fee:</span>
          <span class="fee-value">{{ (data.fee * 0.7).toFixed(2) }} €</span>
        </div>

        <div class="fee-item">
          <span class="fee-label">Gas Fee:</span>
          <span class="fee-value">{{ (data.fee * 0.3).toFixed(2) }} €</span>
        </div>

        <div class="fee-total">
          <span class="fee-label">Total Fees:</span>
          <span class="fee-value">{{ data.fee.toFixed(2) }} €</span>
        </div>
      </div>

      <div class="eth-fee-info">
        <p><strong>What is a Gas Fee?</strong></p>
        <p>A gas fee is a small amount of ETH paid to miners who process your transaction on the Ethereum blockchain.
          Gas fees vary based on network congestion and transaction complexity.</p>
        <p>These fees are not from Echo but are required by the Ethereum network to process transactions.</p>
      </div>

      <div class="dialog-buttons">
        <button mat-stroked-button color="warn" (click)="cancel()">Cancel</button>
        <button mat-flat-button color="primary" (click)="confirmBuy()">Buy Ethereum</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      text-align: center;
      max-width: 500px;
    }

    .success-icon {
      scale: 2;
      color: #000000;
      margin-bottom: 16px;
    }

    .dialog-title {
      font-weight: bold;
      font-size: 1.8rem;
      margin-bottom: 16px;
      color: #000000;
    }

    .dialog-message {
      color: #333333;
      font-size: 1.1rem;
      margin: 16px 0;
      line-height: 1.5;
    }

    .fee-details {
      width: 100%;
      background-color: #f5f7fa;
      border-radius: 12px;
      padding: 16px;
      margin: 16px 0;
      text-align: left;
    }

    .fee-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 16px;
      color: #000000;
      text-align: center;
    }

    .fee-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e0e0e0;
    }

    .fee-total {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      padding-top: 8px;
      border-top: 2px solid #000000;
      font-weight: 600;
    }

    .fee-label {
      color: #333333;
    }

    .fee-value {
      font-weight: 500;
      color: #000000;
    }

    .eth-fee-info {
      width: 100%;
      text-align: left;
      margin: 16px 0;
      padding: 16px;
      background-color: #f5f7fa;
      border-radius: 12px;
    }

    .eth-fee-info p {
      margin: 8px 0;
      color: #333333;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .eth-fee-info p strong {
      color: #000000;
    }

    .dialog-buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 24px;
      width: 100%;
    }

    button {
      min-width: 140px;
      padding: 8px 16px;
    }

    button[color="primary"] {
      background: linear-gradient(90deg, #000000, #333333);
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
    this.router.navigate(['/']); // Navigate to onboarding after buy
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
    NgIf,
    MatTooltipModule
  ],
  templateUrl: './buy-crypto.component.html',
  standalone: true,
  styleUrl: './buy-crypto.component.css'
})
export class BuyCryptoComponent {
  btcEquivalent: string = '0';
  availableBalance: number = 0;
  ethPrice: number = 1883.92;
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
      width: '500px',
      data: {
        ethAmount: this.ethAmount,
        amount: this.amount,
        fee: fee
      }
    });
  }

  constructor(private dialog: MatDialog) {}
}
