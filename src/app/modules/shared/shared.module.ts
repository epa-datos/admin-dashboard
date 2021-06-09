import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    ModalComponent,
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [
    ModalComponent,
    MaintenanceComponent,
    TranslateModule,
  ],
  providers: [
    HttpClient
  ]
})
export class SharedModule { }
