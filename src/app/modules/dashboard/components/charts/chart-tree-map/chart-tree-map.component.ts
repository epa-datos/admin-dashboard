import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/services/app-state.service';
import { loadLanguage } from 'src/app/tools/functions/chart-lang';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-chart-tree-map',
  templateUrl: './chart-tree-map.component.html',
  styleUrls: ['./chart-tree-map.component.scss']
})
export class ChartTreeMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() valueFormat: string; // USD MXN Copy shown in tooltip
  @Input() height: string = '350px'; // height property value valid in css
  @Input() status: number = 2; // 0) initial 1) load 2) ready 3) error
  @Input() errorLegend: string;

  private _name: string;
  get name() {
    return this._name;
  }
  @Input() set name(value) {
    this._name = value;
    this.chartID = `chart-tree-map-${this.name}`
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

  private chart: am4charts.TreeMap;
  chartID;
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

  loadChart(lang?: string) {

    am4core.useTheme(am4themes_animated);

    let chart = am4core.create(this.chartID, am4charts.TreeMap);
    chart.hiddenState.properties.opacity = 0;


    this.loadChartData(chart);
    loadLanguage(chart, lang);

    chart.colors.step = 2;

    // define data fields
    chart.dataFields.value = 'value';
    chart.dataFields.name = 'name';
    chart.dataFields.children = 'children';

    chart.zoomable = false;
    let bgColor = new am4core.InterfaceColorSet().getFor('background');

    // level 0 series template
    let level0SeriesTemplate = chart.seriesTemplates.create('0');
    let level0ColumnTemplate = level0SeriesTemplate.columns.template;

    level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
    level0ColumnTemplate.fillOpacity = 0;
    level0ColumnTemplate.strokeWidth = 4;
    level0ColumnTemplate.strokeOpacity = 0;

    // level 1 series template
    let level1SeriesTemplate = chart.seriesTemplates.create('1');
    let level1ColumnTemplate = level1SeriesTemplate.columns.template;

    level1SeriesTemplate.tooltip.animationDuration = 0;
    level1SeriesTemplate.strokeOpacity = 1;

    level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10)
    level1ColumnTemplate.fillOpacity = 1;
    level1ColumnTemplate.strokeWidth = 4;
    level1ColumnTemplate.stroke = bgColor;
    level1ColumnTemplate.tooltipText = `{name}: {value}${this.valueFormat ? this.valueFormat : ''}`;

    let bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
    bullet1.locationY = 0.5;
    bullet1.locationX = 0.5;
    bullet1.label.text = '{name}';
    bullet1.label.fill = am4core.color('#ffffff');

    chart.maxLevels = 2;
  }

  loadChartData(chart) {
    chart.data = this.data;
    this.chart = chart;
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

}
