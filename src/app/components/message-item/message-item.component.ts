import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@app/models';
import { MessageFormComponent } from '../message-form/message-form.component';
import $ from 'jquery/dist/jquery';

@Component({
providers:[MessageFormComponent],    
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input('message')
  public message: Message;
  @Input('messages')
 public messages : Message[];
   // console.log(message);
    
  constructor(private _message: MessageFormComponent) { }

  ngOnInit() {
  }
    
  /*  public pruebaAlerta(): void {
      alert("Esto es una prueba de angular");
  }*/
    //Me dispara la funcionalidad para enviar mensajes automaticamente al chat
   public tSolicitud(valor): void{
       //Elemento oculto para simular el envio de texto
       $("#data_send").val(valor);
       $("#data_send").trigger("click");
       
      /* this.message = new Message(valor, 'user','',0);
       this._message.message = new Message(valor, 'bot','',0);
       this._message.messages = [];
       this._message.sendMessage();*/
    // this.messages.push(new Message(valor, 'user','',0));
      // $("textarea.message-input").val(valor);
       //$("button.message-submit").trigger("click");
       
       // alert("Entro a "+valor);
   }

}
