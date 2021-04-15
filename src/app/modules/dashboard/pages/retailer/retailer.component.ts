import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.scss']
})
export class RetailerComponent implements OnInit {

  countryName;
  retailerName;
  activeTabView: number = 1;

  campMetrics = [
    {
      name: 'Clicks',
      serie: [
        { date: new Date(2021, 1, 1), value: 25000 },
        { date: new Date(2021, 2, 1), value: 47000 },
        { date: new Date(2021, 3, 1), value: 50000 }
      ]
    },
    {
      name: 'Impresiones',
      serie: [
        { date: new Date(2021, 1, 1), value: 20000 },
        { date: new Date(2021, 2, 1), value: 35000 },
        { date: new Date(2021, 3, 1), value: 40000 }
      ]
    },
    {
      name: 'CPC',
      serie: [
        { date: new Date(2021, 1, 1), value: 45000 },
        { date: new Date(2021, 2, 1), value: 37000 },
        { date: new Date(2021, 3, 1), value: 40000 }
      ]
    },
    {
      name: 'Inversión',
      serie: [
        { date: new Date(2021, 1, 1), value: 30000 },
        { date: new Date(2021, 2, 1), value: 27510 },
        { date: new Date(2021, 3, 1), value: 50000 }
      ]
    },
    {
      name: 'Inversión',
      serie: [
        { date: new Date(2021, 1, 1), value: 30000 },
        { date: new Date(2021, 2, 1), value: 27510 },
        { date: new Date(2021, 3, 1), value: 50000 }
      ]
    }
  ]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.countryName = params['country'];
      this.retailerName = params['retailer']
    });
  }

}
