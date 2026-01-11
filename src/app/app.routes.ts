import { Routes } from '@angular/router'; 
import { Clasificacion } from './components/clasificacion/clasificacion'; 
import { Partido } from './components/partido/partido'; 
import { FichaEquipo } from './components/ficha-equipo/ficha-equipo'; 

// Definición de rutas de la aplicación
export const routes: Routes = [
  { path: '', component: Clasificacion },             // Ruta raíz: muestra tabla de clasificación
  { path: 'ficha/:nombre', component: FichaEquipo },  // Ruta con parámetro: ficha del equipo
  { path: '**', redirectTo: '' }                      // Ruta comodín: redirige a raíz
];