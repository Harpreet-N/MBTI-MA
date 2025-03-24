import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {NFT} from '../../model/nft.model';
import {ConfirmationDialogComponent} from './confirmationDialogComponent';
import {MatDialog} from '@angular/material/dialog';

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
    username: 'Amy',
    date: 'Joined January 2024',
    name: 'Amy',
    mbtiType: 'INTJ',
    compatibility: 'ENFP',
    description: 'Likes to sing and play Volleyball',
    avatar: 'assets/avatar/amyelsner.png',
    eventsParticipated: 54,
    followers: 834,
    following: 162
  };

  // NFTs the user bought

  // Events the user will join
  upcomingEvents = [
    {
      title: 'Silent Wave Concert',
      type: ['External', 'Thinking'],
      date: '2024-04-15 18:00',
      location: 'Virtual Concert Hall',
      status: 'active', // or 'over'
      image: 'assets/event/concert.jpg',
    },
    {
      title: 'Colorful Music Festival',
      type: ['Internal', 'Sensing'],
      date: '2024-05-05 20:00',
      location: 'Berlin Open Air Stage',
      status: 'over',
      image: 'assets/event/music.jpg',
    }
  ];

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


  constructor(protected router: Router, private dialog: MatDialog) {
  }

  activeTab: string = 'nft'; // default

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  onTabChange(index: number): void {
    const tabLabels = ['nft', 'events', 'replies', 'likes'];
    this.activeTab = tabLabels[index] || 'nft';
  }


  ngOnInit(): void {
    const savedProfile = JSON.parse(sessionStorage.getItem('userProfile') || '{}');

    this.user = {
      ...this.user,    // keep defaults if no data
      name: savedProfile.name || 'Amy',
      description: savedProfile.description || 'Likes to sing and play Volleyball',
      avatar: savedProfile.avatar || 'assets/avatar/amyelsner.png'
    };

    const savedNfts = sessionStorage.getItem('nftList');

    this.nftList = savedNfts ? JSON.parse(savedNfts) : [];

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
}
