import { Routes } from '@angular/router';
import { Clasificacion } from './components/clasificacion/clasificacion';
import { Partido } from './components/partido/partido';
import { FichaEquipo } from './components/ficha-equipo/ficha-equipo';

export const routes: Routes = [
  { path: '', component: Clasificacion },  // Página principal: tabla
  { path: 'partido', component: Partido },  // Si quieres una página separada para el formulario
  { path: 'ficha/:nombre', component: FichaEquipo },  // Ruta para la ficha, con parámetro :nombre
  { path: '**', redirectTo: '' }  // Redirige todo lo demás a la principal
];