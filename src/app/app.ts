import { Component, signal } from '@angular/core'; 
import { RouterModule } from '@angular/router'; 

// Componente principal de la aplicación
@Component({
  selector: 'app-root', 
  imports: [RouterModule], 
  templateUrl: './app.html', 
  styleUrl: './app.css' 
})
export class App {
  protected readonly title = signal('clasificacion-la-liga'); 
}
