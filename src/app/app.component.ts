import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OnboardingSlideComponent} from './component/onboarding-slide/onboarding-slide.component';

@Component({
  selector: 'app-root',
  imports: [OnboardingSlideComponent, RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor() {}

}
