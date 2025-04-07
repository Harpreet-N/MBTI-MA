import {Routes} from '@angular/router';
import {MarketplaceComponent} from './component/marketplace/marketplace.component';
import {NftDetailComponent} from './component/nft-detail/nft-detail.component';
import {OnboardingSlideComponent} from './component/onboarding-slide/onboarding-slide.component';
import {BuyCryptoComponent} from './component/buy-crypto/buy-crypto.component';
import {EventComponent} from './component/event/event.component';
import {ProfileComponent} from './component/profile/profile.component';
import {EditProfileComponent} from './component/edit-profile/edit-profile.component';
import {WalletCreationComponent} from './component/wallet-creation/wallet-creation.component';
import {GasComponent} from './component/gas/gas.component';
import {QuizComponent} from './component/quiz/quiz.component';
import {WalletQuizComponent} from './component/wallet-quiz/wallet-quiz.component';

export const routes: Routes = [{path: 'marketplace', component: MarketplaceComponent},
  {path: 'nft-detail/:id', component: NftDetailComponent},
  {path: 'buyCrypto', component: BuyCryptoComponent},
  {path: 'event', component: EventComponent},
  {path: 'event/:id', component: EventComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/edit', component: EditProfileComponent},
  {path: 'wallet', component: WalletCreationComponent},
  {path: 'gas', component: GasComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'quizlearn', component: WalletQuizComponent},
  {path: '', component: OnboardingSlideComponent}
];
