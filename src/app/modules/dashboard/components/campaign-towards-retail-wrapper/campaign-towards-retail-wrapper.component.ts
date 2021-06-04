import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CampaignTowardsRetailService } from '../../services/campaign-towards-retail.service';

@Component({
  selector: 'app-campaign-towards-retail-wrapper',
  templateUrl: './campaign-towards-retail-wrapper.component.html',
  styleUrls: ['./campaign-towards-retail-wrapper.component.scss']
})
export class CampaignTowardsRetailWrapperComponent implements OnInit {
  @Input() requestInfoChange: Observable<boolean>;

  campPerformance: any[] = [];
  campPerformanceReqStatus: number = 0;

  campList: any[] = [
    {
      source: 'google',
      name: 'Google Search y MDF',
      campaigns: [],
      reqStatus: 0
    },
    {
      source: 'programmatic',
      name: 'Programmatic',
      campaigns: [],
      reqStatus: 0
    },
    {
      source: 'facebook',
      name: 'Social Media',
      campaigns: [],
      reqStatus: 0
    }
  ];

  requestInfoSub: Subscription;

  constructor(
    private campTowardsRetailServ: CampaignTowardsRetailService
  ) { }

  ngOnInit(): void {
    this.getAllData();

    this.requestInfoSub = this.requestInfoChange.subscribe((manualChange: boolean) => {
      this.getAllData();
    })
  }

  getAllData() {
    this.getCampaignsPerformance();
    this.getCampaignList();
  }

  getCampaignsPerformance() {
    this.campPerformanceReqStatus = 1;
    this.campTowardsRetailServ.getCampaignsPerformance().subscribe(
      (metrics: any) => {
        for (let metric of metrics) {
          if (metric.name === 'Impresiones' || metric.name === 'Clicks') {
            metric.customLineStye = 'dashed';
          }
          if (metric.name === 'Inversión') {
            metric.valueFormat = 'USD';
          }
        }

        this.campPerformance = metrics;
        this.campPerformanceReqStatus = 2;
      },
      error => {
        const errorMsg = error?.error?.message ? error.error.message : error?.message;
        console.error(`[campaign-towards-retail.component]: ${errorMsg}`);
        this.campPerformanceReqStatus = 3;
      });
  }

  getCampaignList() {
    this.campList.forEach(item => {
      item.reqStatus = 1;
      this.campTowardsRetailServ.getCampaignsList(item.source).subscribe(
        (campaigns: any) => {
          item.campaigns = campaigns;
          item.reqStatus = 2;
        },
        error => {
          const errorMsg = error?.error?.message ? error.error.message : error?.message;
          console.error(`[campaign-towards-retail.component]: ${errorMsg}`);
          item.reqStatus = 3;
        });
    });
  }
}
