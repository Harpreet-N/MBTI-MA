import {Component, EventEmitter, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-wallet-creation',
  templateUrl: './wallet-creation.component.html',
  standalone: true,
  imports: [
    NgIf,
    MatButton
  ],
  styleUrls: ['./wallet-creation.component.css']
})
export class WalletCreationComponent {
  @Output() walletCreated = new EventEmitter<void>();
  step: 'login' | 'loading' | 'success' = 'login';


  startCreationProcess() {
    this.step = 'loading';
    setTimeout(() => {
      this.step = 'success';
    }, 3000); // 3 second delay to simulate wallet creation
  }

  completeWallet() {
    this.walletCreated.emit();
  }
}
