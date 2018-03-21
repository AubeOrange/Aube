import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { ApiAiClient } from 'api-ai-javascript';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Fulfillment} from "../../modules/fulfillment";

export class Message {
  constructor(public content: string, public sentBy: string,public url) {}
}

@Injectable()
export class ChatService {

  readonly token = environment.apiToken;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {}

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user',null);
    this.update(userMessage);

    return this.client.textRequest(msg)
               .then(res => {
                 // let test :Fulfillment = res.result.fulfillment;
                 // console.log(test);
                 // console.log(res);
                 // if(test.speech){
                 //   const speech = res.result.fulfillment.speech;
                 //   const botMessage = new Message(speech, 'bot',null);
                 //   this.update(botMessage);
                 // }else if (test.data){
                 //     const speech = res.result.fulfillment.speech;
                 //     const url = test.messages[0].payload.url;
                 //     const botMessage = new Message(speech, 'bot',"https://cdn2.webmanagercenter.com/di/wp-content/uploads/2012/11/meteo-22112012.jpg");
                 //     this.update(botMessage);
                 //
                 // }else {
                 //   if(test.messages[0].payload.type == "physique"){
                 //     const speech = test.messages[0].payload.speech;
                 //     const url = test.messages[0].payload.url;
                 //     const botMessage = new Message(speech, 'bot',url);
                 //     this.update(botMessage);
                 //   }
                 // }

               });
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }


}
