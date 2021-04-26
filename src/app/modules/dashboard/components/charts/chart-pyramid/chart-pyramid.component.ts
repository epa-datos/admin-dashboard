import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-chart-pyramid',
  templateUrl: './chart-pyramid.component.html',
  styleUrls: ['./chart-pyramid.component.scss']
})
export class ChartPyramidComponent implements OnInit, AfterViewInit {

  @Input() category: string = 'age';
  @Input() value1: string = 'male';
  @Input() value2: string = 'female';
  @Input() valueName1: string = 'Hombres';
  @Input() valueName2: string = 'Mujeres';
  @Input() height: string = '350px'; // height property value valid in css

  private _name: string;
  get name() {
    return this._name;
  }
  @Input() set name(value) {
    this._name = value;
    this.chartID = `chart-pyramid-${this.name}`
  }

  private _data;
  get data() {
    return this._data;
  }
  @Input() set data(value) {
    this._data = value;
    this.chart && this.loadChartData(this.chart);
  }

  chartID;
  chart;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadChart();
  }

  loadChart() {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create(this.chartID, am4charts.XYChart);

    this.loadChartData(chart);

    // Use only absolute numbers
    chart.numberFormatter.numberFormat = '#.#s';

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = this.category;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.labels.template.fontSize = 12;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.extraMin = 0.1;
    valueAxis.extraMax = 0.1;
    valueAxis.renderer.minGridDistance = 40;
    valueAxis.renderer.ticks.template.length = 5;
    valueAxis.renderer.ticks.template.disabled = false;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
    valueAxis.renderer.labels.template.fontSize = 12;
    valueAxis.renderer.labels.template.adapter.add('text', function (text) {
      return text == 'Male' || text == 'Female' ? text : text + '%';
    })

    // Create series
    let male = chart.series.push(new am4charts.ColumnSeries());
    male.dataFields.valueX = this.value1;
    male.dataFields.categoryY = this.category;
    male.clustered = false;
    male.columns.template.column.fillOpacity = 0.8;
    male.columns.template.tooltipText = '{categoryY} años';

    let maleLabel = male.bullets.push(new am4charts.LabelBullet());
    maleLabel.label.text = '{valueX}%';
    maleLabel.label.hideOversized = false;
    maleLabel.label.truncate = false;
    maleLabel.label.horizontalCenter = 'right';
    maleLabel.label.dx = -10;
    maleLabel.label.fontSize = 12;


    let female = chart.series.push(new am4charts.ColumnSeries());
    female.dataFields.valueX = this.value2;
    female.dataFields.categoryY = this.category;
    female.clustered = false;
    female.columns.template.column.fillOpacity = 0.8;
    female.columns.template.tooltipText = '{categoryY} años';

    let femaleLabel = female.bullets.push(new am4charts.LabelBullet());
    femaleLabel.label.text = '{valueX}%';
    femaleLabel.label.hideOversized = false;
    femaleLabel.label.truncate = false;
    femaleLabel.label.horizontalCenter = 'left';
    femaleLabel.label.dx = 10;
    femaleLabel.label.fontSize = 12;

    let maleRange = valueAxis.axisRanges.create();
    maleRange.value = -10;
    maleRange.endValue = 0;
    maleRange.label.text = this.valueName1;
    maleRange.label.fill = chart.colors.list[0];
    maleRange.label.dy = 20;
    maleRange.label.fontWeight = '600';
    maleRange.grid.strokeOpacity = 1;
    maleRange.grid.stroke = male.stroke;

    let femaleRange = valueAxis.axisRanges.create();
    femaleRange.value = 0;
    femaleRange.endValue = 10;
    femaleRange.label.text = this.valueName2;
    femaleRange.label.fill = chart.colors.list[1];
    femaleRange.label.dy = 20;
    femaleRange.label.fontWeight = '600';
    femaleRange.grid.strokeOpacity = 1;
    femaleRange.grid.stroke = female.stroke;
  }

  loadChartData(chart) {
    chart.data = this.data;
    this.chart = chart;
  }
}
