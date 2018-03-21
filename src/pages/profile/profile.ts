import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    userRef: AngularFireObject<any>;
    user: Observable<any>;

  constructor(private aFAuth:AngularFireAuth, private aFDatabase:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
      this.aFAuth.authState.subscribe(data => {
          this.userRef = this.aFDatabase.object(`user/${data.uid}`);
          this.user = this.userRef.valueChanges();
      })
  }

}
