import { Component, OnInit } from '@angular/core';
import { UsersMngmtService } from 'src/app/modules/users-mngmt/services/users-mngmt.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


export const MY_FORMATS = {
  parse: {
    dateInput: ['YYYY-MM-DD']
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-general-filters',
  templateUrl: './general-filters.component.html',
  styleUrls: ['./general-filters.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class GeneralFiltersComponent implements OnInit {

  sectors: any[];
  categories: any[];
  campaigns: any[];

  selectedSector: any;
  selectedCategory: any;
  selectedCampaign: any;

  constructor(private usersMngmtService: UsersMngmtService) { }

  ngOnInit(): void {
    this.getSectors();
    this.getCategories();
    this.getCampaigns();
  }

  getSectors() {
    this.usersMngmtService.getSectors()
      .subscribe(
        (res: any[]) => {
          this.sectors = res;
        },
        error => {
          console.error(`[general-filers.component]: ${error}`);
        }
      );
  }

  getCategories() {
    this.usersMngmtService.getCategories()
      .subscribe(
        (res: any[]) => {
          this.categories = res;
        },
        error => {
          console.error(`[general-filers.component]: ${error}`);
        }
      );
  }

  getCampaigns() {
    // this.usersMngmtService.getCategories()
    //   .subscribe(
    //     (res: any[]) => {
    //       this.campaigns = res;
    //     },
    //     error => {
    //       console.error(`[general-filers.component]: ${error}`);
    //     }
    //   );

    this.campaigns = [
      { id: 1, name: 'Campaña 1' },
      { id: 2, name: 'Campaña 2' },
      { id: 3, name: 'Campaña 3' },
      { id: 4, name: 'Campaña 4' }
    ]
  }
}
