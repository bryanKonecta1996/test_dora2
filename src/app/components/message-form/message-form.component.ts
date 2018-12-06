import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Message } from '@app/models';
import { DialogflowService } from '@app/services';
import $ from 'jquery/dist/jquery';


@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Input('message')
  public message : Message;

  @Input('messages')
  public messages : Message[];
    
   

  constructor(private dialogFlowService: DialogflowService,cd: ChangeDetectorRef) { }

  ngOnInit() {
      
  }

  public sendMessage(): void {
      //console.log(this.message.content);
      //this.message.content=this.message.content; 
      //this.messages=[];
      
      this.message.content=this.message.content.replace(/\n/ig, '');
      //console.log(this.message.content);
      if(this.message.content=="" || this.message.content==null){
          console.log("Esta vacio");
          return;
      }
    var fecha= new Date();
    var h=fecha.getHours(),m=fecha.getMinutes(),n:string="";
    n= (m<=9) ? "0"+m.toString() : m.toString();
    var hora=h+":"+n;
    this.message.timestamp = hora;

    //Imprimo el texto que copie
    this.messages.push(this.message);
    
       
              var tiempox = setInterval(() => {
             $(".loading").css("display","none");
             this.messages.push(new Message('', 'bot','',4));
           
          clearInterval(tiempox);   
            }, 1000);
          

       
    
    //Envio la pregunta a dialogflow
    this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
      //respuesta: string;
        var fecha= new Date();
       // console.log("Entro");
        var h=fecha.getHours(),m=fecha.getMinutes();
        
        var hora=h+":"+m;
        var cadena=new Array();
        
 
         var tiempo = setInterval(() => {
    //Ciclo para imprimir todas las respuestas del dialogo         
    for (var y in res.result.fulfillment.messages){
       // console.log("Entro al for");
      //Array de respuestas
      var respuesta=res.result.fulfillment.messages[y].speech;
      var nombre="Ir a la pagina...";
      var resp: any=0;
        if(respuesta.indexOf("((enlace:")!=-1){
           // alert("Es boton");
            var url=respuesta.split(":(");
            respuesta=url[1].replace(")))","");
            
            if(respuesta.indexOf("|n|")!=-1){
                url=respuesta.split("|n|");
                
                respuesta=url[0];
                nombre=url[1];
            }
            
            resp=3;
        }
        
            if(respuesta.indexOf("((boton_texto:")!=-1){
           // alert("Es boton");
            var url=respuesta.split(":(");
            respuesta=url[1].replace(")))","");
            
            resp=5;
        }
        
              if(respuesta.indexOf("((html:")!=-1){
           // alert("Es boton");
            var url=respuesta.split(":(");
            respuesta=url[1].replace(")))","");
            respuesta=respuesta.replace(/\n/g, "<br>")
            resp=6;
        }
        
        
        var fecha= new Date();
        
        var h=fecha.getHours(),m=fecha.getMinutes();
       // console.log(fecha.getHours());
        var hora=h+":"+m;
        //assets/images/bot.png 
             $(".loading").css("display","none");
            this.messages.push(new Message(respuesta, 'bot',hora,resp,nombre));
            }
          clearInterval(tiempo); 
                    
            }, 3000);
        
       
    // cadena.push(new Message(y.speech, 'bot',hora,resp));
       
        
        
    
    });
    
     //console.log(fecha.getHours());
    this.message = new Message('', 'user',hora,0);
console.log( this.messages);
    //assets/images/user.png
  }
  
  
  //Función que ejecuta el disparador de message-item funcion:tSolicitud
  public guardarData(event){
      console.log(event.target.value);
      this.message.content=event.target.value;
     // alert(this.message.content);
     // this.sendMessage();
      $("button.message-submit").click();
     // $("textarea.message-input").val("");
  }
  
}
