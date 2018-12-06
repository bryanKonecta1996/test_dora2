import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '@env/environment';

@Injectable()
export class DialogflowService {

  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  private apiRoot: string = "http://172.20.50.59:3001";
  //https://api.dialogflow.com/v1/ --NO
  private token: string = environment.token;

  constructor(private http: Http){}

  public getResponse(query: string){
    let data = {
      query : query,
      lang: 'en',
      sessionId: '12345',
      'Content-Type' : 'application/json; charset=UTF-8'
    }
    /*let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');*/
    return this.http
      .post(`${this.baseURL}`, data, {headers: this.getHeaders()})
      .map(res => {
        let obj=res.json();
        if(obj.result.action=='input.unknown'){
             this.log_errores(obj.result.resolvedQuery,obj.result.fulfillment.speech,'');
            //alert(obj.result.resolvedQuery);
           }
       
        console.log(res.json());
        return res.json()
      })
      
      
  }

  public getHeaders(){
    let headers = new Headers({'Content-Type' : 'application/json; charset=UTF-8'});
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
 //Me envia las preguntas que dora no es capaz de responder y me la almacena en una base de datos
  public log_errores(mensaje:string,respuesta:string,observacion:string) {
      console.log("POST");
      let url = `${this.apiRoot}/log_dora`;
      let search = new URLSearchParams();
      /*search.set('foo', 'moo');
      search.set('limit', 25);*/
       let data = {
            'Content-Type' : 'application/json'
        }
        let array =[{"mensaje":mensaje,"observacion":observacion,"respuesta":respuesta}];
      this.http.post(url, array,{
            headers: this.getHeaders()
        }).subscribe(res => console.log(res));
    }
    
}
