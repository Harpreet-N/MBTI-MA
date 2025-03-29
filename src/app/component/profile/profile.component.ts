import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {NFT} from '../../model/nft.model';
import {ConfirmationDialogComponent} from './confirmationDialogComponent';
import {MatDialog} from '@angular/material/dialog';
import {EventProfile} from '../../model/event.profile.model';
import {EventModel} from '../../model/event.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  nftList: NFT[] = []; // default empty

  user = {
    username: 'Testing User',
    date: '',
    name: 'Test User',
    mbtiType: '',
    compatibility: '',
    description: 'I am a default User but tell me what are your interest?',
    avatar: 'assets/avatar/default.jpg',
    eventsParticipated: 54,
    followers: 834,
    following: 162
  };

  // NFTs the user bought

  // Events the user will join
  upcomingEvents: EventProfile[] = [];

  replies = [
    {
      avatar: 'assets/avatar/asiyajavayant.png',
      name: 'Alice',
      username: 'alice123',
      date: 'Apr 10',
      text: 'Really excited about this project!'
    },
    {
      avatar: 'assets/avatar/onyamalimba.png',
      name: 'Bob',
      username: 'bobby88',
      date: 'Apr 8',
      text: 'I totally agree with your opinion here!'
    }
  ];

  likes = [
    {
      avatar: 'assets/images/polarbear.jpg',
      name: 'NFT Creator',
      username: 'nftworld',
      date: 'Apr 7',
      text: 'This is my latest NFT drop!',
      likes: 1200
    },
    {
      avatar: 'assets/images/bear.jpg',
      name: 'Cool Artist',
      username: 'artistlife',
      date: 'Apr 6',
      text: 'So happy this one sold out!',
      likes: 950
    }
  ];

  selectedTabIndex: number = 0;

  constructor(protected router: Router, private dialog: MatDialog) {
  }

  activeTab: string = 'nft'; // default

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    // Save the selected tab index to session storage
    sessionStorage.setItem('profileSelectedTab', index.toString());
  }

  ngOnInit(): void {
    // Fetch MBTI and Compatibility from session storage
    this.loadMbtiFromSession();
    this.loadJoinedEventsFromSession();
    this.getDate();
    this.loadNFTList();
    // Restore the selected tab index from session storage
    const savedTabIndex = sessionStorage.getItem('profileSelectedTab');
    if (savedTabIndex !== null) {
      this.selectedTabIndex = parseInt(savedTabIndex);
    }
  }

  private loadNFTList() {
    const savedNfts = sessionStorage.getItem('nftList');

    this.nftList = savedNfts ? JSON.parse(savedNfts) : [];
  }

  private loadMbtiFromSession(): void {
    this.user.mbtiType = sessionStorage.getItem('mbtiType') || 'Unknown';
    this.user.compatibility = sessionStorage.getItem('compatibleType') || 'Unknown';
  }

  private loadJoinedEventsFromSession(): void {
    const storedEvents = JSON.parse(sessionStorage.getItem('joinedEvents') || '[]');
    this.upcomingEvents = storedEvents.length ? storedEvents : [];
  }

  private getDate() {
    // Generate current date in DD.MM.YY format
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const yy = String(today.getFullYear()).slice(-2);

    this.user.date = `${dd}.${mm}.${yy}`;
  }

  removeEvent(event: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {title: event.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.upcomingEvents = this.upcomingEvents.filter(e => e !== event);
      }
    });
  }

  viewEventDetails(event: EventProfile): void {
    this.router.navigate(['/event'], {
      queryParams: { title: event.title }
    });
  }

  viewNftDetails(nft: NFT): void {
    this.router.navigate(['/nft-detail', nft.id], {
      queryParams: { source: 'profile' }
    });
  }
}
