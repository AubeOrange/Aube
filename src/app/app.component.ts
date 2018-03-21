import {Component, Injector, ViewChild} from '@angular/core';
import {Menu, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ChatPage} from "../pages/chat/chat";
import {AlarmPage} from "../pages/alarm/alarm";
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  chatPage:any = ChatPage;
  profilePage:any = ProfilePage;

  @ViewChild(Nav) nav: Nav;
  @ViewChild(Menu) menu:Menu;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,protected injector: Injector) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openRoute(param){
    this.nav.setRoot(param).then(data=>{
      this.menu.close();
    })
  }

  getNavCtrl(): NavController {
    return this.injector.get(NavController);
  }

}

