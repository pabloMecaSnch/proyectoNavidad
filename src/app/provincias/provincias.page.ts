import { Component, OnInit } from '@angular/core';
import { Provincia } from '../entidades/Provincia';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import {NavController} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.page.html',
  styleUrls: ['./provincias.page.scss'],
})
export class ProvinciasPage implements OnInit {

  private provincias = new Array<Provincia>();
  constructor(private apiService : ApiServiceProvider,private navCtrl:NavController) { }


  ngOnInit() {
    //console.log("rutina");
    this.apiService.getProvincias()
      .then((provincias : Provincia[])=>{
        this.provincias = provincias;
        console.log(this.provincias);
      })
      .catch((error:string)=>{
        console.log(error);
      });
  }
  toMunicipio(indice:number){
    let provincia = new Provincia(null,null,null);
    provincia = this.provincias[indice];
    console.log(provincia);
    let navigationExtras:NavigationExtras={
      queryParams:{
        provincia:JSON.stringify(provincia),
      }
    }
    this.navCtrl.navigateForward('/municipios',navigationExtras);
  }

  
}
