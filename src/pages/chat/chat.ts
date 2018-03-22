import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, Platform} from 'ionic-angular';
import {ChatService} from "./chat.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/scan';
import { Content } from 'ionic-angular';
import {SpeechRecognition} from "@ionic-native/speech-recognition";
import {Message} from "../../modules/message";
import {EquationModalPage} from "../equation-modal/equation-modal";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;

  messages: Observable<Message[]>;
  formValue: string;
  isRecording: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public chat: ChatService,
              public alertCtrl: AlertController,
              private cd: ChangeDetectorRef,
              private platform:Platform,
              private modalCtrl:ModalController,
              private speechRecognition: SpeechRecognition) {
  }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable().scan((acc, val) => acc.concat(val) );
  }

  ionViewDidLoad() {
    this.chat.addMsgBienvenue(null);
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage() {
    if(this.formValue.trim() == ''){
      this.showAlert("Votre message est vide");
    }else{
      this.chat.converse(this.formValue).then(()=>{
        this.scrollToBottom();
      });
      this.formValue = '';
    }
  }

  showAlert(param) {
    let alert = this.alertCtrl.create({
      title: 'Message Error',
      subTitle: param,
      buttons: ['OK']
    });
    alert.present();
  }

  scrollToBottom() {
    this.content.scrollToBottom();
  }


  startListening(){
    if(this.platform.is('cordova')) {
      this.getPermission();
      let options = {
        language: 'fr-FR'
      };
      this.speechRecognition.startListening(options).subscribe(matches => {
        this.chat.converse(matches[0]);
        this.cd.detectChanges();
      });
      this.isRecording = true;
    }else{
      this.showAlert("Non disponible sur desktop");
    }
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  openModal() {
    const modal = this.modalCtrl.create(EquationModalPage);
    modal.present();
  }


}
