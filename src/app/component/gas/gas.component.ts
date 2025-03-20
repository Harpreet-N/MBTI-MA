import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatProgressBar} from '@angular/material/progress-bar';
import {OnboardingStep} from '../onboarding-slide/onboarding-slide.component';
import {VideoComponent} from '../video/video.component';
import {BuyCryptoComponent} from '../buy-crypto/buy-crypto.component';


@Component({
  selector: 'app-gas',
  imports: [
    NgIf,
    MatButton,
    MatProgressBar,
    VideoComponent,
    BuyCryptoComponent
  ], templateUrl: './gas.component.html', standalone: true,
  styleUrl: './gas.component.css'
})
export class GasComponent {
  @Input() title: string = '';
  @Input() text?: string = '';
  @Input() video?: string | undefined;
  @Input() progress?: number = 0;
  currentIndex = 0;
  buyGasComponet: boolean = false;




  onboarding: OnboardingStep[] = [
    {
      title: 'Before you purchase Eth understand gas fee',
      text: 'Gas fees a fee which is paid on the ETH network to the crypto miners who process your transactions.',
      video: `<iframe width="390" height="330" src="https://www.youtube.com/embed/uotLpbfQLyM" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      progress: 50
    },
    {
      title: 'What can I buy with ETH?',
      text: '',
      video: `<iframe width="390" height="330" src="https://www.youtube.com/embed/pxaSOHDmhTM"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      progress: 100
    },
  ];

  next() {
    // If we are at the last onboarding slide, start quiz
    if (this.currentIndex === this.onboarding.length - 1) {
      this.buyGas();
    } else {
      this.currentIndex++;
    }
  }

  buyGas() {
    this.buyGasComponet = true;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

}
