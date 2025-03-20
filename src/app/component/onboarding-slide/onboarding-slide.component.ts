import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import {QuizComponent} from '../quiz/quiz.component';
import {VideoComponent} from '../video/video.component';

export interface OnboardingStep {
  title: string;
  text: string | null;
  video: string | null;
  progress: number | null;
}



@Component({
  selector: 'app-onboarding-slide',
  imports: [
    NgIf,
    MatButton,
    MatProgressBar,
    QuizComponent,
    VideoComponent
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
  @Input() displayArray?: OnboardingStep[];

  currentIndex = 0;
  showQuiz = false; // initially false so onboarding is shown first



  onboarding: OnboardingStep[] = [
    {
      title: 'Welcome to Echo',
      text: 'Echo is a decentralized social platform that helps you build meaningful connections using Web3 technology.',
      video: null,
      progress: 25
    },
    {
      title: 'Discover Web3',
      text: 'Web3 is the next evolution of the internet, where users have full control over their data, identities, and digital assets.',
      video: `<iframe width="390" height="330" src="https://www.youtube.com/embed/GmRbLcmX4A4?si=hU8cPxwUXX1X0nZw&amp;start=3" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      progress: 50
    },
    {
      title: 'Your Web3 Wallet',
      text: 'A Web3 wallet is your gateway to the decentralized world.',
      video: `<iframe width="390" height="330" src="https://www.youtube.com/embed/x1ORD2BNuDg?si=8y5peRMYandOYrgx&amp;start=4" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
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
      video: `<iframe width="390" height="330" src="https://www.youtube.com/embed/RoQi9Mvqip0?si=70kTet-0bNqEBP2Q" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
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
