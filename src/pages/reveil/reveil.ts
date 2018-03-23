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
    notifHour: any = 0;
    notifMinute: any = 0;

    notifications: any[] = [];

    scheduledNotifications: any[] = [];

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
        if( this.notifHour === 0 || this.notifMinute === 0){
            let alert = this.alertCtrl.create({
                title:'Oups',
                subTitle:'Veuillez selectionner une heure de reveil',
            });

            alert.present();
        }
        else {
            // this.localNotification.schedule({
            //     id: 1,
            //     title: 'Hey! Debout la dedans',
            //     text: 'Bon reveil avec Aube',
            //     sound: 'file://assets/sounds/secondes.wav',
            //     at: new Date(new Date().getTime() + 5 * 1000),
            //     every:'day',
            // });

            this.localNotification.schedule({
                id: 1,
                title: 'hey',
                text: 'bon reveil',
                at: new Date(new Date().getTime() + 5 * 1000),
            });

            let alert = this.alertCtrl.create({
                title:'Youpi',
                subTitle:'Vous serez reveiller tous les jours de la semaine à '+ this.notifHour + ":" + this.notifMinute,
            });

            alert.present();
        }
    }
}
