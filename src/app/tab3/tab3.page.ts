import { Component, OnInit } from '@angular/core';
import { Marcador } from '../class/marcador';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
 
  ngOnInit()
  {
   
    this.polyline = false;
    this.storage.get('polylines').then((val) => 
    {
      let marcador : Marcador = JSON.parse(val);
      for (let i in marcador)
      {
        this.marcadores.push(marcador[i]);
        console.log(this.marcadores);
        if(parseInt(i)<=2)
        {
          this.paths.push(marcador[i]);
        }
        if(parseInt(i)==3)
        {
          this.polygon=true;
          this.latA = (marcador[i].lat);
          this.lngA = (marcador[i].lng);
        }
        if(parseInt(i)==4)
        {
          this.latB = (marcador[4].lat);
          this.lngB = (marcador[4].lng);
          this.polyline = true;
        }
      }        
    });
  }
  ingresarMarcador(lat, lng, title, description){
    const nuevoMarcador = new Marcador(lat, lng, title, description);
    this.marcadores.push(nuevoMarcador);
  }

  marcadores : Marcador[] = [];
  lat = 4.60972222222;
  lng = -74.0816666667;
  paths: Array<any> = [];
  polygon = false;
  latA : number;
  latB : number;
  lngA : number;
  lngB : number;
  polyline = false;

  constructor(private storage: Storage){  }

  agregarMarcador(evento){
    this.ingresarMarcador(parseFloat(evento.coords.lat), parseFloat(evento.coords.lng), evento.coords.title, evento.coords.description);
    //Almacenamiento en local storage
    this.storage.set('polylines', JSON.stringify(this.marcadores) );
    console.log(this.marcadores.length);
    //Creación del polígono
     if(this.marcadores.length>0){
        console.log("latA: " + this.latA);        //Creación de la línea
        console.log("lontA: " + this.lngA);       //Creación de la línea
        console.log("latB: " + this.latB);        //Creación de la línea
        console.log("lontB: " + this.lngB);       //Creación de la línea
       this.polyline = true;
        this.latA = this.latB; 
        this.lngA = this.lngB;
       this.latB = parseFloat(evento.coords.lat);
       this.lngB = parseFloat(evento.coords.lng);
      }

}
}
