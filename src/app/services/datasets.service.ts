import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class DatasetsService {

  baseUrl: string;

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) {
    this.baseUrl = this.config.endpoint;
  }

  getInvestment() {
    return this.http.get(`${this.baseUrl}/investment`);
  }
}
