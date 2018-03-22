export class Message{
  content:string;
  sentBy:string;
  url:string;
  css:string;

  constructor(content: string,sentBy:string,url:string,css:string){
    this.content = content;
    this.sentBy = sentBy;
    this.url = url;
    this.css =css;
  }
}
