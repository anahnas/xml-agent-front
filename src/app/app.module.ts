import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomePageComponent} from './home-page/home-page.component';
import { NewAdComponent} from './new-ad/new-ad.component';
import { AdComponent } from './ad/ad.component';
import { RatingModule } from 'ng-starrating';
import { RatingComponent } from './rating/rating.component';
import { RatingService } from './service/rating.service';
import { AdListComponent } from './ad-list/ad-list.component';
import { CarService } from './service/car.service';
import {NewAdService} from './new-ad/new-ad.service';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {SafeHtml} from './new-ad/safeHtml.pipe';
import { MessagesComponent } from './messages/messages.component';
import {MessageService} from './service/message.service';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NewAdComponent,
    AdComponent,
    RatingComponent,
    AdListComponent,
    SafeHtml,
    MessagesComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RatingModule,
    NgbDatepickerModule
  ],
  providers: [NewAdService, CarService, RatingService, MessageService],

  bootstrap: [AppComponent]
})
export class AppModule { }
