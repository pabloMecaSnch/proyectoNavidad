import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'provincias',
    pathMatch: 'full'
  },
  {
    path: 'provincias',
    loadChildren: () => import('./provincias/provincias.module').then( m => m.ProvinciasPageModule)
  },
  {
    path: 'municipios',
    loadChildren: () => import('./municipios/municipios.module').then( m => m.MunicipiosPageModule)
  },
  {
    path: 'tiempo',
    loadChildren: () => import('./tiempo/tiempo.module').then( m => m.TiempoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
