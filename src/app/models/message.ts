export class Message {
  content: string;
  timestamp: string;
  avatar: string;
  type :number;
  name: string;    

  constructor(content: string, avatar: string, timestamp?: string, type?:number, name?: string){
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
    this.type = type;
    this.name =  name;
  }
}
