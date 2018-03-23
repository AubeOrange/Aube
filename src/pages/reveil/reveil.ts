import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ChatPage } from '../chat/chat';
import * as moment from 'moment';

/**
 * Generated class for the ReveilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reveil',
    templateUrl: 'reveil.html',
})
export class ReveilPage {

    days: any[];
    notificationTime: any;
    notifHour: any;
    notifMinute: any;

    notifications: any[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private localNotification:LocalNotifications, private alertCtrl:AlertController, private platform:Platform) {
        this.notificationTime = moment(new Date()).format();

        this.platform.ready().then((ready) => {
            this.localNotification.on('click', (notification, state) => {
                this.navCtrl.setRoot(ChatPage, {mydata: "data"});
            });
        });
    }

    timeChange(time){
        this.notifHour = time.hour;
        this.notifMinute = time.minute;
    }

    scheduleNotification(){
        if( this.notifHour !== undefined && this.notifMinute !== undefined){
            console.log('notif schedule');

            let alert = this.alertCtrl.create({
                title:'Reveil programé',
                subTitle: 'Un nouveau reveil est programmé tous les jours à '+this.notifHour+':'+this.notifMinute,
                buttons: ['OK']
            });

            alert.present();

            this.localNotification.schedule({
                id: 1,
                title: 'Hey! Debout la dedans',
                text: 'Bon reveil avec Aube',
                sound: this.platform.is('android') ? 'file://assets/sounds/secondes.mp3' : 'file://assets/sounds/secondes.caf',
                at: new Date(new Date().getTime() + 5 * 1000),
            });
        }
        else {
            let alert = this.alertCtrl.create({
                title:'Oups',
                subTitle:'Veuillez selectionner une heure de reveil',
                buttons: ['OK']
            });

            alert.present();
        }
    }
}
