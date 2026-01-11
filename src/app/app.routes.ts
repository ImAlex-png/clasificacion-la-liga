import { Routes } from '@angular/router';
import { Clasificacion } from './components/clasificacion/clasificacion';
import { Partido } from './components/partido/partido';
import { FichaEquipo } from './components/ficha-equipo/ficha-equipo';

export const routes: Routes = [
  { path: '', component: Clasificacion },             // Ruta principal: tabla (pero ya está fija en app.html)
  { path: 'ficha/:nombre', component: FichaEquipo },  // Ruta para la ficha (se carga en router-outlet)
  { path: '**', redirectTo: '' }                      // Cualquier otra → principal
];