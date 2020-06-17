import { Component, OnInit } from '@angular/core';
import {NewAdService} from './new-ad.service';
import {Router} from '@angular/router';
import {Advertisement} from '../model/advertisement';
import {CarBrand} from '../model/carBrand';
import {CarModel} from '../model/carModel';
import {Car} from '../model/car';
import {CarClass} from '../model/carClass';

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



  constructor(private newAdService: NewAdService, private router: Router) {
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


  }

  onSubmit() {
    console.log(this.advertisement);


  }
}
