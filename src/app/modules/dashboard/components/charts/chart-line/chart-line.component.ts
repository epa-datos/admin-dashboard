import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { loadLanguage } from 'src/app/tools/functions/chart-lang';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() value = 'value';
  @Input() date = 'date';
  @Input() status: number = 2; // 0) initial 1) load 2) ready 3) error
  @Input() valueFormat: string; // USD MXN Copy shown in tooltip
  @Input() yTitle: string;

  private _name: string;
  get name() {
    return this._name;
  }
  @Input() set name(value) {
    this._name = value;
    this.chartID = `chart-line-${this.name}`
  }

  private _data;
  get data() {
    return this._data;
  }
  @Input() set data(value) {
    this._data = value;
    if (this.chart) {
      this.loadChartData(this.chart);
    }
  }

  chartID;
  chart;
  langSub: Subscription;

  constructor(
    private appStateService: AppStateService
  ) { }

  ngOnInit(): void {
    this.langSub = this.appStateService.selectedLang$.subscribe((lang: string) => {
      this.loadChart(lang);
    });
  }

  ngAfterViewInit() {
    const defaultLang = this.appStateService.selectedLang;
    this.loadChart(defaultLang);
  }

  /**
 * Load chart 
 * @param [lang] 'es': Spanish | 'en': English | 'pt': Portuguese
 */
  loadChart(lang?: string) {
    am4core.useTheme(am4themes_animated);
    // Create chart instance
    let chart = am4core.create(this.chartID, am4charts.XYChart);

    // Add data
    this.loadChartData(chart);
    loadLanguage(chart, lang);

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    this.yTitle && (valueAxis.title.text = this.yTitle);

    dateAxis.renderer.labels.template.fontSize = 12;
    valueAxis.renderer.labels.template.fontSize = 12;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = this.value;
    series.dataFields.dateX = this.date;
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = `{valueY} ${this.valueFormat ? this.valueFormat : ''}`;
    series.tooltip.pointerOrientation = 'vertical';
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12)
    series.tensionX = 0.85;

    // Add scrollbar
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series);

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;
  }

  loadChartData(chart) {
    chart.data = this.data;
    this.chart = chart;
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }
}
