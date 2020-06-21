import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {NewAdComponent} from './new-ad/new-ad.component';
import { AdComponent } from './ad/ad.component';
import { AdListComponent } from './ad-list/ad-list.component';
import {MessagesComponent} from './messages/messages.component';
import {MessageComponent} from './message/message.component';
import {StatisticsComponent} from './statistics/statistics.component';



const routes: Routes = [
  { path: 'homePage', component: HomePageComponent},
  { path: 'newAd', component: NewAdComponent },
  { path: 'ads/:id', component: AdComponent },
  { path: 'ads', component: AdListComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'messages/:id', component: MessageComponent },
  { path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
