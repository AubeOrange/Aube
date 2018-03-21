import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatService, Message} from "./chat.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/scan';
import { Content } from 'ionic-angular';
import {SpeechRecognition} from "@ionic-native/speech-recognition";

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
              private speechRecognition: SpeechRecognition) {
  }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable().scan((acc, val) => acc.concat(val) );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage() {
    if(this.formValue.trim() == ''){
      this.showAlert();
    }else{
      this.chat.converse(this.formValue).then(()=>{
        this.scrollToBottom();
      });
      this.formValue = '';
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Message Error',
      subTitle: 'Votre message est vide',
      buttons: ['OK']
    });
    alert.present();
  }

  scrollToBottom() {
    this.content.scrollToBottom();
  }



  startListening(){

      this.getPermission();
      let options = {
        language: 'fr-FR'
      };
      this.speechRecognition.startListening(options).subscribe(matches => {
        this.chat.converse(matches[0]);
        this.cd.detectChanges();
      });
      this.isRecording = true;

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


}
