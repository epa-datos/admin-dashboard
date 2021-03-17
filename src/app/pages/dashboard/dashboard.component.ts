import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartLineOptions,
  chartBarOptions,
  chartDoughnutOptions,
  chartPieOptions,
  addDataToChart
} from "../../variables/charts";

import {
  dataset_1,
  dataset_2,
  dataset_3,
  dataset_4
} from "../../variables/datasets";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    parseOptions(Chart, chartOptions());

    const chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartLineOptions.options,
      data: addDataToChart(chartLineOptions, dataset_1)
    });

    const chartOrders = document.getElementById('chart-orders');

    this.salesChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartBarOptions.options,
      data: addDataToChart(chartBarOptions, dataset_2, 'sales')
    });

    const chartGender = document.getElementById('chart-gender');

    this.salesChart = new Chart(chartGender, {
      type: 'doughnut',
      options: chartDoughnutOptions.options,
      data: addDataToChart(chartDoughnutOptions, dataset_3, 'gender')
    });

    const chartDevices = document.getElementById('chart-devices');

    this.salesChart = new Chart(chartDevices, {
      type: 'pie',
      options: chartPieOptions.options,
      data: addDataToChart(chartPieOptions, dataset_4, 'device')
    });
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
