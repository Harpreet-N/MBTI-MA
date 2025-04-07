import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-quiz-result-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>{{ data.isCorrect ? 'Quiz Complete!' : 'Keep Learning!' }}</h2>
      <mat-dialog-content>
        <div class="result-content">
          <div class="score-display" [class.correct]="data.isCorrect" [class.incorrect]="!data.isCorrect">
            <mat-icon class="score-icon">{{ data.isCorrect ? 'emoji_events' : 'school' }}</mat-icon>
            <span class="score-text">{{ data.isCorrect ? 'Great job!' : 'Nice try!' }}</span>
          </div>

          <div class="answer-section">
            <h3>Your Answer:</h3>
            <div class="selected-answer" [class.correct]="data.isCorrect" [class.incorrect]="!data.isCorrect">
              <span class="answer-letter">{{ data.selectedOption }}</span>
              <span class="answer-text">{{ data.selectedAnswer }}</span>
              <mat-icon class="answer-icon">
                {{ data.isCorrect ? 'check_circle' : 'cancel' }}
              </mat-icon>
            </div>

            <div class="correct-answer" *ngIf="!data.isCorrect">
              <h3>Correct Answer:</h3>
              <div class="selected-answer correct">
                <span class="answer-letter">D</span>
                <span class="answer-text">All of the above</span>
                <mat-icon class="answer-icon">check_circle</mat-icon>
              </div>
            </div>
          </div>

          <p class="message">{{ data.explanation }}</p>
        </div>
      </mat-dialog-content>
      <div class="dialog-actions">
        <button mat-stroked-button (click)="dialogRef.close('learn')">Learn More About Wallets</button>
        <button mat-flat-button color="primary" (click)="dialogRef.close('profile')">Return to Profile</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
      max-width: 400px;
    }

    .result-content {
      text-align: center;
      padding: 16px 0;
    }

    .score-display {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;
    }

    .score-display.correct {
      color: #4caf50;
    }

    .score-display.incorrect {
      color: #ff9800;
    }

    .score-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    .score-display.correct .score-icon {
      color: #ffd700;
    }

    .score-display.incorrect .score-icon {
      color: #ff9800;
    }

    .score-text {
      font-size: 24px;
      font-weight: 500;
      color: inherit;
    }

    .answer-section {
      margin: 24px 0;
      text-align: left;
    }

    .answer-section h3 {
      font-size: 16px;
      font-weight: 500;
      color: #666;
      margin: 0 0 12px 0;
    }

    .selected-answer {
      display: flex;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      background-color: #f5f5f5;
      margin-bottom: 16px;
    }

    .selected-answer.correct {
      background-color: #e8f5e9;
      border: 1px solid #4caf50;
    }

    .selected-answer.incorrect {
      background-color: #ffebee;
      border: 1px solid #f44336;
    }

    .answer-letter {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 50%;
      margin-right: 12px;
      font-weight: 500;
    }

    .answer-text {
      flex: 1;
      font-size: 14px;
    }

    .answer-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .correct .answer-icon {
      color: #4caf50;
    }

    .incorrect .answer-icon {
      color: #f44336;
    }

    .message {
      font-size: 16px;
      line-height: 1.5;
      color: #666;
      margin: 0;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }
  `]
})
export class QuizResultDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QuizResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      isCorrect: boolean;
      selectedOption: string;
      selectedAnswer: string;
      explanation: string;
    }
  ) {
  }
}
