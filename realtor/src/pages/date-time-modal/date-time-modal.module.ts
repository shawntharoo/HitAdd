import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DateTimeModalPage } from './date-time-modal';

@NgModule({
  declarations: [
    DateTimeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(DateTimeModalPage),
  ],
})
export class DateTimeModalPageModule {}
