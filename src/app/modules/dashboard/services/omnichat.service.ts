import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Configuration } from 'src/app/app.constants';
import { AppStateService } from 'src/app/services/app-state.service';
import { FiltersStateService } from './filters-state.service';

@Injectable({
  providedIn: 'root'
})
export class OmnichatService {
  private baseUrl: string;

  private countryID: number;
  private retailerID: number;

  constructor(
    private http: HttpClient,
    private config: Configuration,
    private filtersStateService: FiltersStateService,
    private appStateService: AppStateService) {

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

  concatedQueryParams(isLatam?: boolean, uniqueSectorID?: number, uniqueCategoryID?: number, uniqueSourceID?: number, omitSectors?: boolean): string {
    let startDate = this.filtersStateService.periodQParams.startDate;
    let endDate = this.filtersStateService.periodQParams.endDate;
    let sectors = !uniqueSectorID ? this.filtersStateService.sectorsQParams : uniqueSectorID;
    let categories = !uniqueCategoryID ? this.filtersStateService.categoriesQParams : uniqueCategoryID;
    let campaigns = this.filtersStateService.campaignsQParams;

    const baseQParams = `start_date=${startDate}&end_date=${endDate}${!omitSectors ? `&sectors=${sectors}` : ''}&categories=${categories}`;
    if (!isLatam) {
      return `${baseQParams}${campaigns ? `&campaigns=${campaigns}` : ''}`;
    } else {
      let retailers = this.filtersStateService.retailersQParams;
      let sources = !uniqueSourceID ? this.filtersStateService.sourcesQParams : uniqueSourceID;
      return `retailers=${retailers}&sources=${sources}&${baseQParams}`;
    }
  }

  getKpis(isLatam: boolean) {
    let queryParams = this.concatedQueryParams(isLatam);

    if (isLatam) {
      return this.http.get(`${this.baseUrl}/omnichat/latam/kpis?${queryParams}`);
    } else if (this.retailerID) {
      return this.http.get(`${this.baseUrl}/retailers/${this.retailerID}/omnichat/kpis?${queryParams}`);
    } else if (this.countryID) {
      return this.http.get(`${this.baseUrl}/countries/${this.countryID}/omnichat/kpis?${queryParams}`);
    } else {
      return throwError('[omnichat.service]: not retailerID or countryID provided');
    }
  }

  getCountries(metricType: string) {  // only for latam
    let queryParams = this.concatedQueryParams();
    return this.http.get(`${this.baseUrl}/omnichat/latam/${metricType}/countries?${queryParams}`);
  }

  getRetailers(isLatam: boolean, metricType: string) {
    let queryParams = this.concatedQueryParams(isLatam);

    if (isLatam) {
      return this.http.get(`${this.baseUrl}/omnichat/latam/${metricType}/retailers?${queryParams}`);
    } else if (this.countryID) {
      return this.http.get(`${this.baseUrl}/countries/${this.countryID}/omnichat/${metricType}/retailers?${queryParams}`);
    } else {
      return throwError('[omnichat.service]: not countryID provided');
    }
  }

  getCategories(isLatam: boolean, metricType: string) {
    let queryParams = this.concatedQueryParams(isLatam);

    if (isLatam) {
      return this.http.get(`${this.baseUrl}/omnichat/latam/${metricType}/categories?${queryParams}`);
    } else if (this.retailerID) {
      return this.http.get(`${this.baseUrl}/retailers/${this.retailerID}/omnichat/${metricType}/categories?${queryParams}`);
    } else if (this.countryID) {
      return this.http.get(`${this.baseUrl}/countries/${this.countryID}/omnichat/${metricType}/categories?${queryParams}`);
    } else {
      return throwError('[omnichat.service]: not retailerID or countryID provided');
    }
  }

  getHistory(isLatam: boolean) {
    let queryParams = this.concatedQueryParams(isLatam);

    if (isLatam) {
      return this.http.get(`${this.baseUrl}/omnichat/latam/history?${queryParams}`);
    } else if (this.retailerID) {
      return this.http.get(`${this.baseUrl}/retailers/${this.retailerID}/omnichat/history?${queryParams}`);
    } else if (this.countryID) {
      return this.http.get(`${this.baseUrl}/countries/${this.countryID}/omnichat/history?${queryParams}`);
    } else {
      return throwError('[omnichat.service]: not retailerID or countryID provided');
    }
  }
}
