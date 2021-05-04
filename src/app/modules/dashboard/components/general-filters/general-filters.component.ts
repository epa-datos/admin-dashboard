import { Component, OnInit } from '@angular/core';
import { UsersMngmtService } from 'src/app/modules/users-mngmt/services/users-mngmt.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OverviewService } from '../../services/overview.service';
import { AppStateService } from 'src/app/services/app-state.service';

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

  sectorList: any[];
  categoryList: any[];
  campaignList: any[];

  countryID: number;

  form: FormGroup;
  startDate: AbstractControl;
  endDate: AbstractControl;
  sectors: AbstractControl;
  categories: AbstractControl;
  campaigns: AbstractControl;

  constructor(
    private fb: FormBuilder,
    private appStateService: AppStateService,
    private usersMngmtService: UsersMngmtService,
    private overviewService: OverviewService,
  ) { }

  ngOnInit() {
    this.loadForm();
    const selectedCountry = this.appStateService.selectedCountry;
    if (selectedCountry?.id) {
      this.countryID = selectedCountry.id;
      this.fillFilters();
    }

    this.appStateService.selectedCountry$.subscribe(country => {
      if (country?.id !== this.countryID) {
        this.countryID = country.id;
        this.fillFilters();
      }
    });
  }

  loadForm() {
    let today = new Date();
    let previousDay = new Date();
    let daysAgo = 15;

    previousDay.setDate(today.getDate() - daysAgo);

    this.form = this.fb.group({
      startDate: new FormControl(previousDay, [Validators.required]),
      endDate: new FormControl(today, [Validators.required]),
      sectors: new FormControl(),
      categories: new FormControl(),
      campaigns: new FormControl()
    });

    this.startDate = this.form.controls['startDate'];
    this.endDate = this.form.controls['endDate'];
    this.sectors = this.form.controls['sectors'];
    this.categories = this.form.controls['categories'];
    this.campaigns = this.form.controls['campaigns'];
  }

  async fillFilters() {
    await this.getSectors();
    await this.getCategories();
    this.countryID && this.getCampaigns();
  }

  getSectors() {
    this.usersMngmtService.getSectors()
      .toPromise()
      .then((res: any[]) => {
        this.sectorList = res;
        this.sectors.patchValue([...this.sectorList.map(item => item), 0]);
      })
      .catch((error) => {
        console.error(`[general-filers.component]: ${error}`);
      });
  }

  getCategories() {
    this.usersMngmtService.getCategories()
      .toPromise()
      .then((res: any[]) => {
        this.categoryList = res;
        this.categories.patchValue([...this.categoryList.map(item => item), 0]);
      })
      .catch((error) => {
        console.error(`[general-filers.component]: ${error}`);
      });
  }

  getCampaigns() {
    this.overviewService.getCampaigns(this.countryID)
      .subscribe(
        (res: any[]) => {
          this.campaignList = res;
          this.campaigns.patchValue([...this.campaignList.map(item => item), 0]);
        },
        error => {
          console.error(`[general-filers.component]: ${error}`);
        }
      );
  }
}
