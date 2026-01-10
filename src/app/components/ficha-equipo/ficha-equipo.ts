import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Liga } from '../../services/liga';
import { Equipo } from '../../models/equipo';

@Component({
  selector: 'app-ficha-equipo',
  imports: [CommonModule],
  templateUrl: './ficha-equipo.html',
  styleUrl: './ficha-equipo.css',
})
export class FichaEquipo implements OnInit {
  equipo: Equipo | undefined;

  constructor(private route: ActivatedRoute, private liga: Liga) { }

  ngOnInit(): void {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    if (nombre) {
      this.equipo = this.liga.obtenerEquipoPorNombre(nombre);
    }
  }
}
