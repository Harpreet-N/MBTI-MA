import {Component, OnInit} from '@angular/core';
import {NFT} from '../../model/nft.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {BuyDialogComponent} from '../buy-dialog/buy-dialog.component';

@Component({
  selector: 'app-nft-detail',
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    NgForOf,
    NgIf
  ],
  templateUrl: './nft-detail.component.html',
  standalone: true,
  styleUrl: './nft-detail.component.css'
})
export class NftDetailComponent implements OnInit {
  nft: NFT | undefined;

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

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    protected router: Router
  ) {}

  ngOnInit(): void {
    const nftId = +this.route.snapshot.paramMap.get('id')!;
    this.nft = this.nfts.find(item => item.id === nftId);
  }

  buyNFT() {
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      width: '300px',
      data: { nft: this.nft }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.router.navigate(['/profile']);
      }
    });
  }

}
