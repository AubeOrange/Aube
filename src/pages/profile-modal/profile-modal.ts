import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import {User} from "../../modules/user";

@IonicPage()
@Component({
    selector: 'page-profile-modal',
    templateUrl: 'profile-modal.html',
})
export class ProfileModalPage {

    user = {} as User;
    userRef: AngularFireObject<any>;
    userInfo: Observable<User>;

    constructor(private aFAuth:AngularFireAuth, private aFDatabase:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        this.aFAuth.authState.subscribe(data => {
            this.userRef = this.aFDatabase.object(`user/${data.uid}`);
            this.userInfo = this.userRef.valueChanges();
        })
    }

    updateProfile(user: User){
        this.userRef.update(user).then(() => {
            this.dismiss();
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
