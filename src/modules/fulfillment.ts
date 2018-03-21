import {Test} from "./test";

export class Fulfillment{
  speech: string;
  messages: Test[];
  data: {
    temperature:number;
    condition:string;
    ville:string;
  }
}
