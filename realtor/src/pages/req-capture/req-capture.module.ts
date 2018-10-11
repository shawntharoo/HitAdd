import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReqCapturePage } from './req-capture';

@NgModule({
  declarations: [
    ReqCapturePage,
  ],
  imports: [
    IonicPageModule.forChild(ReqCapturePage),
  ],
})
export class ReqCapturePageModule {}
