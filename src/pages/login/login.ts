import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../modules/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth }  from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private aFAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {}

  async login(user: User){
      try {
        await this.aFAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        this.navCtrl.push(ProfilePage);
      }
      catch(error) {
          console.log(error);
      }
  }

  redirectToRegisterPage(){
      this.navCtrl.push(RegisterPage);
  }
}
