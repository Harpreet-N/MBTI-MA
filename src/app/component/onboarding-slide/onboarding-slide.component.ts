import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import {QuizComponent} from '../quiz/quiz.component';
import {VideoComponent} from '../video/video.component';
import {WalletCreationComponent} from '../wallet-creation/wallet-creation.component';
import {Router} from '@angular/router';

export interface OnboardingStep {
  title: string;
  text: string | null;
  video: string | null;
  progress: number | null;
  image?: string | null;
}



@Component({
  selector: 'app-onboarding-slide',
  imports: [
    NgIf,
    MatButton,
    MatProgressBar,
    QuizComponent,
    VideoComponent,
    WalletCreationComponent
  ],
  templateUrl: './onboarding-slide.component.html',
  standalone: true,
  styleUrl: './onboarding-slide.component.css'
})
export class OnboardingSlideComponent implements OnInit {
  @Input() title: string = '';
  @Input() text?: string = '';
  @Input() video?: string | undefined;
  @Input() progress?: number = 0;
  @Output() onFinish = new EventEmitter<void>();
  @Input() displayArray?: OnboardingStep[];

  currentIndex = 0;
  showQuiz = false; // initially false so onboarding is shown first
  showWalletCreation = false;


  onboarding: OnboardingStep[] = [
    {
      title: 'Welcome to Echo',
      text: 'Echo is a decentralized social platform that helps you build meaningful connections using Web3 technology.',
      video: null,
      progress: 25,
      image: 'assets/onboarding/echo2.jpg',
    },
    {
      title: 'What is Echo',
      text: `Echo is your personalized gateway into the Web3 social world.<br><br>
🌐 Connect with others based on shared values and personality (MBTI)<br>
💼 Own your identity and data with your Web3 wallet<br>
🎭 Discover events and communities aligned with your interests<br>
🔒 Experience privacy and freedom – you’re in full control<br><br>
Get ready to explore a new kind of social experience.`,
      video: null,
      progress: null,
      image: 'assets/onboarding/echo2.jpg',
    },
    {
      title: 'Discover Web3',
      text: 'Web3 is the next evolution of the internet, where users have full control over their data, identities, and digital assets.',
      video: `<iframe width="390" height="330" src="https://www.youtube.com/embed/GmRbLcmX4A4?si=hU8cPxwUXX1X0nZw&amp;start=3" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      progress: 50
    },
    {
      title: 'Learn about Web3',
      text: 'Web3 is the next evolution of the internet, where users have full control over their data, identities, and digital assets.',
      video: `<iframe width="390" height="330" src="https://www.youtube.com/embed/FExp9YuTzbY?si=EccVLQHTWAtXV6_s&amp;start=55" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
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
      progress: 100,
      image: 'assets/onboarding/wallet.jpg',
    },
    {
      title: 'PRIVY',
      text: null,
      video: null,
      progress: 100
    },
    {
      title: 'Your Wallet',
      text: 'For security purposes, your wallet is also saved in your iCloud or Google Drive. The reason for this is to ensure that you can always restore access to your wallet if your device is lost, damaged, or stolen. Having an encrypted backup in cloud storage provides an additional layer of safety, allowing you to securely recover your wallet and digital assets even if your original device becomes inaccessible.',
      video: null,
      progress: null,
      image: 'assets/onboarding/wallet-bitcoin.jpg',
    },
    {
      title: 'Your Web3 wallet is ready!',
      text: `Think of it as your personal digital keychain that lets you:<br><br>
🔐 Prove who you are (no need for usernames or passwords)<br>
🧾 Store your NFTs and digital collectibles securely<br>
💸 Sign transactions and manage your activity on the blockchain<br>
🧬 Match with people and join events based on your preferences`,
      video: null,
      progress: null,
      image: 'assets/onboarding/wallet-bitcoin.jpg',
    },
    {
      title: 'The key principle of Echo is MBTI',
      text: 'This Video will give you an overview about MBTI',
      video: `<iframe width="390" height="330" src="https://www.youtube.com/embed/RoQi9Mvqip0?si=70kTet-0bNqEBP2Q" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      progress: null
    },
    {
      title: 'Echo',
      text: 'Echo integrates the Myers-Briggs Type Indicator (MBTI) personality quiz as a key feature to enhance social interactions. By understanding their MBTI personality types, users can discover compatible people, join events, and participate in communities that align with their personality and interests. This personalized approach helps users build deeper, more fulfilling social connections based on genuine compatibility.',
      video: null,
      progress: null,
      image: 'assets/onboarding/mbti.jpg',
    },
    // Add more entries as needed
  ];

  constructor(private router: Router) {
  }


  ngOnInit(): void {
    const onBoardingIndex = parseInt(sessionStorage.getItem('onBoarding') || '');

    if (!onBoardingIndex && this.currentIndex === 0) {
      sessionStorage.clear();
    }

    if (onBoardingIndex) {
      // alert('Continue with the questions in the form.');
      this.currentIndex = onBoardingIndex;
      this.currentIndex++;
    }
  }

  next() {
    console.log('Moving to next step:', this.currentIndex);

    // At PRIVY step (index 4), show wallet-creation instead of moving forward
    if (this.onboarding[this.currentIndex].title === 'Creating Your Wallet') {
      this.currentIndex++;
      this.showWalletCreation = true;
      return; // Stop the default next action
    }

    if (this.onboarding[this.currentIndex].title == 'Your Web3 wallet is ready!') {
      sessionStorage.setItem('onBoarding', this.currentIndex.toString());
      this.router.navigate(['/gas']);
    }

    // Proceed to next step normally
    if (this.currentIndex < this.onboarding.length - 1) {
      this.currentIndex++;
    } else {
      sessionStorage.setItem('onBoarding', '');
      this.router.navigate(['/quiz']);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Callback from <app-wallet-creation>
  onWalletCreated() {
    this.showWalletCreation = false;
    this.next(); // Continue to the next step after wallet creation
  }

}
