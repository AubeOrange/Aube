import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { ApiAiClient } from 'api-ai-javascript';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Fulfillment} from "../../modules/fulfillment";
import {Message} from "../../modules/message";



@Injectable()
export class ChatService {

  readonly token = environment.apiToken;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {}

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user',null,null);
    this.update(userMessage);
    return this.client.textRequest(msg)
               .then(res => {
                 switch(res.result.action){
                   case "physique":{
                     let test :Fulfillment = <Fulfillment> res.result.fulfillment;
                     const speech = test.messages[0].payload.speech;
                     const url = test.messages[0].payload.url;
                     const botMessage = new Message(speech, 'bot',url,null);
                     this.update(botMessage);
                     break;
                   }
                   case "yahooWeatherForecast":{
                     let test :Fulfillment = <Fulfillment> res.result.fulfillment;
                     if (test.data){
                       this.getImageMeteo(test.data.condition);
                       const botMessage = new Message(test.speech, 'bot',null,null);
                       this.update(botMessage);
                       this.getHabitMeteo(test.data);
                     }else{
                       const speech = res.result.fulfillment.speech;
                       const botMessage = new Message(speech, 'bot',null,null);
                       this.update(botMessage);
                     }
                     break;
                   }
                   default:{
                     const speech = res.result.fulfillment.speech;
                     const botMessage = new Message(speech, 'bot',null,null);
                     this.update(botMessage);
                     break;
                   }

                 }


               });
  }

  addMsgBienvenue(msg){
    this.conversation.getValue().pop();
    const userMessage = new Message(null, 'bot',"assets/gif/Bienvenue.gif",null);
    this.update(userMessage);
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

  getHabitMeteo(param){
    const botMessage = new Message(null, 'bot',null,null);
    if(param.temperature > 17){
      botMessage.content="Avec ce temps tu peux sortir en Tee-shirt.";

    }else if(param.temperature >= 12){
      botMessage.content="Avec ce temps tu devrais sortir avec une veste légère.";
    }
    else if(param.temperature <=12 ){
      botMessage.content="Avec ce temps tu devrais sortir avec une grosse Veste.";
    }
    this.update(botMessage);
  }

  getImageMeteo(param){
    const meteoGif = new Message(null,'bot',"","meteo");

    switch(param){
      case "Mostly Cloudy":
      case "Cloudy":{
        meteoGif.url="assets/meteo/meteo-nuageux.svg";
        this.update(meteoGif);
        break;
      }
      case "Mostly Sunny":
      case "Partly Cloudy":{
        meteoGif.url="assets/meteo/meteo-soleil-nuage.svg";
        this.update(meteoGif);
        break;
      }
      case "Sunny":{
        meteoGif.url="assets/meteo/meteo-soleil.svg";
        this.update(meteoGif);
        break;
      }
      case "Rain":
      case "Showers":
      case "Scattered Showers" :{
        meteoGif.url="assets/meteo/meteo-pluie.svg";
        this.update(meteoGif);
        break
      }
      default:{
        break;
      }

    }
  }

  addReponseEquation(content,url){

    const userMessage1 = new Message(null, 'bot',url,"smiley");
    const userMessage2 = new Message(content, 'bot',null,null);
    this.update(userMessage1);
    this.update(userMessage2);
  }




}
