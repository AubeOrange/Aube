/**
 * Created by Yun on 20/03/2018.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
    declarations: [
        LoginPage,
    ],
    imports: [
        IonicPageModule.forChild(LoginPage),
    ],
})
export class LoginPageModule {}