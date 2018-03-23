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

    scheduledNotifications = [];

    selectedDay: {title: string, dayId:number};

    constructor(public navCtrl: NavController, public navParams: NavParams, private localNotification:LocalNotifications, private alertCtrl:AlertController, private platform:Platform) {
        this.notificationTime = moment(new Date()).format();

        this.days = [
            { title: 'Lundi', dayId: 1},
            { title: 'Mardi', dayId: 2},
            { title: 'Mercredi', dayId: 3},
            { title: 'Jeudi', dayId: 4},
            { title: 'Vendredi', dayId: 5},
            { title: 'Samedi', dayId: 6},
            { title: 'Dimanche', dayId: 0},
        ];

    }

    ngOnInit(){
        this.localNotification.on('click', (notification, state) => {
            this.navCtrl.setRoot(ChatPage, {mydata: "data"});
        });

        if(this.platform.is('cordova')) {
            this.getScheduledAlarms();
        }
    }

    getScheduledAlarms(){
            this.localNotification.getAllScheduled().then(data => {
                this.scheduledNotifications = [];
                for (let alrm of data) {
                    console.log(new Date(alrm.at).toLocaleDateString('fr-FR', {weekday: 'long', hour: 'numeric', minute: 'numeric'}));
                    this.scheduledNotifications.push(new Date(alrm.at).toLocaleDateString('fr-FR', {weekday: 'long', hour: 'numeric', minute: 'numeric'}));
                }
                console.log(this.scheduledNotifications);
            });
    }

    onSelectDay(day){
        console.log(day);
        this.selectedDay = day;
    }

    timeChange(time){
        this.notifHour = time.hour;
        this.notifMinute = time.minute;
    }

    scheduleNotification(){
        if(this.selectedDay !== undefined){
            if (this.notifHour !== undefined && this.notifMinute !== undefined){
                let currentDate = new Date();
                let currentDay = currentDate.getDay();

                let firstNotificationTime = new Date();
                let dayDifference = this.selectedDay.dayId - currentDay;

                if(dayDifference < 0){
                    dayDifference += 7;
                }

                firstNotificationTime.setHours(this.notifHour);
                firstNotificationTime.setMinutes(this.notifMinute);
                firstNotificationTime.setDate(firstNotificationTime.getDate() + dayDifference);

                let notification = {
                    id: this.selectedDay.dayId,
                    title: 'Hey! Debout la dedans',
                    text: 'Bon reveil avec Aube',
                    sound: this.platform.is('android') ? 'file://assets/sounds/secondes.mp3' : 'file://assets/sounds/secondes.caf',
                    at: firstNotificationTime,
                    every: 'week'
                };

                console.log(firstNotificationTime);


                if( this.platform.is('cordova')){
                    this.localNotification.schedule(notification);
                }

                let alert = this.alertCtrl.create({
                    title: 'Youpi',
                    subTitle:'Un nouveau reveil est programmé tous les '+this.selectedDay.title+' à '+this.notifHour+':'+this.notifMinute,
                    buttons: ['Ok']
                });

                alert.present();

                if(this.platform.is('cordova')) {
                    this.getScheduledAlarms();
                }
            }
            else {
                let alert = this.alertCtrl.create({
                    title: 'Oups',
                    subTitle: "Veuiller selectionner l'heure du reveil",
                    buttons: ['Ok']
                });

                alert.present();
            }
        }
        else{
            let alert = this.alertCtrl.create({
                title: 'Oups',
                subTitle:"Vous n'avez pas selectionné de jour",
                buttons: ['Ok']
            });

            alert.present();
        }
    }
}
