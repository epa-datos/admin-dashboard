import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Configuration } from 'src/app/app.constants';
import { AppStateService } from 'src/app/services/app-state.service';
import { FiltersStateService } from './filters-state.service';

@Injectable({
  providedIn: 'root'
})
export class PcSelectorService {
  private baseUrl: string;

  private countryID: number;
  private retailerID: number;

  constructor(
    private http: HttpClient,
    private config: Configuration,
    private filtersStateService: FiltersStateService,
    private appStateService: AppStateService
  ) {
    this.baseUrl = this.config.endpoint;

    const selectedCountry = this.appStateService.selectedCountry;
    const selectedRetailer = this.appStateService.selectedRetailer;

    if (selectedCountry?.id || selectedRetailer?.id) {
      this.countryID = selectedCountry?.id ? selectedCountry.id : undefined;
      this.retailerID = selectedRetailer?.id ? selectedRetailer.id : undefined;
    }

    this.appStateService.selectedCountry$.subscribe(country => {
      this.countryID = country?.id;
    });

    this.appStateService.selectedRetailer$.subscribe(retailer => {
      this.retailerID = retailer?.id;
    });
  }

  concatedQueryParams(isLatam?: boolean): string {
    let startDate = this.filtersStateService.periodQParams.startDate;
    let endDate = this.filtersStateService.periodQParams.endDate;

    const baseQParams = `start_date=${startDate}&end_date=${endDate}`;
    if (!isLatam) {
      return baseQParams;
    } else {
      let retailers = this.filtersStateService.retailersQParams;
      return `retailers=${retailers}&${baseQParams}`;
    }
  }

  /**
  *  GENERIC ENDPOINT
  * For endponts with a metric and optional submetric
  * @param isLatam flag to refers latam endpoints 
  * @param metricType 
  * @param [subMetricType] 
  * @returns  
  */
  getDataByMetric(isLatam: boolean, metricType: string, subMetricType?: string) {
    let queryParams = this.concatedQueryParams(isLatam);
    let baseEndpoint: string;

    if (this.retailerID) {
      baseEndpoint = `${this.baseUrl}/pc-selector/retailers/${this.retailerID}`;
    } else if (this.countryID) {
      baseEndpoint = `${this.baseUrl}/pc-selector/countries/${this.countryID}`;
    } else if (isLatam) {
      baseEndpoint = `${this.baseUrl}/pc-selector/latam`
    } else {
      return throwError('[pc-selector.service]: not countryID or retailerID provided');
    }

    return this.http.get(`${baseEndpoint}/${metricType}${subMetricType ? `/${subMetricType}` : ''}?${queryParams}`);
  }
}
