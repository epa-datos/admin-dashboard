import { Component, OnInit } from '@angular/core';
import { DatasetsService } from 'src/app/services/datasets.service';
import Chart from 'chart.js';
import * as moment from 'moment';

import {
  chartOptions,
  parseOptions,
  chartBarOptions,
  chartDoughnutOptions,
  addDataToChart
} from "../../variables/charts";

@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.scss']
})
export class ChartJsComponent implements OnInit {
  public chart;

  constructor(private datasetService: DatasetsService) { }

  ngOnInit(): void {
    parseOptions(Chart, chartOptions());
    this.getInvestment();
  }

  getInvestment() {
    this.datasetService.getInvestment().subscribe((res: any) => {
      const { data } = res;
      this.getInvestmentByMonth(data);
      this.getInvestmentByCountry(data);
      this.getInvestmentBySector(data);
    })
  }

  getInvestmentByMonth(data) {
    const { investment_by_month } = data;
    let chartLabels = [];
    let chartData = [];

    for (const month of investment_by_month) {
      chartLabels.push(moment(month.date).format('MMM YYYY'));
      const value = ((+month.value.toString().slice(0, -2)) / 1000).toString()
      chartData.push(value);
    }

    const chartInfo = {
      labels: chartLabels,
      datasets: [{ data: chartData }]
    }
    const chartInvMonth = document.getElementById('chart-inv-month');

    this.chart = new Chart(chartInvMonth, {
      type: 'bar',
      options: chartBarOptions.options,
      data: addDataToChart(chartBarOptions, chartInfo)
    });
  }

  getInvestmentByCountry(data) {
    const { investment_by_country } = data;
    let chartLabels = [];
    let chartData = [];

    // console.log('investment_by_country', investment_by_country)

    for (const country of investment_by_country) {
      chartLabels.push(country.name);
      const value = (+country.value.toString().slice(0, -2))
      chartData.push(value);
    }

    const chartInfo = {
      labels: chartLabels,
      datasets: [{ data: chartData }]
    }
    const chartInvCountry = document.getElementById('chart-inv-country');

    this.chart = new Chart(chartInvCountry, {
      type: 'doughnut',
      options: chartDoughnutOptions.options,
      data: addDataToChart(chartDoughnutOptions, chartInfo),
    });

    // console.log('chartDoughnutOptions', chartDoughnutOptions)
  }

  getInvestmentBySector(data) {
    const { investment_by_sector } = data;
    let chartLabels = [];
    let chartData = [];

    // console.log('investment_by_sector', investment_by_sector)

    for (const sector of investment_by_sector) {
      chartLabels.push(sector.name);
      const value = (+sector.value.toString().slice(0, -2))
      chartData.push(value);
    }

    const chartInfo = {
      labels: chartLabels,
      datasets: [{ data: chartData }]
    }
    const chartInvSector = document.getElementById('chart-inv-sector');

    this.chart = new Chart(chartInvSector, {
      type: 'doughnut',
      options: chartDoughnutOptions.options,
      data: addDataToChart(chartDoughnutOptions, chartInfo),
    });

    // console.log('chartDoughnutOptions', chartDoughnutOptions)
  }
}
