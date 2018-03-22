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

    scheduledNotifications: any[] = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private localNotification:LocalNotifications, private alertCtrl:AlertController, private platform:Platform) {
        this.notificationTime = moment(new Date()).format();

        this.platform.ready().then((ready) => {
            this.localNotification.on('click', (notification, state) => {
                let alert = this.alertCtrl.create({
                    title: 'test',
                    subTitle: 'notif',
                });
                
                alert.present();
            });
        });
    }

    scheduleNotification(){
        console.log('notif schedule');
        this.localNotification.schedule({
            id: 1,
            title: 'Hey! Debout la dedans',
            text: 'Bon reveil avec Aube',
            at: new Date(new Date().getTime() + 5 * 1000),
        });
    }
}
