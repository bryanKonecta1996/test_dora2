import { Component } from '@angular/core';
import { Message } from '@app/models';
import $ from 'jquery/dist/jquery';
    import { 
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} from "mongodb-stitch-browser-sdk";
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/selectable.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/selectable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /*  declare $:any,
        jQuery:any;*/
  
  public message : Message;

  
  public messages : Message[];


  constructor(){
        let fecha:Date= new Date();
        let h:number=fecha.getHours(),m:number=fecha.getMinutes(),n:string="";
        //console.log(fecha.getHours());
      n = (m<=9) ? "0"+m.toString() : m.toString();
        let hora :string =h+":"+n; 
    this.message = new Message('', 'user',hora,0);
    this.messages = [
      new Message('Bienvenido a tu Fondo de Empleados Konecta,  soy Dora tu asesora virtual. Te invitamos a seleccionar la pregunta que se acomode a tu nesecidad', 'bot',hora,0), new Message('Bienvenido a tu Fondo de Empleados Konecta,  soy Dora tu asesora virtual. Te invitamos a seleccionar la pregunta que se acomode a tu necesidad', 'bot', hora,2)
    ];
      
   
    /* this.messages = [
      new Message('Bienvenido a tu Fondo de Empleados Konecta,  soy Dora tu asesora virtual. Te invitamos a seleccionar la pregunta que se acomode a tu nesecidad', 'assets/images/bot.png', new Date(),2)
    ];*/
      
  }
    

    public minimizar(){
      
        if( $(".chatlist").css('display')=='none' && $(".chatcontrol").css('display')=="none" ){
            $(".chatlist").css('display',"" );
            $(".chatcontrol").css('display',"" );  
        } else{
          $(".chatlist").css('display',"none" );
          $(".chatcontrol").css('display',"none");  
            }
        
    

const client = Stitch.initializeDefaultAppClient('dora-mgjnu');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('DoraDB');

client.auth.loginWithCredential(new AnonymousCredential()).then(user => 
  db.collection('Dora').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() => 
  db.collection('Dora').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});
        
        
        
        
        }
    }
 