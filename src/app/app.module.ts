import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomePageComponent} from './home-page/home-page.component';
import { NewAdComponent} from './new-ad/new-ad.component';
import {NewAdService} from './new-ad/new-ad.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NewAdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [NewAdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
