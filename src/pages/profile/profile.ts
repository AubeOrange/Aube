import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ModalController } from 'ionic-angular';
import { User } from "../../modules/user";
import { ProfileModalPage } from '../profile-modal/profile-modal';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    userRef: AngularFireObject<any>;
    user: Observable<User>;

  constructor(private aFAuth:AngularFireAuth, private aFDatabase:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController) {}

  ionViewDidLoad() {
      this.aFAuth.authState.subscribe(data => {
          this.userRef = this.aFDatabase.object(`user/${data.uid}`);
          this.user = this.userRef.valueChanges();
      })
  }

  openModal() {
      const modal = this.modalCtrl.create(ProfileModalPage);
      modal.present();
  }

}
