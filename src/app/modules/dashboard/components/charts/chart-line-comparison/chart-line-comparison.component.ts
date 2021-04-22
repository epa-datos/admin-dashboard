import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'app-chart-line-comparison',
  templateUrl: './chart-line-comparison.component.html',
  styleUrls: ['./chart-line-comparison.component.scss']
})
export class ChartLineComparisonComponent implements OnInit, AfterViewInit {

  @Input() data;
  @Input() valueName1: string; // Property name shown in tooltip
  @Input() valueName2: string; // Property name shown in tooltip
  @Input() valueFormat: string; // USD MXN Copy shown in tooltip

  chartID;
  loadStatus: number = 0;

  private _name: string;
  get name() {
    return this._name;
  }
  @Input() set name(value) {
    this._name = value;
    this.chartID = `chart-line-comparison-${this.name}`
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadChart();
  }

  loadChart() {
    this.loadStatus = 1;
    // Create chart instance
    var chart = am4core.create(this.chartID, am4charts.XYChart);
    chart.data = this.data;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.labels.template.fontSize = 12;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 12;

    // Create series
    const serieName1 = this.valueName1 ? this.valueName1 : '{date.formatDate()}';
    const serieName2 = this.valueName2 ? this.valueName2 : '{previousDate.formatDate()}';

    // serie 1
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value1";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = `${serieName1}: [bold]${this.valueFormat ? this.valueFormat : ''} {value1}[/]\n ${serieName2}: [bold]${this.valueFormat ? this.valueFormat : ''} {value2}[/]`;
    series.tooltip.pointerOrientation = "vertical";
    series.tensionX = 0.85;
    series.name = serieName1;

    // serie 2
    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.dateX = "date";
    series2.strokeWidth = 2;
    series2.strokeDasharray = "3,4";
    series2.stroke = series.stroke;
    series2.tensionX = 0.85; 1
    series2.name = serieName2;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.responsive.enabled = true;

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'bottom';
    // this.loadStatus = 2;
  }
}
