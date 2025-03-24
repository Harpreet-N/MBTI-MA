import {Routes} from '@angular/router';
import {MarketplaceComponent} from './component/marketplace/marketplace.component';
import {NftDetailComponent} from './component/nft-detail/nft-detail.component';
import {OnboardingSlideComponent} from './component/onboarding-slide/onboarding-slide.component';
import {BuyCryptoComponent} from './component/buy-crypto/buy-crypto.component';

export const routes: Routes = [{path: 'marketplace', component: MarketplaceComponent},
  {path: 'nft-detail/:id', component: NftDetailComponent},
  {path: 'buyCrypto', component: BuyCryptoComponent},
  {path: '', component: OnboardingSlideComponent}
];
