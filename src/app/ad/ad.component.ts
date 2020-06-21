import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../service/car.service';
import {Car} from '../model/car';
import {CarBrand} from '../model/carBrand';
import {CarModel} from "../model/carModel";
import {CarClass} from "../model/carClass";
import {FuelType} from "../model/fuelType";
import {Rental} from "../model/rental";
import {TransmissionType} from "../model/transmissionType";
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbDropdownToggle, NgbDropdownMenu,
  NgbDropdown, NgbDropdownItem} from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {

  selectedId: string;
  currentRate = 8;
  adForm: FormGroup;
  rentals: Rental[] = [];
  rental: Rental = new Rental();
  rentalsNew: Rental[] = [];   
  startDate: Date;
  endDate: Date;

  imageUrl: string;

  closeResult: string;
  car: Car = new Car();
  carBrands: CarBrand[] = [];
  carModels: CarModel[] = [];
  carClasses: CarClass[] = [];
  fuelTypes: FuelType[] = [];
  transmissionTypes: TransmissionType[] = [];
  carCalendarId: string;

  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute,
              private router: Router, private modalService: NgbModal, 
              private carService: CarService, public datepipe: DatePipe) { 
              }

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
          this.carService.getCarCalendarId(this.selectedId)
            .subscribe(carCalendarId => {
              this.carCalendarId = carCalendarId;
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
  
  blockReservation(content) {
 
    console.log(this.selectedId);    
      
    this.carService.getRentals(this.selectedId)
      .subscribe((rentals => {
          this.rentals = rentals;

          for(let r of this.rentals) {    
            r.startDateString = this.datepipe.transform(r.startDate, 'yyyy-MM-dd');
            r.endDateString =this.datepipe.transform(r.endDate, 'yyyy-MM-dd');
            this.rentalsNew.push(r);
      
          }

        })
    );
    
    
    this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addRequest(startDate, endDate) {
    this.rental.startDate = this.startDate;
    this.rental.endDate = this.endDate;
    this.rental.carCalendarId = this.carCalendarId; 
    this.carService.addRental(this.rental)
      .subscribe( (response:any) => {
        console.log(response)
        alert("You've made a reservation.");
        window.location.reload();
      }, error => {
        alert("Error while making a reservation.");
      });
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
