import { Routes } from '@angular/router';

import { CountryComponent } from './pages/country/country.component';
import { RetailerComponent } from './pages/retailer/retailer.component';

export const DashboardRoutes: Routes = [
    { path: 'country', component: CountryComponent },
    { path: 'retailer', component: RetailerComponent },
];
