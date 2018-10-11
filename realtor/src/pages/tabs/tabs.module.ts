import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
// import { CountryPickerModule } from 'ngx-country-picker';

// @IonicPage()
@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    // CountryPickerModule.forRoot()
  ],
  exports:[
      TabsPage
  ]
})
export class TabsPageModule {}
