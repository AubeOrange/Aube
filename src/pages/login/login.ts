import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../modules/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth }  from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    user = {} as User;

    constructor(private aFAuth:AngularFireAuth, public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {}

    showAlert(message){
        let alert = this.alertCtrl.create({
            title: 'Login error!',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    async login(user: User){
        try {
            await this.aFAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            this.navCtrl.setRoot(ProfilePage);
        }
        catch(error) {
            this.showAlert(error.message);
        }
    }

    redirectToRegisterPage(){
      this.navCtrl.push(RegisterPage);
    }
}
