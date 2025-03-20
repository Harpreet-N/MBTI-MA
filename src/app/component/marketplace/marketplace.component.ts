import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NFT} from '../../model/nft.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-marketplace',
  imports: [
    NgForOf
  ],
  templateUrl: './marketplace.component.html',
  standalone: true,
  styleUrl: './marketplace.component.css'
})

export class MarketplaceComponent {
  nfts: NFT[] = [
    {
      id: 1,
      title: 'Silent Wave',
      creator: 'Pawel Czerwinski',
      priceEth: 1.5,
      priceEur: 2683.73,
      imageUrl: 'assets/images/nft1.jpg',
      description: 'This is an amazing Silent Wave NFT artwork.',
      tags: ['#art', '#wave']
    },
    {
      id: 2,
      title: 'Silent Color',
      creator: 'Team CyberYacht',
      priceEth: 0.5,
      priceEur: 2683.73,
      imageUrl: 'assets/images/nft2.jpg',
      description: 'Futuristic CyberYacht concept artwork.',
      tags: ['#color', '#circle', '#black', '#art']
    }
  ];

  constructor(private router: Router) {}

  viewDetails(nft: NFT) {
    this.router.navigate(['/nft-detail', nft.id]);
  }
}
