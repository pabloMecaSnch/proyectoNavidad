import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Alumno } from '../../app/entidades/Alumno';
import { resolve } from 'dns';
import { Datos } from '../../app/entidades/Datos';
import { Direccion } from '../../app/entidades/Direccion';
import { Provincia } from '../../app/entidades/Provincia';
import { Municipio } from '../../app/entidades/Municipio';

@Injectable()
export class ApiServiceProvider {
    
    private URL="http://localhost:3000";
    private direccion ="https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/";
    private apy_key = "?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWJsby5tZWNhLnNhbmNoZXouYWx1QGllc2p1bGlvdmVybmUuZXMiLCJqdGkiOiI3MmVlOTc0My1mZTcyLTQ5YzMtYjMzNS1kYzhjMGZhNGJhZDUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwODI5MzA2OCwidXNlcklkIjoiNzJlZTk3NDMtZmU3Mi00OWMzLWIzMzUtZGM4YzBmYTRiYWQ1Iiwicm9sZSI6IiJ9.R_TtXNpNrrm9fvqHhm4DZmL7UWnEpZTIPLqZPVlWhmA";
    private provinciasRoute = './assets/json/provincias.json';
    private municipiosRoute = './assets/json/municipios.json';
    constructor(public http: HttpClient){
    }

    getDireccion(codMun:string):Promise<Direccion>{
        let promise = new Promise<Direccion>((resolve,reject)=>{
            this.http.get(this.direccion+codMun+this.apy_key
            ).toPromise()
            .then((data:any)=>{

                let dr = Direccion.createFromJsonObject(data);
                resolve(dr);
            })
            .catch((error:Error)=>{
                reject(error.message);
            });
        });
        return promise;
    }
    getDatos(dir:string):Promise<Datos[]>{
        let promise = new Promise<Datos[]>((resolve,reject)=>{
            this.http.get(dir).toPromise()
            .then((data:any)=>{
                let datos=new Array<Datos>();
                data.forEach(element => {
                    let dato=Datos.createFromJsonObject(element);
                    datos.push(dato);
                });
                resolve(datos);
            })
            .catch((error:Error)=>{
                reject(error.message);
            });
        });
        return promise;
    }

    eliminarAlumno(id:number):Promise<Boolean>{
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.http.delete(this.URL+"/alumnos/"+id).toPromise().then(
              (data:any) => { // Success
                console.log(data)
                resolve(true);
              }
            )
            .catch((error:Error)=>{
              console.log(error.message);
              reject(error.message);});
          });
          return promise;
    }//end_eliminar_alumno
    
    getProvincias():Promise<Provincia[]>{
        let promise = new Promise<Provincia[]>((resolve,reject)=>{
          this.http.get(this.provinciasRoute
          ).toPromise()
          .then((data:any)=>{
    
            let provincias=new Array<Provincia>();
            data.forEach(provinciaJson => {
                let provincia=Provincia.createFromJsonObject(provinciaJson);
                provincias.push(provincia);
            });
            resolve(provincias);
          })
          .catch((error:Error)=>{
              reject(error.message);
          });
      });
      return promise;
      }
      getMunicipios(codigo:string):Promise<Municipio[]>{
        let promise = new Promise<Municipio[]>((resolve,reject)=>{
          this.http.get(this.municipiosRoute
          ).toPromise()
          .then((data:any)=>{
    
            let municipios=new Array<Municipio>();
            data.forEach(municipioJson => {
                let municipio=Municipio.createFromJsonObject(municipioJson);
                if(municipio.CPRO == codigo){
                    //console.log(municipio.NOMBRE);
                    municipios.push(municipio);
                }
                
            });
            resolve(municipios);
          })
          .catch((error:Error)=>{
              reject(error.message);
          });
      });
      return promise;
      }
}
