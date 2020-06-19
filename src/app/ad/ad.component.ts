import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../car.service';
import {Car} from '../model/car';
import {CarBrand} from '../model/carBrand';
import {CarModel} from '../model/carModel';
import {CarClass} from '../model/carClass';
import {FuelType} from '../model/fuelType';
import {TransmissionType} from '../model/transmissionType';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {

  selectedId: string;
  currentRate = 8;
  adForm: FormGroup;

  imageUrl: string;

  car: Car = new Car();
  carBrands: CarBrand[] = [];
  carModels: CarModel[] = [];
  carClasses: CarClass[] = [];
  fuelTypes: FuelType[] = [];
  transmissionTypes: TransmissionType[] = [];

  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private carService: CarService) { }

  ngOnInit() {
    this.adForm = this.formBuilder.group({
      carBrand: ['', Validators.required],
      carModel: ['', Validators.required],
      fuelType: ['', Validators.required],
      transmission: ['', Validators.required],
      carClass: ['', Validators.required],
      childSeats:  ['', Validators.required],
      kmage:  ['', Validators.required],
      waiver:  ['', Validators.required],
      limitedKms:  ['', Validators.required]
    });

    this.activeRoute.params.subscribe((params) => {
      this.selectedId = params.id;
      this.carService.getAd(this.selectedId)
        .subscribe(data => {
          this.car = data;
          this.carService.getCarBrands()
            .subscribe(carBrands => {
              this.carBrands = carBrands;
            });
          this.carService.getCarModels()
            .subscribe(carModels => {
              this.carModels = carModels;
            });
          this.carService.getCarClasses()
            .subscribe(carClasses => {
              this.carClasses = carClasses;
            });
          this.carService.getFuelTypes()
            .subscribe(fuelTypes => {
              this.fuelTypes = fuelTypes;
            });
          this.carService.getTransmissionTypes()
            .subscribe(transmissionTypes => {
              this.transmissionTypes = transmissionTypes;
            });
          this.carService.getImage(this.selectedId)
            .subscribe(image => {
              this.imageUrl = URL.createObjectURL(image);
            });

          this.adForm.setValue({
            carBrand: this.car.carModelDTO.carBrandDTO.name,
            carModel: this.car.carModelDTO.name,
            fuelType: this.car.fuelTypeDTO.type,
            transmission: this.car.transmissionDTO.type,
            carClass: this.car.carModelDTO.carClassDTO.carClass,
            childSeats: this.car.availableChildSeats,
            kmage: this.car.kmage,
            waiver: this.car.waiver,
            limitedKms: this.car.limitedKms
          });
        });
    });
  }

  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}) {
    alert('Only users can change the rating.');
  }

  updateAd() {
    this.car.carModelDTO.name = this.adForm.value.carModel;
    this.car.carModelDTO.carBrandDTO.name = this.adForm.value.carBrand;
    this.car.carModelDTO.carClassDTO.carClass = this.adForm.value.carClass;
    this.car.fuelTypeDTO.type = this.adForm.value.fuelType;
    this.car.transmissionDTO.type = this.adForm.value.transmission;
    this.car.availableChildSeats = this.adForm.value.childSeats;
    this.car.waiver = this.adForm.value.waiver;
    this.car.kmage = this.adForm.value.kmage;
    this.car.limitedKms = this.adForm.value.limitedKms;

    this.carService.updateCar(this.car)
      .subscribe(car => {
        console.log(this.car);
        location.reload();
      });
  }
}
