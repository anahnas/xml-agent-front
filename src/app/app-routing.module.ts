import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {NewAdComponent} from './new-ad/new-ad.component';

const routes: Routes = [
  { path: 'homePage', component: HomePageComponent},
  { path: 'newAd', component: NewAdComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
