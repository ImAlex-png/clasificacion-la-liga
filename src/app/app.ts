import { Component, signal } from '@angular/core';
import { Clasificacion } from './components/clasificacion/clasificacion';
import { Partido } from './components/partido/partido';

@Component({
  selector: 'app-root',
  imports: [Clasificacion, Partido],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('clasificacion-la-liga');
}
