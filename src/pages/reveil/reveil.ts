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

    ngOnInit(){
        this.platform.ready().then(result => {
            this.localNotification.getAllScheduled().then(data => {
                this.notifications = data;
            });
        });
    }

    timeChange(time){
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
                    sound: this.platform.is('android') ? 'file://assets/sounds/secondes.mp3' : 'file://assests/sounds/secondes.caf',
                    at: firstNotificationTime,
                    every: 'week'
                };

                this.notifications.push(notification);
            }
        }

        for(let notification of this.notifications){
            this.localNotification.schedule(notification);
        }
    }

    clearNotifications(){
        this.localNotification.cancelAll().then(() => {
            this.notifications = [];
        });
    }
}
