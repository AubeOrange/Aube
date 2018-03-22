import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Equation} from "../../modules/equation";
import {ChatService} from "../chat/chat.service";

/**
 * Generated class for the EquationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equation-modal',
  templateUrl: 'equation-modal.html',
})
export class EquationModalPage {

  equations:Equation[] = [];
  equationToday:Equation;
  bufferResponse:number;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public chatService: ChatService,
              public navParams: NavParams) {
    this.equations.push(new Equation(7,"assets/equation/calcul-01.png"));
    this.equations.push(new Equation(4,"assets/equation/calcul-02.png"));
    this.equations.push(new Equation(8,"assets/equation/calcul-03.png"));
    this.equations.push(new Equation(9,"assets/equation/calcul-04.png"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquationModalPage');
    this.equationToday = this.equations[Math.floor(Math.random() * this.equations.length )];
  }

  validate(){
    if (this.equationToday.result == this.bufferResponse){
      this.dismiss();
      this.chatService.addReponseEquation("Bravo tu as reussi, demande moi la météo !","assets/smiley/smileys-love.png");

    }else{
      this.dismiss();
      this.chatService.addReponseEquation("Dommage essaye demain, demande moi la météo !","assets/smiley/smileys-enerve.png");

    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
/*
  showAlert(title,msg): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        buttons: [{
          text: 'OK',
          handler: () => {
            alert.dismiss().then(() => { resolve(true); });
            return false;
          }
        }]
      });
      alert.present();
    });
  }*/

}
