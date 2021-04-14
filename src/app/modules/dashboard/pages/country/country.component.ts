import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  countryName: string;
  stats: any[] = [
    {
      metricTitle: 'Inversión',
      metricValue: 'USD 35,000',
      icon: 'fas fa-wallet',
      iconBg: '#172b4d'
    },
    {
      metricTitle: 'Clicks',
      metricValue: '280,0000',
      subMetricTitle: 'CTR',
      subMetricValue: '000',
      icon: 'fas fa-hand-pointer',
      iconBg: '#2f9998'

    },
    {
      metricTitle: 'Bounce Rate',
      metricValue: '12%',
      subMetricTitle: 'Usuarios',
      subMetricValue: '27000',
      icon: 'fas fa-stopwatch',
      iconBg: '#a77dcc'
    },
    {
      metricTitle: 'Transacciones',
      metricValue: '3,500',
      subMetricTitle: 'CR',
      subMetricValue: '000',
      icon: 'fas fa-shopping-basket',
      iconBg: '#f89934'
    },
    {
      metricTitle: 'Revenue',
      metricValue: '3,500',
      subMetricTitle: 'ROAS',
      subMetricValue: '000',
      icon: 'fas fa-hand-holding-usd',

      iconBg: '#fbc001'

    }
  ];

  devices: any[] = [
    { id: 1, name: 'Escritorio', value: 3000 },
    { id: 2, name: 'Tablet', value: 500 },
    { id: 3, name: 'Celular', value: 10500 }
  ]

  gender: any[] = [
    { id: 1, name: 'Hombre', value: 1200 },
    { id: 2, name: 'Mujer', value: 12800 },
  ]

  usersBySector: any[] = [
    {
      name: 'Search',
      value: 3500
    },
    {
      name: 'Marketing',
      value: 1500
    },
    {
      name: 'Ventas',
      value: 9000
    }
  ]

  salesBySector: any[] = [
    {
      name: 'Search',
      value: 250000
    },
    {
      name: 'Marketing',
      value: 37500
    },
    {
      name: 'Ventas',
      value: 85700
    }
  ]


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.countryName = params['country'];
    });
  }
}
