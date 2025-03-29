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
  cameFromProfile: boolean = false;
  isOwned: boolean = false;

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
      id: 3,
      title: 'Polarbear',
      creator: 'Cold',
      priceEth: 0.5,
      priceEur: 2683.73,
      imageUrl: 'assets/images/polarbear.jpg',
      description: 'Snowwhite polar Bear',
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
    
    // Check if we came from profile using query parameters
    this.route.queryParams.subscribe(params => {
      this.cameFromProfile = params['source'] === 'profile';
    });

    // Check if the NFT is already owned by the user
    this.checkIfOwned();
  }

  private checkIfOwned(): void {
    if (!this.nft) return;
    
    const userNfts = JSON.parse(sessionStorage.getItem('nftList') || '[]');
    this.isOwned = userNfts.some((ownedNft: NFT) => ownedNft.id === this.nft?.id);
  }

  goBack(): void {
    if (this.cameFromProfile) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/marketplace']);
    }
  }

  buyNFT() {
    if (this.isOwned) return;
    
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      width: '300px',
      data: { nft: this.nft }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // NFT purchased! Now add it to the user's NFT list in sessionStorage
        let nftList = JSON.parse(sessionStorage.getItem('nftList') || '[]');
        nftList.push(result);
        sessionStorage.setItem('nftList', JSON.stringify(nftList));

        // Navigate to profile
        this.router.navigate(['/profile']);
      }
    });
  }

}
