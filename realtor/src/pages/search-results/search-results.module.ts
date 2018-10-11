import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultsPage } from './search-results';
//import {NgSwitch,NgSwitchCase} from  '@angular/common';

@NgModule({
  declarations: [
    SearchResultsPage,
  ],
  imports: [
    // NgSwitch, NgSwitchCase,
    IonicPageModule.forChild(SearchResultsPage),
    
  ],
})
export class SearchResultsPageModule {}
