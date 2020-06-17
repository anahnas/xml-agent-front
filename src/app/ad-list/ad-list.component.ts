import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Car } from '../model/car';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  
  faCar = faCar;

  carList : Car[];

  constructor(private _carService:CarService, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.carList = [];

    this._carService.getAds()
      .subscribe( data => {
        console.log(data);
        for(let car of data)
          this.carList.push(car);
      });
  }

   
  openAd(carId:String) {
    this.router.navigate([carId], { relativeTo: this.route });  }
}
