import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../modules/user';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    user = {} as User;

    constructor(private aFAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
      }

    async register(user: User){
        try{
            await this.aFAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
            this.navCtrl.push(ProfilePage);
        }
        catch(error) {
            console.log(error);
        }
    }
}
