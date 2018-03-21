import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../modules/user';
import { ProfilePage } from '../profile/profile';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database'

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    user = {} as User;

    constructor(public loadingCtrl:LoadingController, private aFDatabase:AngularFireDatabase, private aFAuth: AngularFireAuth, public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {}


    async register(user: User){
        if(
            Object.keys(user).length === 0 || user.username === undefined || user.email === undefined || user.password === undefined || user.age === undefined || user.poids === undefined || user.sexe === undefined || user.ville === undefined || user.taille === undefined
        ) {
            this.showAlert('Veuillez remplir tous les champs')
        }
        else {
            try{
                await this.aFAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
                this.aFAuth.authState.subscribe(auth => {
                    this.aFDatabase.object(`user/${auth.uid}`).set({
                        'username': this.user.username,
                        'email': this.user.email,
                        'sexe': this.user.sexe,
                        'age': this.user.age,
                        'ville': this.user.ville,
                        'points': 0,
                        'poids': this.user.poids,
                        'taille': this.user.taille,
                    }).then( () => {
                        this.presentLoading();
                        this.navCtrl.setRoot(ProfilePage);
                    }).catch(error => {
                        this.showAlert(error.message);
                    });
                });
            }
            catch(error) {
                this.showAlert(error.message);
            }
        }
    }

    showAlert(message){
        let alert = this.alertCtrl.create({
            title: "Erreur d'inscription!",
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    presentLoading() {
        this.loadingCtrl.create({
            content: 'Chargement...',
            duration: 2000,
            dismissOnPageChange: true
        }).present();
    }
}
