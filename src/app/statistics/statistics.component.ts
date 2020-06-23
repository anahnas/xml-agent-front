import {Component, OnInit} from '@angular/core';
import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';
import {StatisticsService} from './statistics.service';
import {Car} from '../model/car';
import {StatisticDTO} from '../model/statisticDTO';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {


  padding: any = { left: 5, top: 5, right: 5, bottom: 5 };
  titlePadding: any  = { left: 0, top: 0, right: 0, bottom: 10 };

  private noOfStats: number;

  /*dataAdapter1: any[] = [
    { Car: 'Nissan Versa', kmage: 1210},
    { Car: 'Chevrolet Aveo', kmage: 785},
  ];*/
  carsForStatistics: any[] = [];
  kmageStat: StatisticDTO [];
  ratingStat: StatisticDTO [];


  xAxis1: any =
    {
      position: 'top',
      dataField: 'Car',
      gridLines: { visible: true }
    };
  seriesGroups1: any[] =
    [
      {
        type: 'column',
        columnsGapPercent: 50,
        valueAxis:
          {
            title: { text: 'Kmage of a car' },
            minValue: 0,
            maxValue: 120,
          },
        series: [
          {
            dataField: 'km',
            displayText: 'Kmage of the car',
            labels: {
              visible: true,
              verticalAlignment: 'top',
              offset: {x: 0, y: -20}
            },
            formatFunction: (value: any) => {
              return value + ' km';
            }
          }
        ]
      }
    ];

  dataAdapter2: any[] = [
    { Car: 'Nissan Versa', comments: 28989},
    { Car: 'Chevrolet Aveo', comments: 78786},
  ];
  xAxis2: any =
    {
      position: 'top',
      dataField: 'Car',
      gridLines: { visible: true }
    };
  seriesGroups2: any[] =
    [
      {
        type: 'column',
        columnsGapPercent: 50,
        valueAxis:
          {
            title: { text: 'Comments for the car' },
            minValue: 0,
            maxValue: 50000,
          },
        series: [
          {
            dataField: 'comments',
            displayText: 'Comments for the car',
            labels: {
              visible: true,
              verticalAlignment: 'top',
              offset: {x: 0, y: -20}
            },
            formatFunction: (value: any) => {
              return value + ' comments';
            }
          }
        ]
      }
    ];
  dataAdapter3: any[] = [
  ];
  xAxis3: any =
    {
      position: 'top',
      dataField: 'Car',
      gridLines: { visible: true }
    };
  seriesGroups3: any[] =
    [
      {
        type: 'column',
        columnsGapPercent: 50,
        valueAxis:
          {
            title: { text: 'Rating for the car' },
            minValue: 0,
            maxValue: 50000,
          },
        series: [
          {
            dataField: 'stars',
            displayText: 'Stars for the car',
            labels: {
              visible: true,
              verticalAlignment: 'top',
              offset: {x: 0, y: -20}
            },
            formatFunction: (value: any) => {
              return value + ' stars';
            }
          }
        ]
      }
    ];

  constructor(private statisticService: StatisticsService) {
  }
  ngOnInit(): void {
    // this.cars = this.statisticService.getAllCars()
    this.statisticService.getAllCars().subscribe(data => {
      this.carsForStatistics = data;
      for (const car of this.carsForStatistics) {
        this.statisticService.getKmageOfCar(car.id).subscribe(kmageStat => {
          //  car.kmage = kmage;
          console.log(kmageStat);
          this.kmageStat = kmageStat;
         /* this.statisticService.getRating(car.id).subscribe(ratingStat => {
            console.log(ratingStat);
            this.ratingStat = ratingStat;*/
          this.fill();
        });


        // });


      }

    });

  }
  fill() {
    for (const kmageStat of this.kmageStat) {


        this.carsForStatistics = [
          ...this.carsForStatistics,
          {
            Car: kmageStat.name,
            km: kmageStat.kmage,

          }
        ];

      }

    for (const ratingStat of this.ratingStat) {


      this.carsForStatistics = [
        ...this.carsForStatistics,
        {
          Car: ratingStat.name,
          stars: ratingStat.rating,

        }
      ];

    }

    }
  }


