import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllAppointmentsPage } from './all-appointments';

@NgModule({
  declarations: [
    AllAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllAppointmentsPage),
  ],
})
export class AllAppointmentsPageModule {}
