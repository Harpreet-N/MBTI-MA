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
      title: 'Panda Wave',
      creator: 'Pawel Czerwinski',
      priceEth: 1.5,
      priceEur: 2683.73,
      imageUrl: 'assets/images/panda.jpg',
      description: 'This is an amazing Panda NFT artwork.',
      tags: ['#art', '#wave']
    },
    {
      id: 2,
      title: 'Bear',
      creator: 'Team CyberYacht',
      priceEth: 0.5,
      priceEur: 2683.73,
      imageUrl: 'assets/images/bear.jpg',
      description: 'Bear concept artwork.',
      tags: ['#color', '#circle', '#black', '#art']
    },
    {
      id: 2,
      title: 'Polarbear',
      creator: 'Cold',
      priceEth: 0.5,
      priceEur: 2683.73,
      imageUrl: 'assets/images/polarbear.jpg',
      description: 'Snowwhite polar Bear',
      tags: ['#color', '#circle', '#black', '#art']
    }
  ];

  constructor(private router: Router) {}

  viewDetails(nft: NFT) {
    this.router.navigate(['/nft-detail', nft.id]);
  }
}
