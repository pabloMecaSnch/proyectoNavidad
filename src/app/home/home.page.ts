import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Alumno } from '../entidades/Alumno';
import { Datos } from '../entidades/Datos';
import { DiaClase } from '../entidades/DiaClase';
import { Direccion } from '../entidades/Direccion';
import { Dia } from '../entidades/Interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private alumnos = new Array<Alumno>();
  private datos = new Array<Datos>();
  private direccion = new Direccion(null,null,null,null);
  private meteo = new Array<String>();
  //private dia= new DiaClase(null,null,null,null,null,null,null,null,null,null,null,null,null);
  private dias = new Array<DiaClase>();
  private ind = 0;
  constructor(private apiService : ApiServiceProvider) {}
  
  ngOnInit():void{
    /*this.apiService.getAlumnos().
    then((alumnos:Alumno[])=>{
      this.alumnos=alumnos;
      console.log(this.alumnos);
    })
    .catch((error:string)=>{
      console.log(error);
    }),*/
    

  
  }
  eliminarAlumno(indice:number){
    this.apiService.eliminarAlumno(this.alumnos[indice].id)
    .then( (correcto:Boolean ) => {
      console.log("Borrado correcto del alumno con indice: "+indice);
      this.alumnos.splice(indice,1);
    })
    .catch( (error:string) => {
        console.log("Error al borrar: "+error);
    });
  }
  getDatos(indice:number,dia:DiaClase):String{
    let datos="";
    datos=dia.temperatura[indice].periodo+" "+dia.estadoCielo[indice].descripcion+" "+dia.precipitacion[indice].value+" "+dia.temperatura[indice].value;
    return datos;
}
muestraDatos(){
  for (let index = 0 ,total=0,d = 0; total < 24; index++) {
    //d = dia
    let linea ="";
     console.log(d);
     linea=this.getDatos(index,this.dias[d])+" dia:"+this.dias[d].fecha;
     this.meteo.push(linea);
     console.log(this.getDatos(index,this.dias[d])+" dia:"+this.dias[d].fecha);
     if(Number.parseInt(this.dias[d].estadoCielo[index].periodo)==23 ){
       console.log("cambio");
       d++;
       index=0;
     }
     total++;
     
   }
}
}
