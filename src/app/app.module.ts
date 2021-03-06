import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileModalPage } from '../pages/profile-modal/profile-modal';
import { FIREBAS_CONFIG } from "./app.firebase.config";
import {ChatPage} from "../pages/chat/chat";
import {ChatService} from "../pages/chat/chat.service";
import { Camera } from '@ionic-native/camera';

import { LocalNotifications } from '@ionic-native/local-notifications';
import {SpeechRecognition} from "@ionic-native/speech-recognition";
import { ReveilPage } from '../pages/reveil/reveil';
import {EquationModalPage} from "../pages/equation-modal/equation-modal";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        RegisterPage,
        ProfilePage,
        ChatPage,
        ProfileModalPage,
        EquationModalPage,
        ReveilPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: 'Retour'
        }),
        AngularFireModule.initializeApp(FIREBAS_CONFIG),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        RegisterPage,
        ProfilePage,
        ChatPage,
        ProfileModalPage,
        EquationModalPage,
        ReveilPage
    ],
    providers: [
        ChatService,
        LocalNotifications,
        Camera,
        SpeechRecognition,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})

export class AppModule {}
