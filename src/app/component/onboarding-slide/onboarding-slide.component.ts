import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import {QuizComponent} from '../quiz/quiz.component';

@Component({
  selector: 'app-onboarding-slide',
  imports: [
    NgIf,
    MatButton,
    MatProgressBar,
    QuizComponent
  ],
  templateUrl: './onboarding-slide.component.html',
  standalone: true,
  styleUrl: './onboarding-slide.component.css'
})
export class OnboardingSlideComponent {
  @Input() title: string = '';
  @Input() text?: string = '';
  @Input() video?: string | undefined;
  @Input() progress?: number = 0;
  @Output() onFinish = new EventEmitter<void>();

  currentIndex = 0;
  showQuiz = false; // initially false so onboarding is shown first

  completeOnboarding() {
    // Call this when the user finishes all slides
    this.onFinish.emit();
  }

  onboarding = [
    {
      title: 'Welcome to Echo',
      text: 'Echo is a decentralized social platform that helps you build meaningful connections using Web3 technology.',
      video: null,
      progress: 25
    },
    {
      title: 'Discover Web3',
      text: 'Web3 is the next evolution of the internet, where users have full control over their data, identities, and digital assets.',
      video: 'https://www.youtube.com/watch?v=GmRbLcmX4A4',
      progress: 50
    },
    {
      title: 'Your Web3 Wallet',
      text: 'A Web3 wallet is your gateway to the decentralized world.',
      video: 'https://www.youtube.com/watch?v=x1ORD2BNuDg',
      progress: 75
    },
    {
      title: 'Creating Your Wallet',
      text: 'Now it’s time to create your wallet! Your Web3 wallet will allow you to interact with Echo, manage your digital identity, and securely store your assets. Follow the steps to generate your wallet.',
      video: null,
      progress: 100
    },
    {
      title: ' Wallet',
      text: 'PRIVYYYY',
      video: null,
      progress: 100
    },
    {
      title: 'Your Wallet',
      text: 'For security purposes, your wallet is also saved in your iCloud or Google Drive. The reason for this is to ensure that you can always restore access to your wallet if your device is lost, damaged, or stolen. Having an encrypted backup in cloud storage provides an additional layer of safety, allowing you to securely recover your wallet and digital assets even if your original device becomes inaccessible.',
      video: null,
      progress: null
    },
    {
      title: 'The key principle of Echo is MBTI',
      text: null,
      video: 'https://www.youtube.com/watch?v=RoQi9Mvqip0',
      progress: null
    },
    {
      title: 'Echo',
      text: 'Echo integrates the Myers-Briggs Type Indicator (MBTI) personality quiz as a key feature to enhance social interactions. By understanding their MBTI personality types, users can discover compatible people, join events, and participate in communities that align with their personality and interests. This personalized approach helps users build deeper, more fulfilling social connections based on genuine compatibility.',
      video: null,
      progress: null
    },
    // Add more entries as needed
  ];

  next() {
    // If we are at the last onboarding slide, start quiz
    if (this.currentIndex === this.onboarding.length - 1) {
      this.startQuiz();
    } else {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  startQuiz() {
    this.showQuiz = true;
  }
}
