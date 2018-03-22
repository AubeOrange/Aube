import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
        this.platform.ready().then(ready => {
            this.localNotification.on('click', (notification, state) => {
                let json = JSON.parse(notification.data);
                let alert = this.alertCtrl.create({
                    title: notification.title,
                    subTitle: json.mydata,
                });
                alert.present();
            });
        });

        this.days = [
            { title: 'Lundi', dayId: 1, checked: false},
            { title: 'Mardi', dayId: 2, checked: false},
            { title: 'Mercredi', dayId: 3, checked: false},
            { title: 'Jeudi', dayId: 4, checked: false},
            { title: 'Vendredi', dayId: 5, checked: false},
            { title: 'Samedi', dayId: 6, checked: false},
            { title: 'Dimanche', dayId: 0, checked: false},
        ];
    }

    timeChange(time){
        console.log(time);
        this.notifHour = time.hour;
        this.notifMinute = time.minute;
    }


    scheduleNotification(){
        let currentDate = new Date();
        let currentDay = currentDate.getDay();

        for(let day of this.days) {
            if(day.checked){
                let firstNotificationTime = new Date();
                let dayDifference = day.dayId - currentDay;

                if(dayDifference < 0){
                    dayDifference += 7;
                }
                firstNotificationTime.setHours(this.notifHour);
                firstNotificationTime.setMinutes(this.notifMinute);
                firstNotificationTime.setDate(firstNotificationTime.getDate() + dayDifference);

                let notification = {
                    id: day.dayId,
                    title: 'Hey! Debout la dedans',
                    text: 'Bon reveil avec Aube',
                    sound: this.platform.is('android') ? 'file://assets/sounds/secondes.mp3' : 'file://assets/sounds/secondes.caf',
                    at: firstNotificationTime,
                    every: 'week'
                };

                this.notifications.push(notification);
            }
        }

        for(let notification of this.notifications){
            this.localNotification.schedule(notification);
        }
        let alert = this.alertCtrl.create({
            title: 'Notifications set',
            buttons: ['Ok']
        });

        alert.present();
        // this.localNotification.schedule({
        //     id: 1,
        //     title: 'Reveil Aube',
        //     text: 'Notification depuis Aube',
        //     data: { mydata: 'hello'},
        //     at: new Date(new Date().getTime() + 5 *  1000)
        //
        // })
    }
}
