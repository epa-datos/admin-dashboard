import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CountryComponent } from './pages/country/country.component';
import { RetailerComponent } from './pages/retailer/retailer.component';
import { DashboardRoutes } from './dashboard.routing';
import { GeneralFiltersComponent } from './components/general-filters/general-filters.component';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    DashboardComponent,
    CountryComponent,
    RetailerComponent,
    GeneralFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatSelectModule
  ]
})
export class DashboardModule { }
