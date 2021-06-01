import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-omnichat-wrapper',
  templateUrl: './omnichat-wrapper.component.html',
  styleUrls: ['./omnichat-wrapper.component.scss']
})
export class OmnichatWrapperComponent implements OnInit {

  kpis: any[] = [
    {
      metricTitle: 'total chats',
      metricName: 'investment',
      metricValue: 380.092,
      // icon: 'fas fa-wallet',
      // iconBg: '#172b4d'
    },
    {
      metricTitle: 'promedio de chats por día',
      metricName: 'clicks',
      metricValue: 998,
      // icon: 'fas fa-hand-pointer',
      // iconBg: '#2f9998'

    },
    {
      metricTitle: '% dedicado al cliente',
      metricName: 'bounce_rate',
      metricValue: 41,
      metricFormat: 'percentage',
      // icon: 'fas fa-stopwatch',
      // iconBg: '#a77dcc'
    },
    {
      metricTitle: 'mediana de duración',
      metricName: 'transactions',
      metricValue: '00:05:34',
      subMetricTitle: 'Esperado',
      subMetricName: 'cr',
      subMetricValue: '< 10 Min',
      // icon: 'fas fa-shopping-basket',
      // iconBg: '#f89934'
    },
    {
      metricTitle: 'mediana de retardo',
      metricName: 'revenue',
      metricValue: '00:00:11',
      subMetricTitle: 'Benchmark',
      subMetricName: 'roas',
      subMetricValue: '< 48 Seg',
      // icon: 'fas fa-hand-holding-usd',
      // iconBg: '#fbc001'
    },
    {
      metricTitle: 'total chat',
      metricName: 'revenue',
      metricValue: '4.56/5',
      subMetricTitle: 'roas',
      subMetricName: 'roas',
      subMetricValue: 91.14,
      subMetricFormat: 'percentage',
      // icon: 'fas fa-hand-holding-usd',
      // iconBg: '#fbc001'
    }
  ];

  kpisReqStatus = 2;


  constructor() { }

  ngOnInit(): void {
  }

}
