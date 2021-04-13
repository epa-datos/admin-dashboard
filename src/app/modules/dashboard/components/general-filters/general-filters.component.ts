import { Component, OnInit } from '@angular/core';
import { UsersMngmtService } from 'src/app/modules/users-mngmt/services/users-mngmt.service';

@Component({
  selector: 'app-general-filters',
  templateUrl: './general-filters.component.html',
  styleUrls: ['./general-filters.component.scss']
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
    this.usersMngmtService.getCategories()
      .subscribe(
        (res: any[]) => {
          this.campaigns = res;
        },
        error => {
          console.error(`[general-filers.component]: ${error}`);
        }
      );
  }
}
