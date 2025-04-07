import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {QuizResultDialogComponent} from './quiz-result-dialog.component';

@Component({
  selector: 'app-wallet-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './wallet-quiz.component.html',
  styleUrls: ['./wallet-quiz.component.css']
})
export class WalletQuizComponent {
  question = "What is the main purpose of your wallet?";
  options = [
    {id: 'A', text: 'To store NFTs and crypto', correct: false},
    {id: 'B', text: 'To prove your identity', correct: false},
    {id: 'C', text: 'To connect to Web3 apps', correct: false},
    {id: 'D', text: 'All of the above', correct: true}
  ];

  selectedOption: string | null = null;
  isSubmitted = false;
  isCorrect = false;

  explanation = "Your wallet serves multiple purposes: it stores your NFTs and cryptocurrencies, proves your identity through cryptographic signatures, and allows you to connect to Web3 applications. This multi-functionality is what makes Web3 wallets powerful tools for the decentralized web.";

  constructor(
    public router: Router,
    private dialog: MatDialog
  ) {
  }

  selectOption(optionId: string): void {
    if (!this.isSubmitted) {
      this.selectedOption = optionId;
    }
  }

  submitAnswer(): void {
    if (this.selectedOption) {
      this.isSubmitted = true;
      const selectedAnswer = this.options.find(opt => opt.id === this.selectedOption);
      this.isCorrect = selectedAnswer?.correct || false;

      const dialogRef = this.dialog.open(QuizResultDialogComponent, {
        width: '400px',
        disableClose: true,
        data: {
          isCorrect: this.isCorrect,
          selectedOption: this.selectedOption,
          selectedAnswer: selectedAnswer?.text || '',
          explanation: this.explanation
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'learn') {
          // Navigate to a learning page about wallets
          this.router.navigate(['/wallet-learning']);
        } else {
          // Default action is to return to profile
          this.router.navigate(['/profile']);
        }
      });
    }
  }

  continue(): void {
    this.router.navigate(['/profile']);
  }
}
