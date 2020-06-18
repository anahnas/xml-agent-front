import { Component, OnInit } from '@angular/core';
import {NewAdService} from './new-ad.service';
import {Router} from '@angular/router';
import {Advertisement} from '../model/advertisement';
import {CarBrand} from '../model/carBrand';
import {CarModel} from '../model/carModel';
import {Car} from '../model/car';
import {CarClass} from '../model/carClass';
import {FuelType} from '../model/fuelType';
import {Transmission} from '../model/transmission';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import {DatePipe} from '@angular/common';
import {NgbDatepickerConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})

export class NewAdComponent implements OnInit {

  advertisement: Advertisement = new Advertisement();
  selectedBrand: CarBrand;
  selectedModel: CarModel;
  carModels: CarModel[] = [];
  carBrands: CarBrand[] = [];
  carClasses: CarClass[] = [];
  fuelTypes: FuelType[] = [];
  transmissions: Transmission[] = [];
  faCalendar = faCalendar;

  constructor(private newAdService: NewAdService, private router: Router) {
    this.advertisement.car = new Car();
   //  this.advertisement.car.carBrand = new CarBrand();
    this.advertisement.car.carModel = new CarModel();
    this.advertisement.car.waiver = false;
    this.advertisement.car.limitedKms = false;

  }



  ngOnInit(): void {
    this.newAdService.getCarBrands().subscribe(data => {
      this.carBrands = data;
    });
    this.newAdService.getCarModels().subscribe(data2 => {
      this.carModels = data2;
    });
    this.newAdService.getCarClass().subscribe(data3 => {
      this.carClasses = data3;
    });
    this.newAdService.getFuelType().subscribe(data4 => {
    this.fuelTypes = data4;
    });
    this.newAdService.getTransmission().subscribe(data5 => {
      this.transmissions = data5;
    });

  }

  onSubmit() {
    console.log(this.advertisement);
    this.newAdService.createAdvertisement(this.advertisement).subscribe(result => {
      alert('Success!');
      this.router.navigate(['/newAd']);

    });

  }


}
