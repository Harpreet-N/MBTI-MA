import {Component, Input, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrl: './video.component.css'
})
export class VideoComponent {
  @Input() videoIframeString: string = '';
  safeVideoHtml: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoIframeString'] && this.videoIframeString) {
      console.log('Raw iframe string:', this.videoIframeString);

      this.safeVideoHtml = this.sanitizer.bypassSecurityTrustHtml(this.videoIframeString);

      console.log('Sanitized iframe:', this.safeVideoHtml);
    }
  }
}
