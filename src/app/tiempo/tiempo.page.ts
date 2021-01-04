import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Datos } from '../entidades/Datos';
import { DiaClase } from '../entidades/DiaClase';
import { Direccion } from '../entidades/Direccion';
import { Dia } from '../entidades/Interfaces';
import { Municipio } from '../entidades/Municipio';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.page.html',
  styleUrls: ['./tiempo.page.scss'],
})
export class TiempoPage implements OnInit {

  private municipio= new Municipio(null,null,null,null,null);
  private dias = new Array<Dia>();
  private meteo = new Array<String>();
  constructor(private apiService:ApiServiceProvider, private route: ActivatedRoute) 
  {}

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      let municipio:Municipio = JSON.parse(params["municipio"]);
      //console.log("look"+ this.municipio);
      this.apiService.getDireccion(municipio.CPRO+municipio.CMUN)
        .then((direccion : Direccion)=>{
          //this.direccion=direccion;
          //console.log(this.direccion);
          this.apiService.getDatos(direccion.datos).
            then((datos:Datos[])=>{
              //this.datos=datos;
              //console.log(this.datos);
              
              //this.dias=datos[0].prediccion.dia;
              //console.log(this.dias);
              this.muestraDatos(datos[0].prediccion.dia);
              
              console.log("fin");

            })
            .catch((error:string)=>{
              console.log(error);
              });
          });
      });
    
  }
  muestraDatos(dias:DiaClase[]){
    for (let index = 0 ,total=0,d = 0; total < 24; index++) {
      //d = dia
      let linea ="";
       console.log(d);
       linea=this.getDatos(index,dias[d])+" dia:"+dias[d].fecha;
       this.meteo.push(linea);
       console.log(this.getDatos(index,dias[d])+" dia:"+dias[d].fecha);
       if(Number.parseInt(dias[d].estadoCielo[index].periodo)==23 ){
         console.log("cambio");
         d++;
         index=0;
       }
       total++;
       
     }
  }
  getDatos(indice:number,dia:DiaClase):String{
    let datos="";
    datos=dia.temperatura[indice].periodo+" "+dia.estadoCielo[indice].descripcion+" "+dia.precipitacion[indice].value+" "+dia.temperatura[indice].value;
    return datos;
}
}
