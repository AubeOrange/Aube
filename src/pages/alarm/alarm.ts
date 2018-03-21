import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import * as moment from 'moment';
import {LocalNotifications} from "@ionic-native/local-notifications";

/**
 * Generated class for the AlarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html',
})
export class AlarmPage {

  notifyTime: any;
  notifications : any[]=[];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public alertCtrl:AlertController,
              public localNotifications: LocalNotifications,
              public navParams: NavParams) {
    this.notifyTime = moment(new Date()).format();
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();

    this.days = [
      {title: 'Monday', dayCode: 1, checked: false},
      {title: 'Tuesday', dayCode: 2, checked: false},
      {title: 'Wednesday', dayCode: 3, checked: false},
      {title: 'Thursday', dayCode: 4, checked: false},
      {title: 'Friday', dayCode: 5, checked: false},
      {title: 'Saturday', dayCode: 6, checked: false},
      {title: 'Sunday', dayCode: 0, checked: false}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }



  timeChange(time){
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
  }

  addNotifications(){

    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    for(let day of this.days){

      if(day.checked){

        let firstNotificationTime = new Date();
        let dayDifference = day.dayCode - currentDay;

        if(dayDifference < 0){
          dayDifference = dayDifference + 7; // for cases where the day is in the following week
        }

        firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
        firstNotificationTime.setHours(this.chosenHours);
        firstNotificationTime.setMinutes(this.chosenMinutes);

        let notification = {
          id: day.dayCode,
          title: 'Hey!',
          text: 'You just got notified :)',
          at: firstNotificationTime,
          every: 'week'
        };

        this.notifications.push(notification);

      }

    }

    if(this.platform.is('cordova')){

      for(let notification of this.notifications){
        this.localNotifications.schedule(notification);
      }
      let alert = this.alertCtrl.create({
        title: 'Notifications set',
        buttons: ['Ok']
      });

      alert.present();
    }

  }


  cancelAll(){
    this.notifications = [];
    this.localNotifications.cancelAll();
    for (let entry of this.days) {
      entry.checked = false;
    }
  }


  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Simons Notification',
      data: { mydata: 'My hidden message this is' },
      at: new Date(new Date().getTime() + 5 * 1000)
    });
  }

}
