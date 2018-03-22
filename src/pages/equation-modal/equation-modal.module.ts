import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquationModalPage } from './equation-modal';

@NgModule({
  declarations: [
    EquationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EquationModalPage),
  ],
})
export class EquationModalPageModule {}
